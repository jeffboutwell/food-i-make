import { Prisma } from "@/app/generated/prisma/client";

export const ingredientSectionFullInclude = {
  ingredients: {
    orderBy: { order: "asc" },
  },
} satisfies Prisma.IngredientSectionInclude;

export type IngredientSectionFull = Prisma.IngredientSectionGetPayload<{
  include: typeof ingredientSectionFullInclude;
}>;
