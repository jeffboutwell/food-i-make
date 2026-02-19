import { Prisma } from "@prisma/client";

export const ingredientFullInclude = {} satisfies Prisma.IngredientInclude;

export type IngredientFull = Prisma.IngredientGetPayload<{
  include: typeof ingredientFullInclude;
}>;
