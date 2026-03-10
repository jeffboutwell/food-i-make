"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../../../atoms/input-field/input-field";
import { useRouter } from "next/navigation";
import { H1 } from "@/lib/typography";
import { TextArea } from "@/lib/components/atoms/text-area/text-area";
import { FieldSet } from "@/components/ui/field";
import { EditSource } from "./edit-source/edit-recipe-source";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { updateRecipe } from "@/lib/actions/recipe.actions";
import { RecipeFormSchema } from "@/lib/db/recipe/recipe.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toRecipeFormValues } from "@/lib/utils";
import { z } from "zod";
import { Recipe as RecipeProps } from "@/app/generated/prisma/client";
import { EditImage } from "./edit-image/edit-recipe-image";
import { useImageUpload } from "@/lib/hooks/image-upload";
import { ImageSchema, type ImageFormValues } from "@/lib/db/recipe/image.types";
import { RecipeSubmitValues } from "@/lib/db/recipe/recipe.schemas";

const isFileList = (value: unknown): value is FileList => {
  if (typeof FileList === "undefined") {
    return false;
  }

  return value instanceof FileList;
};

const EditIngredientSections = dynamic(
  () =>
    import("./edit-ingredient/edit-recipe-ingredient-sections").then(
      (mod) => mod.EditIngredientSections,
    ),
  { ssr: false },
);

const EditDirections = dynamic(
  () =>
    import("./edit-direction/edit-recipe-directions").then(
      (mod) => mod.EditDirections,
    ),
  { ssr: false },
);

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

    const { imageFiles: _imageFiles, ...recipeWithoutFiles } = data;
    const recipePayload: RecipeSubmitValues = {
      ...recipeWithoutFiles,
      images,
    };

    await updateRecipe(recipe.id, recipePayload);
    router.push(`/recipe/${recipe.slug}`);
  };

  const onCancel = () => {
    router.push(`/recipe/${recipe.slug}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="EditRecipeForm py-12"
      >
        <div className="EditRecipeForm__container flex flex-col gap-8">
          <H1>Edit {recipe.name}</H1>
          <FieldSet>
            <InputField id="name" name="name" label="Name" placeholder="Name" />
            <TextArea name="description" label="Description" />
          </FieldSet>
          <FieldSet className="grid grid-cols-3 gap-4">
            <InputField
              id="servings"
              name="servings"
              label="Servings"
              placeholder="Servings"
            />
            <InputField
              id="prepTime"
              name="prepTime"
              label="Prep Time"
              placeholder="Prep Time"
              type={"number"}
            />
            <InputField
              id="cookTime"
              name="cookTime"
              label="Cook Time"
              placeholder="Cook Time"
              type={"number"}
            />
          </FieldSet>
          <EditIngredientSections />
          <EditDirections />
          <FieldSet className="flex flex-col gap-4">
            <EditSource />
            <TextArea name={"notes"} label={"Notes"} />
          </FieldSet>
          <EditImage currentImages={recipe.images as ImageFormValues[]} />
          <FieldSet className="grid grid-cols-2 gap-12">
            <Button
              type="submit"
              disabled={isUploading || methods.formState.isSubmitting}
            >
              Save
            </Button>
            <Button type="button" variant={"outline"} onClick={onCancel}>
              Cancel
            </Button>
          </FieldSet>
        </div>
      </form>
    </FormProvider>
  );
};
