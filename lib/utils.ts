import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { RecipeFormSchema, RecipeFormValues } from "./db/recipe/recipe.schemas";
import { RecipeFull } from "./db/recipe/recipe.types";
import { IngredientSectionFormValues } from "./db/recipe/ingredient-section.schemas";
import { RecipeSubmitValues } from "./db/recipe/recipe.schemas";
import { v4 as uuidv4 } from "uuid";
import { parseIngredient } from "parse-ingredient";
import { Recipe } from "@/app/generated/prisma/browser";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";

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

export type ParsedShortcodePart =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "link";
      value: string;
      recipe: Recipe;
    };

const SHORTCODE_REGEX = /\[([^\]]+)\]([\s\S]*?)\[\/\]/g;

const toSlug = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const parseShortcodeLinks = async (
  text: string,
): Promise<ParsedShortcodePart[]> => {
  const parts: ParsedShortcodePart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(SHORTCODE_REGEX)) {
    const fullMatch = match[0];
    const rawSlug = match[1] ?? "";
    const displayText = match[2] ?? "";
    const start = match.index ?? 0;
    const end = start + fullMatch.length;

    if (start > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, start),
      });
    }

    const slug = toSlug(rawSlug);

    if (!slug) {
      parts.push({
        type: "text",
        value: fullMatch,
      });
      lastIndex = end;
      continue;
    }

    const recipe = await getRecipeBySlug(slug);

    if (!recipe) {
      parts.push({
        type: "text",
        value: fullMatch,
      });
      lastIndex = end;
      continue;
    }

    parts.push({
      type: "link",
      value: displayText.trim() || recipe.name,
      recipe,
    });

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  if (parts.length === 0) {
    return [
      {
        type: "text",
        value: text,
      },
    ];
  }

  return parts;
};

export const parseShortcodeLink = async (
  text: string,
): Promise<Recipe | null> => {
  const parts = await parseShortcodeLinks(text);
  const firstLink = parts.find((part) => part.type === "link");

  if (!firstLink || firstLink.type !== "link") {
    return null;
  }

  return firstLink.recipe;
};

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
