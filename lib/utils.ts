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
    images: recipe.images as RecipeFormValues["images"],
  };
}

export function decimalToFraction(value: number): number | [number, number] {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const rounded = Math.round(value * 100000) / 100000;
  if (Number.isInteger(rounded)) {
    return rounded;
  }

  const precision = 100000;
  let numerator = Math.round(rounded * precision);
  let denominator = precision;

  const gcd = (a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const temp = x % y;
      x = y;
      y = temp;
    }
    return x || 1;
  };

  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  return [numerator, denominator];
}
