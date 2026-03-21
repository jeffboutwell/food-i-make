"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { RecipeSubmitValues } from "../db/recipe/recipe.schemas";
import { type ImageFormValues } from "../db/recipe/image.types";
import { Prisma, Recipe } from "@/app/generated/prisma/client";
import { getUserByEmail } from "./user.actions";

import prisma from "@/lib/db/prisma";

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

export type CategoryListItem = {
  id: number;
  name: string;
  slug: string;
  image: ImageFormValues | null;
  recipeCount: number;
};

export type RecipeWithCategories = Prisma.RecipeGetPayload<{
  include: {
    categories: true;
  };
}>;

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

    const createdRecipe = await prisma.recipe.create({
      data: {
        ...recipe,
        slug: await createUniqueSlug(recipe.name),
        directions: recipe.directions.map((d) => d.value),
        authorId: user.id,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { slug: category.slug },
            create: category,
          })),
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/recipes");
    revalidatePath(`/recipe/${createdRecipe.slug}`);

    return createdRecipe;
  } catch (e) {
    console.error("Failed to create recipe:", e);
    throw new Error("Failed to create recipe");
  }
};

export const updateRecipe = async (id: number, recipe: RecipeSubmitValues) => {
  try {
    const categories = toCategoryRecords(recipe.categories);

    await prisma.recipe.update({
      where: { id },
      data: {
        ...recipe,
        directions: recipe.directions.map((d) => d.value),
        categories: {
          set: [],
          connectOrCreate: categories.map((category) => ({
            where: { slug: category.slug },
            create: category,
          })),
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/recipes");
  } catch (e) {
    console.error("Failed to update recipe:", e);
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

export const getRecipesByCategorySlug = async (
  categorySlug: string,
): Promise<Recipe[] | null> => {
  try {
    const normalizedCategorySlug = toSlug(categorySlug);

    return await prisma.recipe.findMany({
      where: {
        categories: {
          some: {
            slug: normalizedCategorySlug,
          },
        },
      },
    });
  } catch (e) {
    console.error("Failed to fetch recipes by category:", e);
    throw new Error("Failed to fetch recipes by category");
  }
};

export const getRelatedRecipesById = async (
  id: number,
  numberOfRecipes?: number,
): Promise<Recipe[] | null> => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });

    if (!recipe) {
      return null;
    }

    const categorySlugs = recipe.categories.map((category) => category.slug);

    return await prisma.recipe.findMany({
      take: numberOfRecipes ?? 4,
      where: {
        id: {
          not: id,
        },
        categories: {
          some: {
            slug: {
              in: categorySlugs,
            },
          },
        },
      },
    });
  } catch (e) {
    console.error("Failed to fetch related recipes:", e);
    throw new Error("Failed to fetch related recipes");
  }
};

export const getRecipeCategoriesBySlug = async (
  slug: string,
): Promise<string[]> => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
      select: {
        categories: {
          select: {
            name: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    return recipe?.categories.map((category) => category.name) ?? [];
  } catch (e) {
    console.error("Failed to fetch recipe categories:", e);
    throw new Error("Failed to fetch recipe categories");
  }
};

export const getAllCategories = async (): Promise<CategoryListItem[]> => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        _count: {
          select: {
            recipes: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image as ImageFormValues | null,
      recipeCount: category._count.recipes,
    }));
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    throw new Error("Failed to fetch categories");
  }
};

export const getCategoryBySlug = async (
  slug: string,
): Promise<CategoryListItem | null> => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        _count: {
          select: {
            recipes: true,
          },
        },
      },
    });

    if (!category) return null;

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image as ImageFormValues | null,
      recipeCount: category._count.recipes,
    };
  } catch (e) {
    console.error("Failed to fetch category by slug:", e);
    throw new Error("Failed to fetch category by slug");
  }
};
