import { z } from "zod";
import {
  IngredientUpdateSchema,
  IngredientCreateSchema,
  IngredientFormSchema,
} from "./ingredient";

// Base
const BaseIngredientSectionSchema = z.object({
  name: z.string().trim().min(1, "Section name is required"),
  order: z.number().int().nonnegative(),
});

// Form
export const IngredientSectionFormSchema = BaseIngredientSectionSchema.extend({
  id: z.number().optional(),
  ingredients: z.array(IngredientFormSchema),
});

export type IngredientSectionFormValues = z.infer<
  typeof IngredientSectionFormSchema
>;

// Create
export const IngredientSectionCreateSchema = BaseIngredientSectionSchema.extend(
  {
    ingredients: z.array(IngredientCreateSchema),
  },
);

export type IngredientSectionCreateValues = z.infer<
  typeof IngredientSectionCreateSchema
>;

// Update
export const IngredientSectionUpdateSchema = BaseIngredientSectionSchema.extend(
  {
    id: z.number(),
    ingredients: z.array(IngredientUpdateSchema),
  },
);

export type IngredientSectionUpdateValues = z.infer<
  typeof IngredientSectionUpdateSchema
>;

// Result
export const IngredientSectionResultSchema = BaseIngredientSectionSchema.extend(
  {
    id: z.number(),
    ingredients: z.array(IngredientUpdateSchema),
  },
);

export type IngredientSectionResultValues = z.infer<
  typeof IngredientSectionResultSchema
>;
