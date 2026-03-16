import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { RecipeFormSchema, RecipeFormValues } from "./db/recipe/recipe.schemas";
import { RecipeFull } from "./db/recipe/recipe.types";
import { IngredientSectionFormValues } from "./db/recipe/ingredient-section.schemas";
import { RecipeSubmitValues } from "./db/recipe/recipe.schemas";
import { v4 as uuidv4 } from "uuid";

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

const knownUnits = new Set([
  "c",
  "cup",
  "cups",
  "tbsp",
  "tablespoon",
  "tablespoons",
  "tsp",
  "teaspoon",
  "teaspoons",
  "oz",
  "ounce",
  "ounces",
  "lb",
  "lbs",
  "pound",
  "pounds",
  "g",
  "gram",
  "grams",
  "kg",
  "ml",
  "l",
  "pinch",
  "pinches",
  "dash",
  "dashes",
  "clove",
  "cloves",
  "can",
  "cans",
  "package",
  "packages",
  "pkg",
  "pkgs",
  "stick",
  "sticks",
  "slice",
  "slices",
  "bunch",
  "bunches",
  "sprig",
  "sprigs",
  "head",
  "heads",
  "fl oz",
]);

const normalizeToken = (value: string) =>
  value.toLowerCase().replace(/[.,]$/g, "");

const parseQuantity = (value: string) => {
  const mixedMatch = value.match(/^(\d+)\s+(\d+)\/(\d+)(?:\s+(.*))?$/);

  if (mixedMatch) {
    const whole = Number(mixedMatch[1]);
    const numerator = Number(mixedMatch[2]);
    const denominator = Number(mixedMatch[3]);

    if (denominator !== 0) {
      return {
        quantity: whole + numerator / denominator,
        rest: mixedMatch[4]?.trim() ?? "",
      };
    }
  }

  const fractionMatch = value.match(/^(\d+)\/(\d+)(?:\s+(.*))?$/);

  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);

    if (denominator !== 0) {
      return {
        quantity: numerator / denominator,
        rest: fractionMatch[3]?.trim() ?? "",
      };
    }
  }

  const numberMatch = value.match(/^(\d+(?:\.\d+)?)(?:\s+(.*))?$/);

  if (numberMatch) {
    return {
      quantity: Number(numberMatch[1]),
      rest: numberMatch[2]?.trim() ?? "",
    };
  }

  return {
    quantity: undefined,
    rest: value.trim(),
  };
};

const parseUnitAndName = (value: string) => {
  if (!value) {
    return {
      unit: "",
      name: "",
    };
  }

  const tokens = value.split(/\s+/);
  const firstTwoTokens = tokens.slice(0, 2);
  const firstTwo = firstTwoTokens.map(normalizeToken).join(" ");

  if (firstTwoTokens.length === 2 && knownUnits.has(firstTwo)) {
    return {
      unit: firstTwoTokens.join(" "),
      name: tokens.slice(2).join(" ").trim(),
    };
  }

  const first = normalizeToken(tokens[0]);

  if (knownUnits.has(first)) {
    return {
      unit: tokens[0],
      name: tokens.slice(1).join(" ").trim(),
    };
  }

  return {
    unit: "",
    name: value.trim(),
  };
};

const parseIngredientLine = (line: string) => {
  const cleanedLine = line.replace(/^[-*]\s*/, "").trim();
  const { quantity, rest } = parseQuantity(cleanedLine);
  const { unit, name } = parseUnitAndName(rest);

  return {
    name: name || cleanedLine,
    quantity,
    unit,
  };
};

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

export function parseIngredientsText(
  value: string,
): IngredientSectionFormValues[] {
  const lines = value.split(/\r?\n/);
  const sections: IngredientSectionFormValues[] = [];
  let currentSection: IngredientSectionFormValues = {
    name: "",
    ingredients: [],
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const headerMatch = trimmedLine.match(/^(.+):$/);

    if (headerMatch && !trimmedLine.startsWith("-")) {
      if (currentSection.ingredients.length > 0 || currentSection.name) {
        sections.push(currentSection);
      }

      currentSection = {
        name: headerMatch[1].trim(),
        ingredients: [],
      };
      continue;
    }

    currentSection.ingredients.push(parseIngredientLine(trimmedLine));
  }

  if (currentSection.ingredients.length > 0 || currentSection.name) {
    sections.push(currentSection);
  }

  return sections.filter((section) => section.ingredients.length > 0);
}

export function decimalToFraction(
  value: number,
): number | [number, number] | [number, number, number] {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const rounded = Math.round(value * 100000) / 100000;
  if (Number.isInteger(rounded)) {
    return rounded;
  }

  const wholeNumber = Math.floor(rounded);
  const fractionalPart = rounded - wholeNumber;

  const precision = 100000;
  let numerator = Math.round(fractionalPart * precision);
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

  if (wholeNumber > 0) {
    return [wholeNumber, numerator, denominator];
  }

  return [numerator, denominator];
}
