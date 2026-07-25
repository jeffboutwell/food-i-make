import { ParsedShortcodePart } from "@/features/recipes/shortcodes-parse";

export type IngredientDisplay = {
  name: string;
  quantity: number | null;
  unit: string | null;
  nameParts: ParsedShortcodePart[];
};

export type IngredientSectionDisplay = {
  name: string;
  ingredients: IngredientDisplay[];
};
