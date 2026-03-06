import { z } from "zod";

const quantitySchema = z.preprocess(
  (val) =>
    val === "" || val === null || val === undefined || val === 0
      ? undefined
      : val,
  z.coerce.number().positive().optional(),
);

export const IngredientFormSchema = z.object({
  name: z.string(),
  quantity: quantitySchema,
  unit: z.string().nullable(),
});

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
