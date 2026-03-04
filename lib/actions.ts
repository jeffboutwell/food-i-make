"use server";

import { buildRecipeUpdateInput } from "./db/transform";
import {
  recipeFullInclude,
  RecipeFormValues,
  RecipeFull,
  UserFull,
  userFullInclude,
} from "@/lib/db";

import prisma from "@/lib/prisma";

export const updateRecipe = async (id: number, data: RecipeFormValues) => {
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

export const getAllRecipes = async (): Promise<RecipeFull[] | null> => {
  try {
    return await prisma.recipe.findMany({ include: recipeFullInclude });
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

export const getRandomRecipe = async (): Promise<RecipeFull | null> => {
  const count = await prisma.recipe.count();

  if (count === 0) return null;

  const skip = Math.floor(Math.random() * count);

  return prisma.recipe.findFirst({
    skip,
    include: recipeFullInclude,
  });
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
