import { IngredientSchema } from "@/app/generated/zod/schemas";
import { z } from "zod";

export const IngredientUpdateSchema = IngredientSchema.pick({
  id: true,
  name: true,
  quantity: true,
  unit: true,
  note: true,
  order: true,
  sectionId: true,
});

export type IngredientUpdateSchema = z.infer<typeof IngredientUpdateSchema>;

export const IngredientCreateSchema = IngredientSchema.pick({
  name: true,
  quantity: true,
  unit: true,
  note: true,
});

export type IngredientCreateSchema = z.infer<typeof IngredientCreateSchema>;

export type IngredientResultSchema = z.infer<typeof IngredientUpdateSchema>;
