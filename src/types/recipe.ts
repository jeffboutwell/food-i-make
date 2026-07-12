import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { RecipeBaseSchema, RecipeFormSchema } from "@/schemas";
import { ImageFormValues } from "@/types";

export const recipeFullInclude = {
  categories: true,
} satisfies Prisma.RecipeInclude;

export type RecipeFull = Prisma.RecipeGetPayload<{
  include: typeof recipeFullInclude;
}>;

export type RecipeWithCategories = Prisma.RecipeGetPayload<{
  include: {
    categories: true;
  };
}>;

export type RecipeBase = z.infer<typeof RecipeBaseSchema>;

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;

export type RecipeSubmitValues = Omit<
  RecipeFormValues,
  "images" | "imageFiles"
> & {
  images: ImageFormValues[];
};
