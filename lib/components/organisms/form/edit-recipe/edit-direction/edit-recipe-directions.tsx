// EditDirections.tsx
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { RecipeFormValues } from "@/lib/db";
import { EditDirectionItem } from "./edit-recipe-direction";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { AddButton } from "@/lib/components/atoms/actions/add-button";

export const EditDirections = () => {
  const { control } = useFormContext<RecipeFormValues>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "directions",
  });

  return (
    <div className="space-y-4">
      <SortableContainer
        items={fields}
        onDragEnd={({ activeIndex, overIndex }) => {
          move(activeIndex, overIndex);
        }}
      >
        {fields.map((field, index) => (
          <SortableItem key={field.id} id={field.id}>
            <EditDirectionItem index={index} onRemove={() => remove(index)} />
          </SortableItem>
        ))}
      </SortableContainer>
      <AddButton onAppend={() => append({ value: "" })} />
    </div>
  );
};
