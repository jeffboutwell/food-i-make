import React from "react";
import { RecipeFormSchema } from "@/lib/db";
import { useFormContext, useFieldArray } from "react-hook-form";

export const EditDirection = () => {
  const { control } = useFormContext<RecipeFormSchema>();
  const { fields } = useFieldArray({
    control,
    name: "directions",
  });
  return <div>edit-recipe-direction</div>;
};
