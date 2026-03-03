"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { EditingredientSection } from "./edit-recipe-ingredient-section";
import { RecipeUpdateSchema, IngredientSectionUpdateSchema } from "@/lib/db";
export const EditIngredientSections = () => {
  const { control } = useFormContext<RecipeUpdateSchema>();
  const { fields } = useFieldArray({
    control,
    name: "sections",
  });
  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      {fields.map((field: IngredientSectionUpdateSchema, index) => (
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
