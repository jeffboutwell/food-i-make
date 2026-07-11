import { z } from "zod";
import { IngredientFormSchema } from "./ingredient.schemas";

export const IngredientSectionFormSchema = z.object({
  name: z.string(),
  ingredients: z.array(IngredientFormSchema),
});

export type IngredientSectionFormValues = z.infer<
  typeof IngredientSectionFormSchema
>;
