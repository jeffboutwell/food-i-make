// This file must be a module, so we include an empty export.
export {};
import { SourceProps } from "./recipe/source.schema";
import { IngredientFormValues } from "./recipe/ingredient.schemas";
import { IngredientSectionFormValues } from "./recipe/ingredient-section.schemas";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    // Define a type for a source of a recipe.
    type Source = SourceProps;
    type Ingredient = IngredientFormValues;
    type IngredientSection = IngredientSectionFormValues;
  }
}
