import { Prisma } from "@/app/generated/prisma/client";

/* export const recipeFullInclude = {
  sections: {
    orderBy: { order: "asc" },
    include: {
      ingredients: {
        orderBy: { order: "asc" },
      },
    },
  },
} satisfies Prisma.RecipeInclude; */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type RecipeFull = Prisma.RecipeGetPayload<{}>;
