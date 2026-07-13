"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { auth } from "@/server/auth";
import prisma from "@/server/db/prisma";
import { saveRecipeToAlgolia } from "@/server/search/algolia";
import { getUserByEmail } from "@/server/users/queries";
import { Recipe } from "@/generated/prisma/client";
import {
  CategoryListItem,
  ImageFormValues,
  RecipeWithCategories,
  RecipeSubmitValues,
  UpdateCategoryInput,
} from "@/types";

const toSlug = (value: string) => {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "recipe";
};

const createUniqueSlug = async (name: string) => {
  const baseSlug = toSlug(name);
  let slug = baseSlug;
  let suffix = 1;

  while (await prisma.recipe.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  return slug;
};

const createUniqueCategorySlug = async (name: string) => {
  const baseSlug = toSlug(name);
  let slug = baseSlug;
  let suffix = 1;

  while (await prisma.category.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  return slug;
};

const normalizeCategoryName = (value: string) =>
  value.trim().replace(/\s+/g, " ");

const toCategoryRecords = (categories: RecipeSubmitValues["categories"]) => {
  const seen = new Set<string>();

  return categories
    .map((category) => normalizeCategoryName(category.text))
    .filter((name) => name.length > 0)
    .map((name) => ({
      name,
      slug: toSlug(name),
    }))
    .filter((category) => {
      if (seen.has(category.slug)) {
        return false;
      }

      seen.add(category.slug);
      return true;
    });
};

export const createRecipe = async (
  recipe: RecipeSubmitValues,
): Promise<Recipe> => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("You must be signed in to create a recipe");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("Unable to find the current user");
    }

    const categories = toCategoryRecords(recipe.categories);
    const existingCategories = await prisma.category.findMany({
      where: {
        slug: {
          in: categories.map((category) => category.slug),
        },
      },
      select: {
        slug: true,
      },
    });
    const existingCategorySlugs = new Set(
      existingCategories.map((category) => category.slug),
    );
    const hasNewCategory = categories.some(
      (category) => !existingCategorySlugs.has(category.slug),
    );
    const primaryImage = recipe.images[0] ?? null;

    if (hasNewCategory && !primaryImage) {
      throw new Error(
        "A recipe image is required when creating a new category",
      );
    }

    const createdRecipe = await prisma.recipe.create({
      data: {
        ...recipe,
        slug: await createUniqueSlug(recipe.name),
        directions: recipe.directions.map((d) => d.value),
        authorId: user.id,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { slug: category.slug },
            create: {
              ...category,
              image: primaryImage,
            },
          })),
        },
      },
    });

    await saveRecipeToAlgolia(createdRecipe);

    revalidatePath("/");
    revalidatePath("/recipes");
    revalidatePath(`/recipe/${createdRecipe.slug}`);

    return createdRecipe;
  } catch (e) {
    console.error("Failed to create recipe:", e);

    if (
      e instanceof Error &&
      e.message === "A recipe image is required when creating a new category"
    ) {
      throw e;
    }

    throw new Error("Failed to create recipe");
  }
};

export const updateRecipe = async (id: number, recipe: RecipeSubmitValues) => {
  try {
    const categories = toCategoryRecords(recipe.categories);
    const existingCategories = await prisma.category.findMany({
      where: {
        slug: {
          in: categories.map((category) => category.slug),
        },
      },
      select: {
        slug: true,
      },
    });
    const existingCategorySlugs = new Set(
      existingCategories.map((category) => category.slug),
    );
    const hasNewCategory = categories.some(
      (category) => !existingCategorySlugs.has(category.slug),
    );
    const primaryImage = recipe.images[0] ?? null;

    if (hasNewCategory && !primaryImage) {
      throw new Error(
        "A recipe image is required when creating a new category",
      );
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        ...recipe,
        directions: recipe.directions.map((d) => d.value),
        categories: {
          set: [],
          connectOrCreate: categories.map((category) => ({
            where: { slug: category.slug },
            create: {
              ...category,
              image: primaryImage,
            },
          })),
        },
      },
    });

    await saveRecipeToAlgolia(updatedRecipe);

    revalidatePath("/");
    revalidatePath("/recipes");
  } catch (e) {
    console.error("Failed to update recipe:", e);

    if (
      e instanceof Error &&
      e.message === "A recipe image is required when creating a new category"
    ) {
      throw e;
    }

    throw new Error("Failed to update recipe");
  }
};

export const getAllRecipes = async (): Promise<Recipe[] | null> => {
  try {
    return await prisma.recipe.findMany();
  } catch (e) {
    console.error("Failed to fetch recipes:", e);
    throw new Error("Failed to fetch recipes");
  }
};

export const getRecipeBySlug = async (
  slug: string,
): Promise<RecipeWithCategories | null> => {
  try {
    return await prisma.recipe.findUnique({
      where: { slug },
      include: {
        categories: true,
      },
    });
  } catch (e) {
    console.error("Failed to fetch recipe:", e);
    throw new Error("Failed to fetch recipe");
  }
};

export const getRandomRecipe = async (): Promise<Recipe | null> => {
  const count = await prisma.recipe.count();

  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  return prisma.recipe.findFirst({
    skip,
  });
};

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  const results = await prisma.recipe.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
      description: { contains: query, mode: "insensitive" },
    },
  });

  return results;
};

export const getRelatedRecipesById = async (
  recipeId: number,
  take = 3,
): Promise<Recipe[]> => {
  const categories = await prisma.recipe.findUnique({
    where: { id: recipeId },
    select: {
      categories: {
        select: { id: true },
      },
    },
  });

  if (!categories?.categories.length) {
    return [];
  }

  const categoryIds = categories.categories.map((category) => category.id);

  return prisma.recipe.findMany({
    where: {
      id: { not: recipeId },
      categories: {
        some: {
          id: { in: categoryIds },
        },
      },
    },
    take,
  });
};

export const getAllCategories = async (): Promise<CategoryListItem[]> => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      recipes: {
        select: {
          id: true,
        },
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    recipeCount: category.recipes.length,
  }));
};

export const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
    },
  });
};

export const getRecipesByCategorySlug = async (
  slug: string,
): Promise<RecipeWithCategories[]> => {
  return prisma.recipe.findMany({
    where: {
      categories: {
        some: {
          slug,
        },
      },
    },
    include: {
      categories: true,
    },
  });
};

export const getRecipeByCategorySlug = async (
  slug: string,
): Promise<Recipe | null> => {
  return prisma.recipe.findFirst({
    where: {
      categories: {
        some: {
          slug,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const updateCategory = async (
  id: number,
  category: UpdateCategoryInput,
) => {
  return prisma.category.update({
    where: { id },
    data: category,
  });
};

export const getCategoryImageOptions = async (): Promise<ImageFormValues[]> => {
  const categories = await prisma.category.findMany({
    select: {
      image: true,
    },
  });

  const seen = new Set<string>();

  return categories
    .map((category) => category.image)
    .filter((image): image is ImageFormValues => image !== null)
    .filter((image) => {
      const key = JSON.stringify(image);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
};

export const createCategory = async (name: string, image: ImageFormValues) => {
  return prisma.category.create({
    data: {
      name,
      slug: await createUniqueCategorySlug(name),
      image,
    },
  });
};
