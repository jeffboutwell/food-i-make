import { RecipeSchema } from "@/app/generated/zod/schemas";
import { IngredientSectionUpdateSchema } from "./ingredient-section";
import { DirectionUpdateSchema } from "./direction";
import { z } from "zod";
import { SourceSchema } from "./source";

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
  source: SourceSchema.nullable().optional(),
});

export type RecipeUpdateSchema = z.infer<typeof RecipeUpdateSchema>;

export const RecipeFormSchema = RecipeUpdateSchema.extend({
  directions: z.array(DirectionUpdateSchema),
});

export type RecipeFormSchema = z.infer<typeof RecipeFormSchema>;
