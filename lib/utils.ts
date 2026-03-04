import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecipeFormValues, RecipeFull } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toRecipeFormValues(recipe: RecipeFull): RecipeFormValues {
  return {
    ...recipe,
    directions: recipe.directions.map((d) => ({
      value: d,
    })),
  };
}
