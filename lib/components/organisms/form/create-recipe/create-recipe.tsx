"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { H1 } from "@/lib/typography";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  RecipeFormSchema,
  RecipeSubmitValues,
} from "@/lib/db/recipe/recipe.schemas";
import { ImageSchema, type ImageFormValues } from "@/lib/db/recipe/image.types";
import { useImageUpload } from "@/lib/hooks/image-upload";
import { RecipeFormBase } from "../recipe-form-base";
import {
  createRecipeFormDefaults,
  parseDirectionsText,
  parseIngredientsText,
} from "@/lib/utils";
import { createRecipe } from "@/lib/actions/recipe.actions";
import { EditTag } from "../edit-recipe/edit-categories/edit-categories";

const isFileList = (value: unknown): value is FileList => {
  if (typeof FileList === "undefined") {
    return false;
  }

  return value instanceof FileList;
};

export const CreateRecipe = () => {
  const router = useRouter();
  const { uploadImages, isUploading } = useImageUpload();
  const [directionsText, setDirectionsText] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [directionsError, setDirectionsError] = useState<string | null>(null);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const methods = useForm<
    z.input<typeof RecipeFormSchema>,
    undefined,
    z.output<typeof RecipeFormSchema>
  >({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: createRecipeFormDefaults(),
  });

  const onSubmit: SubmitHandler<z.output<typeof RecipeFormSchema>> = async (
    data,
  ) => {
    const directions = parseDirectionsText(directionsText);
    const sections = parseIngredientsText(ingredientsText);

    setDirectionsError(null);
    setIngredientsError(null);

    if (sections.length === 0) {
      setIngredientsError("Add at least one ingredient line before saving.");
      return;
    }

    if (directions.length === 0) {
      setDirectionsError("Add at least one direction line before saving.");
      return;
    }

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

    const recipePayload: RecipeSubmitValues = {
      name: data.name,
      description: data.description,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      notes: data.notes,
      categories: data.categories,
      directions,
      sections,
      source: data.source,
      images: [...data.images, ...uploadedImages],
    };

    const recipe = await createRecipe(recipePayload);
    router.push(`/recipe/${recipe.slug}`);
  };

  return (
    <RecipeFormBase
      methods={methods}
      title={<H1>Create Recipe</H1>}
      submitLabel="Create"
      onSubmit={onSubmit}
      onCancel={() => router.push("/recipes")}
      isSubmitDisabled={isUploading}
      categories={<EditTag />}
      ingredientsSection={
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="create-recipe-ingredients">
              Ingredients
            </FieldLabel>
            <Textarea
              id="create-recipe-ingredients"
              rows={12}
              value={ingredientsText}
              onChange={(event) => {
                setIngredientsText(event.target.value);
                if (ingredientsError) {
                  setIngredientsError(null);
                }
              }}
              placeholder={
                "Main:\n1 onion\n2 cloves garlic\n\nSauce:\n1 1/2 cups stock\n1 tbsp soy sauce"
              }
            />
            <FieldDescription>
              Use one ingredient per line. Add section headings with a trailing
              colon.
            </FieldDescription>
            {ingredientsError && <FieldError>{ingredientsError}</FieldError>}
          </Field>
        </FieldSet>
      }
      directionsSection={
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="create-recipe-directions">
              Directions
            </FieldLabel>
            <Textarea
              id="create-recipe-directions"
              rows={10}
              value={directionsText}
              onChange={(event) => {
                setDirectionsText(event.target.value);
                if (directionsError) {
                  setDirectionsError(null);
                }
              }}
              placeholder={
                "1. Prep the vegetables\n2. Saute until softened\n3. Stir in the sauce and simmer"
              }
            />
            <FieldDescription>
              Use one step per line. Numbering or bullets are optional.
            </FieldDescription>
            {directionsError && <FieldError>{directionsError}</FieldError>}
          </Field>
        </FieldSet>
      }
    />
  );
};
