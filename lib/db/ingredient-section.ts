import { IngredientSectionSchema } from "@/app/generated/zod/schemas";
import { IngredientUpdateSchema, IngredientCreateSchema } from "./ingredient";
import { z } from "zod";

export const IngredientSectionUpdateSchema = IngredientSectionSchema.pick({
  id: true,
  name: true,
  order: true,
}).extend({ ingredients: z.array(IngredientUpdateSchema) });

export type IngredientSectionUpdateSchema = z.infer<
  typeof IngredientSectionUpdateSchema
>;

export const IngredientSectionCreateSchema = IngredientSectionSchema.pick({
  id: true,
  name: true,
  order: true,
}).extend({ ingredients: z.array(IngredientCreateSchema) });

export type IngredientSectionCreateSchema = z.infer<
  typeof IngredientSectionCreateSchema
>;
