import { RecipeSchema } from "@/app/generated/zod/schemas";
import { IngredientSectionUpdateSchema } from "./ingredient-section";
import { z } from "zod";

export const RecipeUpdateSchema = RecipeSchema.pick({
  id: true,
  name: true,
  slug: true,
  description: true,
  prepTime: true,
  cookTime: true,
  servings: true,
  notes: true,
  directions: true,
  images: true,
  tags: true,
  source: true,
}).extend({
  sections: z.array(IngredientSectionUpdateSchema),
});

export type RecipeUpdateSchema = z.infer<typeof RecipeUpdateSchema>;

export const RecipeFormSchema = RecipeUpdateSchema.extend({
  directions: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

export type RecipeFormSchema = z.infer<typeof RecipeFormSchema>;
