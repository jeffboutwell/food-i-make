import { z } from "zod";
import { IngredientSectionUpdateSchema } from "./ingredient-section.schemas";

export const SourceSchema = z.object({
  name: z.string(),
  url: z.url(),
});

export const RecipeUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.string(),
  notes: z.string(),
  images: z.array(z.string()),
  tags: z.array(z.string()),
  directions: z.array(z.string()),
  sections: z.array(IngredientSectionUpdateSchema),
  source: SourceSchema.nullable().optional(),
});
