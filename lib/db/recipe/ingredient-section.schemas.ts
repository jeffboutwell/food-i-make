import { z } from "zod";
import {
  IngredientUpdateSchema,
  IngredientFormSchema,
} from "./ingredient.schemas";

export const IngredientSectionUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
  ingredients: z.array(IngredientUpdateSchema),
});

export const IngredientSectionFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  order: z.number(),
  ingredients: z.array(IngredientFormSchema),
});

export type IngredientSectionFormValues = z.infer<
  typeof IngredientSectionFormSchema
>;
