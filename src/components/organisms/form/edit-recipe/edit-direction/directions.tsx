// EditDirections.tsx
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RecipeFormValues } from "@/types";
import { EditDirectionItem } from "./direction";
import { AddButton } from "@/components/atoms/actions/add-button";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { DragEndEvent } from "@dnd-kit/core";

export const EditDirections = () => {
  const { control } = useFormContext<RecipeFormValues>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "directions",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <div className="space-y-4">
      <Sortable
        value={fields}
        onValueChange={() => {}}
        onDragEnd={handleDragEnd}
        getItemValue={(field) => field.id}
        strategy="vertical"
        className="space-y-4"
      >
        {fields.map((field, index) => (
          <SortableItem key={field.id} value={field.id}>
            <EditDirectionItem index={index} onRemove={() => remove(index)} />
          </SortableItem>
        ))}
      </Sortable>
      <AddButton onAppend={() => append({ value: "" })} />
    </div>
  );
};
