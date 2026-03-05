import { z } from "zod";

const quantitySchema = z
  .union([z.coerce.number().positive(), z.null()])
  .optional();

const BaseIngredientSchema = z.object({
  name: z.string(),
  quantity: quantitySchema,
  unit: z.string().nullable(),
  note: z.string().nullable(),
  order: z.number(),
});

export const IngredientUpdateSchema = BaseIngredientSchema.extend({
  id: z.number(),
  sectionId: z.number(),
});

export const IngredientCreateSchema = BaseIngredientSchema;

export const IngredientFormSchema = BaseIngredientSchema.extend({
  id: z.number().optional(),
});

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
