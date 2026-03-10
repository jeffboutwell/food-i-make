import { z } from "zod";
import { IngredientSectionFormSchema } from "./ingredient-section.schemas";
import { ImageSchema, type ImageFormValues } from "./image.types";

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

export const SourceSchema = z.object({
  name: z.string().optional(),
  url: z.union([z.string().url(), z.literal("")]).optional(),
});

export const RecipeBaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  prepTime: z.number(),
  cookTime: z.number().optional(),
  servings: z.string(),
  notes: z.string().optional(),
  images: z.array(ImageSchema),
  tags: z.array(z.string()),
  directions: z.array(z.string()),
  sections: z.array(IngredientSectionFormSchema),
  source: SourceSchema,
});

export type RecipeBase = z.infer<typeof RecipeBaseSchema>;

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
});

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;

export type RecipeSubmitValues = Omit<
  RecipeFormValues,
  "images" | "imageFiles"
> & {
  images: ImageFormValues[];
};
