import { z } from "zod";
import { IngredientSectionFormSchema } from "./ingredient-section.schemas";

export const SourceSchema = z.object({
  name: z.string(),
  url: z.url(),
});

export const RecipeBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  prepTime: z.number(),
  cookTime: z.number().optional(),
  servings: z.string(),
  notes: z.string().optional(),
  images: z.array(z.string()),
  tags: z.array(z.string()),
  directions: z.array(z.string()),
  sections: z.array(IngredientSectionFormSchema),
  source: SourceSchema.optional(),
});

export type RecipeBase = z.infer<typeof RecipeBaseSchema>;

export const RecipeFormSchema = RecipeBaseSchema.omit({
  id: true,
  slug: true,
}).extend({
  directions: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;
