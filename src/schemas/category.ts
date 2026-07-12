import { z } from "zod";
import { ImageSchema } from "@/schemas";

export const CategoryFormSchema = z.object({
  id: z.string(),
  text: z.string(),
});

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
