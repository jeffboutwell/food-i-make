"use client";

import { Recipe as RecipeProps } from "@/app/generated/prisma/client";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "../../../atoms/input-field/input-field";
import { useRouter } from "next/navigation";
import { H1 } from "@/lib/typography";
import { TextArea } from "@/lib/components/atoms/text-area/text-area";
import { FieldSet } from "@/components/ui/field";
import { EditSource } from "./edit-source/edit-recipe-source";

import { Button } from "@/components/ui/button";
/* import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";*/

export const EditRecipe = ({ recipe }: { recipe: RecipeProps }) => {
  const router = useRouter();
  const methods = useForm<RecipeProps>({ defaultValues: recipe });

  const onSubmit: SubmitHandler<RecipeProps> = (data: RecipeProps) => {
    console.log("form submitted", data);
    /*     await updateRecipe(data);
    router.push(`/recipe/${recipe.slug}`); */
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
          {/*           <EditIngredientSections />
          <EditDirections />*/}
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
