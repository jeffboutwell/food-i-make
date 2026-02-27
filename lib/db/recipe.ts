import { Prisma } from "@/app/generated/prisma/client";

export const recipeFullInclude = {
  sections: {
    orderBy: { order: "asc" },
    include: {
      ingredients: {
        orderBy: { order: "asc" },
      },
    },
  },
} satisfies Prisma.RecipeInclude;

export type RecipeFull = Prisma.RecipeGetPayload<{
  include: typeof recipeFullInclude;
}>;

export type RecipeCreateInput = Prisma.RecipeCreateInput;

export type RecipeUpdateInput = Prisma.RecipeUpdateInput;
