import { Prisma } from "@/app/generated/prisma/client";
import { RecipeSchema } from "@/app/generated/zod/schemas";
import {
  IngredientSectionUpdateSchema,
  IngredientSectionResultSchema,
} from "./ingredient-section";
import { DirectionUpdateSchema } from "./direction";
import { z } from "zod";
import { SourceSchema } from "./source";

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

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;

export const RecipeResultSchema = RecipeSchema.pick({
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
  sections: z.array(IngredientSectionResultSchema),
  source: SourceSchema.nullable().optional(),
});

export type RecipeResultSchema = z.infer<typeof RecipeResultSchema>;
