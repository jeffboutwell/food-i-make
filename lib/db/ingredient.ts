import { z } from "zod";

// Base
const quantitySchema = z
  .union([z.coerce.number().positive(), z.null()])
  .optional();

const BaseIngredientSchema = z.object({
  name: z.string().trim().min(1, "Ingredient name is required"),
  quantity: quantitySchema,
  unit: z.string().nullable(),
  note: z.string().nullable(),
  order: z.number().int().nonnegative(),
});

// Update
export const IngredientUpdateSchema = BaseIngredientSchema.extend({
  id: z.number(),
  sectionId: z.number(),
});

export type IngredientUpdateValues = z.infer<typeof IngredientUpdateSchema>;

// Create
export const IngredientCreateSchema = BaseIngredientSchema;

export type IngredientCreateValues = z.infer<typeof IngredientCreateSchema>;

// Results
export type IngredientResult = z.infer<typeof IngredientUpdateSchema>;

// Form
export const IngredientFormSchema = BaseIngredientSchema.extend({
  id: z.number().optional(),
});

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
