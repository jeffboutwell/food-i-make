import { Prisma } from "@prisma/client";

export type RecipeWithIngredients = Prisma.RecipeGetPayload<{
  include: {
    sections: {
      include: {
        ingredients: true;
      };
    };
  };
}>;

export type SectionWithIngredients = Prisma.IngredientSectionGetPayload<{
  include: {
    ingredients: true;
  };
}>;

export type Ingredient = Prisma.IngredientGetPayload<{}>;
