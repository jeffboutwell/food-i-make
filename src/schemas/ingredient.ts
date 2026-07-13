import { z } from "zod";
import { parseQuantity } from "@/lib/utils/ingredient";

const quantitySchema = z.preprocess(
  parseQuantity,
  z.coerce.number().positive().optional(),
);

export const IngredientFormSchema = z.object({
  name: z.string(),
  quantity: quantitySchema,
  unit: z.string().nullable(),
});
