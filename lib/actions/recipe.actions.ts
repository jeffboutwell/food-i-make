"use server";

import { recipeFullInclude, RecipeFull } from "../db/recipe/recipe.types";
import { RecipeFormValues } from "../forms/recipe/recipe-form.schemas";
import { syncRecipeSections } from "../db/recipe/sync/section.sync";

import prisma from "@/lib/db/prisma";

export const updateRecipe = async (id: number, values: RecipeFormValues) => {
  const { sections, directions, id: _, ...recipe } = values;

  return prisma.$transaction(async (tx) => {
    const existing = await tx.recipe.findUniqueOrThrow({
      where: { id },
      include: recipeFullInclude,
    });

    const updated = await tx.recipe.update({
      where: { id },
      data: {
        ...recipe,
        directions: directions.map((d) => d.value),
      },
    });

    await syncRecipeSections(tx, id, existing.sections, sections);

    return updated;
  });
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
