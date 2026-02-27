// lib/forms/recipe-form-values.ts

export type IngredientFormValues = {
  name: string;
  quantity: number | null;
  unit: string | null;
  note: string | null;
  order: number;
};

export type IngredientSectionFormValues = {
  name: string | null;
  order: number;
  ingredients: IngredientFormValues[];
};

export type RecipeFormValues = {
  name: string;
  slug: string;
  description: string;
  prepTime: number;
  cookTime?: number;
  servings: string;
  notes?: string;

  directions: string[];
  images: string[];
  tags: string[];

  source?: { name: string; url: string };
  sections: IngredientSectionFormValues[];
};
