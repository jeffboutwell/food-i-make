import { z } from "zod";
import { IngredientFormSchema } from "./ingredient";

export const IngredientSectionFormSchema = z.object({
  name: z.string(),
  ingredients: z.array(IngredientFormSchema),
});
