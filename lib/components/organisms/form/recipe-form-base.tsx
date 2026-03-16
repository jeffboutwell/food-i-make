"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { InputField } from "@/lib/components/atoms/input-field/input-field";
import { TextArea } from "@/lib/components/atoms/text-area/text-area";
import { RecipeFormSchema } from "@/lib/db/recipe/recipe.schemas";
import { type ImageFormValues } from "@/lib/db/recipe/image.types";
import { EditTag } from "./edit-recipe/edit-tag/edit-tag";

const EditIngredientSections = dynamic(
  () =>
    import("./edit-recipe/edit-ingredient/edit-recipe-ingredient-sections").then(
      (mod) => mod.EditIngredientSections,
    ),
  { ssr: false },
);

const EditDirections = dynamic(
  () =>
    import("./edit-recipe/edit-direction/edit-recipe-directions").then(
      (mod) => mod.EditDirections,
    ),
  { ssr: false },
);

const EditSource = dynamic(
  () =>
    import("./edit-recipe/edit-source/edit-recipe-source").then(
      (mod) => mod.EditSource,
    ),
  { ssr: false },
);

const EditImage = dynamic(
  () =>
    import("./edit-recipe/edit-image/edit-recipe-image").then(
      (mod) => mod.EditImage,
    ),
  { ssr: false },
);

type RecipeFormMethods = UseFormReturn<
  z.input<typeof RecipeFormSchema>,
  undefined,
  z.output<typeof RecipeFormSchema>
>;

type RecipeFormBaseProps = {
  currentImages?: ImageFormValues[];
  directionsSection?: ReactNode;
  ingredientsSection?: ReactNode;
  categories?: ReactNode;
  isSubmitDisabled?: boolean;
  onCancel: () => void;
  onSubmit: SubmitHandler<z.output<typeof RecipeFormSchema>>;
  submitLabel?: string;
  title: ReactNode;
  methods: RecipeFormMethods;
};

export const RecipeFormBase = ({
  currentImages,
  directionsSection,
  ingredientsSection,
  categories,
  isSubmitDisabled = false,
  onCancel,
  onSubmit,
  submitLabel = "Save",
  title,
  methods,
}: RecipeFormBaseProps) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="EditRecipeForm py-12"
      >
        <div className="EditRecipeForm__container flex flex-col gap-8">
          {title}
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
              type="number"
            />
            <InputField
              id="cookTime"
              name="cookTime"
              label="Cook Time"
              placeholder="Cook Time"
              type="number"
            />
          </FieldSet>
          {ingredientsSection ?? <EditIngredientSections />}
          {directionsSection ?? <EditDirections />}
          {categories ?? <EditTag />}
          <FieldSet className="flex flex-col gap-4">
            <EditSource />
            <TextArea name="notes" label="Notes" />
          </FieldSet>
          <EditImage currentImages={currentImages} />
          <FieldSet className="grid grid-cols-2 gap-12">
            <Button
              type="submit"
              disabled={isSubmitDisabled || methods.formState.isSubmitting}
            >
              {submitLabel}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </FieldSet>
        </div>
      </form>
    </FormProvider>
  );
};
