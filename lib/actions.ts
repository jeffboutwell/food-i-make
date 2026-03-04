"use server";

import { RecipeFormSchema } from "@/lib/db/recipe";
import { buildRecipeUpdateInput } from "./db/transform";
import { recipeFullInclude } from "@/lib/db/recipe";

import prisma from "@/lib/prisma";

export const updateRecipe = async (id: number, data: RecipeFormSchema) => {
  const updatedData = buildRecipeUpdateInput(data);

  try {
    return await prisma.recipe.update({
      where: { id },
      data: updatedData,
    });
  } catch (e) {
    console.error("Failed to update recipe:", e);
    throw new Error("Failed to update recipe");
  }
};

export const getAllRecipes = async () => {
  try {
    return await prisma.recipe.findMany({ include: recipeFullInclude });
  } catch (e) {
    console.error("Failed to fetch recipes:", e);
    throw new Error("Failed to fetch recipes");
  }
};

export const getRecipeBySlug = async (slug: string) => {
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
  const count = await prisma.recipe.count();

  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  return prisma.recipe.findFirst({
    skip,
    include: recipeFullInclude,
  });
};

export const getUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw new Error("Failed to fetch user");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw new Error("Failed to fetch user");
  }
};
