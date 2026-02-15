"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Recipe as RecipeProps } from "@/app/generated/prisma/client";
import { IngredientSectionProps } from "@/lib/schema";
import { EditingredientSection } from "./edit-recipe-ingredient-section";

export const EditIngredientSections = () => {
  const { control } = useFormContext<RecipeProps>();
  const { fields } = useFieldArray({
    control,
    name: "ingredients",
  });
  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      {fields.map((field: IngredientSectionProps, index) => (
        <EditingredientSection
          key={field.id}
          section={field}
          sectionIndex={index}
          id={field.id}
          isDisabled={true}
        />
      ))}
    </div>
  );
};
