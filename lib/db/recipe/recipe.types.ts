import { Prisma } from "@/app/generated/prisma/client";

export const recipeFullInclude = {
  categories: true,
} satisfies Prisma.RecipeInclude;

export type RecipeFull = Prisma.RecipeGetPayload<{
  include: typeof recipeFullInclude;
}>;
