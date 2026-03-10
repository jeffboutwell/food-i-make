"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { H1 } from "@/lib/typography";
import { updateRecipe } from "@/lib/actions/recipe.actions";
import { RecipeFormSchema } from "@/lib/db/recipe/recipe.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toRecipeFormValues } from "@/lib/utils";
import { z } from "zod";
import { Recipe as RecipeProps } from "@/app/generated/prisma/client";
import { useImageUpload } from "@/lib/hooks/image-upload";
import { ImageSchema, type ImageFormValues } from "@/lib/db/recipe/image.types";
import { RecipeSubmitValues } from "@/lib/db/recipe/recipe.schemas";
import { RecipeFormBase } from "../recipe-form-base";

const isFileList = (value: unknown): value is FileList => {
  if (typeof FileList === "undefined") {
    return false;
  }

  return value instanceof FileList;
};

export const EditRecipe = ({ recipe }: { recipe: RecipeProps }) => {
  const router = useRouter();
  const { uploadImages, isUploading } = useImageUpload();
  const methods = useForm<
    z.input<typeof RecipeFormSchema>,
    undefined,
    z.output<typeof RecipeFormSchema>
  >({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: toRecipeFormValues(recipe),
  });

  const onSubmit: SubmitHandler<z.output<typeof RecipeFormSchema>> = async (
    data,
  ) => {
    const uploadedImages: ImageFormValues[] = [];

    if (isFileList(data.imageFiles) && data.imageFiles.length > 0) {
      const uploadResponses = await uploadImages(data.imageFiles);

      if (!uploadResponses) {
        methods.setError("imageFiles", {
          type: "validate",
          message: "Image upload failed. Please try again.",
        });
        return;
      }

      for (const uploadResponse of uploadResponses) {
        const parsedImage = ImageSchema.safeParse(uploadResponse);

        if (!parsedImage.success) {
          methods.setError("imageFiles", {
            type: "validate",
            message: "Image upload returned invalid data.",
          });
          return;
        }

        uploadedImages.push(parsedImage.data);
      }
    }

    const images = [...data.images, ...uploadedImages];

    const recipePayload: RecipeSubmitValues = {
      name: data.name,
      description: data.description,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      notes: data.notes,
      tags: data.tags,
      directions: data.directions,
      sections: data.sections,
      source: data.source,
      images,
    };

    await updateRecipe(recipe.id, recipePayload);
    router.push(`/recipe/${recipe.slug}`);
  };

  const onCancel = () => {
    router.push(`/recipe/${recipe.slug}`);
  };

  return (
    <RecipeFormBase
      methods={methods}
      title={<H1>Edit {recipe.name}</H1>}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isSubmitDisabled={isUploading}
      currentImages={recipe.images as ImageFormValues[]}
    />
  );
};
