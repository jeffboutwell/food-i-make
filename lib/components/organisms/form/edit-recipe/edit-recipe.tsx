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
import { updateRecipe } from "@/lib/actions";
import { RecipeUpdateSchema } from "@/lib/db";
import { zodResolver } from "@hookform/resolvers/zod";

const EditIngredientSections = dynamic(
  () =>
    import("./edit-ingredient/edit-recipe-ingredient-sections").then(
      (mod) => mod.EditIngredientSections,
    ),
  { ssr: false },
);

export const EditRecipe = ({ recipe }: { recipe: RecipeUpdateSchema }) => {
  const router = useRouter();
  const methods = useForm<RecipeUpdateSchema>({
    resolver: zodResolver(RecipeUpdateSchema),
    defaultValues: recipe,
  });

  const onSubmit: SubmitHandler<RecipeUpdateSchema> = async (
    data: RecipeUpdateSchema,
  ) => {
    await updateRecipe(recipe.id, data);
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
            <InputField
              id="name"
              name="name"
              label="Name"
              placeholder="Name"
              value={recipe.name}
            />
            <TextArea
              name="description"
              label="Description"
              value={recipe.description}
            />
          </FieldSet>
          <FieldSet className="grid grid-cols-3 gap-4">
            <InputField
              id="servings"
              name="servings"
              label="Servings"
              placeholder="Servings"
              value={recipe.servings}
            />
            <InputField
              id="prepTime"
              name="prepTime"
              label="Prep Time"
              placeholder="Prep Time"
              type={"number"}
              value={recipe.prepTime.toString()}
            />
            <InputField
              id="cookTime"
              name="cookTime"
              label="Cook Time"
              placeholder="Cook Time"
              type={"number"}
              value={recipe.cookTime.toString()}
            />
          </FieldSet>
          <EditIngredientSections />
          {/*<EditDirections />*/}
          <FieldSet className="flex flex-col gap-4">
            <EditSource />
            <TextArea name={"notes"} label={"Notes"} />
          </FieldSet>
          {/* <EditImage /> */}
          <FieldSet className="grid grid-cols-2 gap-12">
            <Button type="submit">Save</Button>
            <Button type="button" variant={"outline"} onClick={onCancel}>
              Cancel
            </Button>
          </FieldSet>
        </div>
      </form>
    </FormProvider>
  );
};
