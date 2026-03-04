import { IngredientSchema } from "@/app/generated/zod/schemas";
import { z } from "zod";

const quantitySchema = z.coerce.number().positive().nullable().optional();

export const IngredientUpdateSchema = IngredientSchema.omit({
  quantity: true,
})
  .pick({
    id: true,
    name: true,
    unit: true,
    note: true,
    order: true,
    sectionId: true,
  })
  .extend({
    quantity: quantitySchema,
  });

export type IngredientUpdateSchema = z.infer<typeof IngredientUpdateSchema>;

export const IngredientCreateSchema = IngredientSchema.omit({
  quantity: true,
})
  .pick({
    name: true,
    unit: true,
    note: true,
  })
  .extend({
    quantity: quantitySchema,
  });

export type IngredientCreateSchema = z.infer<typeof IngredientCreateSchema>;

export type IngredientResultSchema = z.infer<typeof IngredientUpdateSchema>;
