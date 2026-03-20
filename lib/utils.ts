import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { RecipeFormSchema, RecipeFormValues } from "./db/recipe/recipe.schemas";
import { RecipeFull } from "./db/recipe/recipe.types";
import { IngredientSectionFormValues } from "./db/recipe/ingredient-section.schemas";
import { RecipeSubmitValues } from "./db/recipe/recipe.schemas";
import { v4 as uuidv4 } from "uuid";
import { parseIngredient } from "parse-ingredient";

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
    categories: recipe.categories.map((category) => ({
      text: category.name,
      id: uuidv4(),
    })),
    images: recipe.images as RecipeFormValues["images"],
    imageFiles: undefined,
  };
}

export function createRecipeFormDefaults(): Partial<
  z.input<typeof RecipeFormSchema>
> {
  return {
    name: "",
    description: "",
    servings: "",
    notes: "",
    categories: [],
    directions: [],
    sections: [],
    source: {
      name: "",
      url: "",
    },
    images: [],
    imageFiles: undefined,
  };
}

export function parseDirectionsText(
  value: string,
): RecipeSubmitValues["directions"] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      value: line.replace(/^(?:[-*]\s+|\d+[.)]\s+)/, "").trim(),
    }))
    .filter((direction) => direction.value.length > 0);
}

export function getParsedSections(
  value: string,
): IngredientSectionFormValues[] {
  const parsed = parseIngredient(value);
  const sections: IngredientSectionFormValues[] = [];
  let currentSection: IngredientSectionFormValues = {
    name: "",
    ingredients: [],
  };

  for (const ingredient of parsed) {
    if (ingredient.isGroupHeader) {
      const sectionName = ingredient.description.replace(/:\s*$/, "").trim();

      if (currentSection.ingredients.length > 0 || currentSection.name) {
        sections.push(currentSection);
      }

      currentSection = {
        name: sectionName,
        ingredients: [],
      };
      continue;
    }

    const name = ingredient.description.trim();

    if (!name) {
      continue;
    }

    currentSection.ingredients.push({
      name,
      quantity: ingredient.quantity ?? undefined,
      unit: ingredient.unitOfMeasureID ?? ingredient.unitOfMeasure,
    });
  }

  if (currentSection.ingredients.length > 0 || currentSection.name) {
    sections.push(currentSection);
  }

  return sections.filter((section) => section.ingredients.length > 0);
}
