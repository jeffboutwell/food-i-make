import { Prisma } from "@/app/generated/prisma/client";
import { z } from "zod";
import {
  IngredientSectionFormSchema,
  IngredientSectionResultSchema,
} from "./ingredient-section";
import {} from "./ingredient-section";
import { DirectionsFormSchema } from "./direction";
import { SourceSchema } from "./source";

// DB
export const recipeFullInclude = {
  sections: {
    orderBy: { order: "asc" },
    include: {
      ingredients: {
        orderBy: { order: "asc" },
      },
    },
  },
} satisfies Prisma.RecipeInclude;

export type RecipeFull = Prisma.RecipeGetPayload<{
  include: typeof recipeFullInclude;
}>;

// --- Base Recipe Schema ---
const BaseRecipeSchema = z.object({
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
  source: SourceSchema.nullable().optional(),
});

// Update
export const RecipeUpdateSchema = BaseRecipeSchema.extend({
  sections: z.array(IngredientSectionFormSchema),
  directions: DirectionsFormSchema,
});

export type RecipeUpdateValues = z.infer<typeof RecipeUpdateSchema>;

// Form
export const RecipeFormSchema = RecipeUpdateSchema;

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;

// Result
export const RecipeResultSchema = BaseRecipeSchema.extend({
  sections: z.array(IngredientSectionResultSchema),
  directions: DirectionsFormSchema,
});

export type RecipeResultValues = z.infer<typeof RecipeResultSchema>;
