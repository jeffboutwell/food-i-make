import { z } from "zod";
import { IngredientSectionFormSchema } from "@/lib/db/recipe/ingredient-section.schemas";
import { SourceSchema } from "@/lib/db/recipe/recipe.schemas";

export const DirectionFormSchema = z.object({
  value: z.string(),
});

export const RecipeFormSchema = z.object({
  id: z.number().optional(),

  name: z.string(),
  slug: z.string(),

  description: z.string(),

  prepTime: z.number(),
  cookTime: z.number(),

  servings: z.string(),
  notes: z.string(),

  images: z.array(z.string()),
  tags: z.array(z.string()),

  directions: z.array(
    z.object({
      value: z.string(),
    }),
  ),

  sections: z.array(IngredientSectionFormSchema),

  source: SourceSchema.nullable().optional(),
});

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;
