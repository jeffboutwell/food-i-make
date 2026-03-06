"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { EditingredientSection } from "./edit-recipe-ingredient-section";
import { RecipeFormValues } from "@/lib/forms/recipe/recipe-form.schemas";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";

export const EditIngredientSections = () => {
  const { control } = useFormContext<RecipeFormValues>();

  const { fields, move } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      <SortableContainer
        items={fields.map((field) => {
          return { id: field.id };
        })}
        onDragEnd={(args: { activeIndex: number; overIndex: number }) => {
          move(args.activeIndex, args.overIndex);
        }}
      >
        {fields.map((field, index) => (
          <SortableItem key={field.id} id={field.id}>
            <EditingredientSection
              key={field.id}
              sectionIndex={index}
              id={field.id}
              isDisabled={true}
            />
          </SortableItem>
        ))}
      </SortableContainer>
    </div>
  );
};
