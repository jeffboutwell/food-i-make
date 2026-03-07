import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecipeFormValues } from "./db/recipe/recipe.schemas";
import { RecipeFull } from "./db/recipe/recipe.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toRecipeFormValues(recipe: RecipeFull): RecipeFormValues {
  return {
    ...recipe,
    cookTime: recipe.cookTime ?? undefined,
    source: recipe.source ?? undefined,
    notes: recipe.notes ?? undefined,
    directions: recipe.directions.map((d) => ({
      value: d,
    })),
  };
}
