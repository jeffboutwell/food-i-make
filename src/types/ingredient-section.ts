import { z } from "zod";
import { IngredientSectionFormSchema } from "@/schemas";

export type IngredientSectionFormValues = z.infer<
  typeof IngredientSectionFormSchema
>;
