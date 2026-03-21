import { z } from "zod";
import { ImageSchema } from "./recipe/image.types";

export const CategorySchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Category slug is required"),
  image: ImageSchema.nullish(),
});

export const CreateCategorySchema = CategorySchema.omit({
  id: true,
});

export const UpdateCategorySchema = CategorySchema.partial().omit({
  id: true,
});

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
