import { z } from "zod";
import {
  SourceSchema,
  ImageSchema,
  IngredientSectionFormSchema,
  CategoryFormSchema,
} from "@/schemas";

const FileListSchema = z.custom<FileList>(
  (value) => {
    if (typeof FileList === "undefined") {
      return false;
    }

    return value instanceof FileList;
  },
  {
    message: "Expected a file selection.",
  },
);

export const RecipeBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  prepTime: z.coerce.number(),
  cookTime: z.coerce.number().optional(),
  servings: z.string(),
  notes: z.string().optional(),
  images: z.array(ImageSchema),
  categories: z.array(z.string()),
  directions: z.array(z.string()),
  sections: z.array(IngredientSectionFormSchema),
  source: SourceSchema,
});

export const RecipeFormSchema = RecipeBaseSchema.omit({
  id: true,
  slug: true,
}).extend({
  images: z.array(ImageSchema),
  imageFiles: FileListSchema.optional(),
  directions: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  categories: z.array(CategoryFormSchema),
});
