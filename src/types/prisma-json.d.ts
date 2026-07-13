// This file must be a module, so we include an empty export.
export {};
import {
  SourceProps,
  IngredientFormValues,
  IngredientSectionFormValues,
} from "@/schemas";

declare global {
  namespace PrismaJson {
    // Define a type for a source of a recipe.
    type Source = SourceProps;
    type Ingredient = IngredientFormValues;
    type IngredientSection = IngredientSectionFormValues;
  }
}
