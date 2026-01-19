import {
  Recipe as RecipeProps,
  User as UserProps,
} from "../app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const getAllRecipes = async (): Promise<RecipeProps[]> => {
  try {
    const results = await prisma.recipe.findMany();
    await prisma.$disconnect();
    return results;
  } catch (e: unknown) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

export const getRecipeBySlug = async (
  slug: string,
): Promise<RecipeProps | null> => {
  try {
    const result = await prisma.recipe.findUnique({
      where: {
        slug: slug,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (e: unknown) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

export const getUserById = async (id: number): Promise<UserProps | null> => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (e: unknown) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<UserProps | null> => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    await prisma.$disconnect();
    return result;
  } catch (e: unknown) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};
