"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { DragEndEvent } from "@dnd-kit/core";

import { EditIngredientSection } from "./ingredient-section";
import { AddButton } from "@/components/atoms/actions/add-button";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { IngredientFormValues, RecipeFormValues } from "@/types";

export const EditIngredientSections = () => {
  const { control } = useFormContext<RecipeFormValues>();

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const createEmptyIngredientItem = (): IngredientFormValues => ({
    name: "",
    quantity: undefined,
    unit: "",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    move(oldIndex, newIndex);
  };

  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      <Sortable
        value={fields}
        onValueChange={() => {}}
        onDragEnd={handleDragEnd}
        getItemValue={(field) => field.id}
        strategy="vertical"
        className="space-y-6"
      >
        {fields.map((field, index) => (
          <SortableItem key={field.id} value={field.id}>
            <EditIngredientSection
              sectionIndex={index}
              onRemove={() => remove(index)}
            />
          </SortableItem>
        ))}
      </Sortable>

      <AddButton
        onAppend={() =>
          append({
            name: "",
            ingredients: [createEmptyIngredientItem()],
          })
        }
      />
    </div>
  );
};
