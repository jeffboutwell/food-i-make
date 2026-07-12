import { z } from "zod";
import {
  CategoryFormSchema,
  CategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/schemas";

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;
