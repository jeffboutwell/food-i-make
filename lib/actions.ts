"use server";

import { Prisma } from "@/prisma-client";
import { recipeFullInclude, RecipeFull } from "@/lib/db/recipe";
import { buildRecipeUpdateInput } from "./db/transform";

import prisma from "@/lib/prisma";
import { userFullInclude, UserFull } from "./db/user";

export const updateRecipe = async (
  id: number,
  data: RecipeFull,
): Promise<RecipeFull> => {
  const updatedData = buildRecipeUpdateInput(data);
  try {
    return prisma.recipe.update({
      where: { id },
      data: updatedData,
      include: recipeFullInclude,
    });
  } catch (e) {
    console.error("Failed to update recipe:", e);
    throw new Error("Failed to update recipe");
  }
};

export const getAllRecipes = async (): Promise<RecipeFull[]> => {
  try {
    return await prisma.recipe.findMany({
      include: recipeFullInclude,
    });
  } catch (e) {
    console.error("Failed to fetch recipes:", e);
    throw new Error("Failed to fetch recipes");
  }
};

export const getRecipeBySlug = async (
  slug: string,
): Promise<RecipeFull | null> => {
  try {
    return await prisma.recipe.findUnique({
      where: { slug },
      include: recipeFullInclude,
    });
  } catch (e) {
    console.error("Failed to fetch recipe:", e);
    throw new Error("Failed to fetch recipe");
  }
};

export const getRandomRecipe = async () => {
  const randomEntry = await prisma.$queryRaw<Prisma.RecipeGetPayload<object>[]>(
    Prisma.sql`SELECT * FROM "Recipe" ORDER BY RANDOM() LIMIT 1`,
  );
  return randomEntry.length > 0 ? randomEntry[0] : null;
};

export const getUserById = async (id: number): Promise<UserFull | null> => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: userFullInclude,
    });
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw new Error("Failed to fetch user");
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<UserFull | null> => {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: userFullInclude,
    });
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw new Error("Failed to fetch user");
  }
};
