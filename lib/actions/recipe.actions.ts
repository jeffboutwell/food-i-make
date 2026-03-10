"use server";

import { RecipeSubmitValues } from "../db/recipe/recipe.schemas";
import { Recipe } from "@/app/generated/prisma/client";

import prisma from "@/lib/db/prisma";

export const updateRecipe = async (id: number, recipe: RecipeSubmitValues) => {
  try {
    await prisma.recipe.update({
      where: { id },
      data: {
        ...recipe,
        directions: recipe.directions.map((d) => d.value),
      },
    });
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
