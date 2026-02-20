"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { IngredientSectionFull } from "@/lib/db/ingredient-section";
import { EditingredientSection } from "./edit-recipe-ingredient-section";
import { RecipeFull } from "@/lib/db/recipe";

export const EditIngredientSections = () => {
  const { control } = useFormContext<RecipeFull>();
  const { fields } = useFieldArray({
    control,
    name: "sections",
  });
  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      {fields.map((field: IngredientSectionFull, index) => (
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
