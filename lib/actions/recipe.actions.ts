"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { RecipeSubmitValues } from "../db/recipe/recipe.schemas";
import { Recipe } from "@/app/generated/prisma/client";
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

    const createdRecipe = await prisma.recipe.create({
      data: {
        ...recipe,
        slug: await createUniqueSlug(recipe.name),
        directions: recipe.directions.map((d) => d.value),
        authorId: user.id,
        tags: recipe.tags.map((t) => t.text),
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
    await prisma.recipe.update({
      where: { id },
      data: {
        ...recipe,
        directions: recipe.directions.map((d) => d.value),
        tags: recipe.tags.map((t) => t.text),
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

export const getRecipeBySlug = async (slug: string): Promise<Recipe | null> => {
  try {
    return await prisma.recipe.findUnique({
      where: { slug },
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
