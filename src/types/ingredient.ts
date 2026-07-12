import { z } from "zod";
import { IngredientFormSchema } from "@/schemas";

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
