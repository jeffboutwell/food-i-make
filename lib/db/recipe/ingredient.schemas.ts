import { z } from "zod";

const quantitySchema = z.coerce
  .number()
  .positive()
  .or(z.literal(""))
  .optional()
  .transform((val) => (val === "" ? undefined : val));

export const IngredientFormSchema = z.object({
  name: z.string(),
  quantity: quantitySchema,
  unit: z.string().nullable(),
});

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
