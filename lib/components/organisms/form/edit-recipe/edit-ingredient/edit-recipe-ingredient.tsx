"use client";

import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { IconButton } from "../../../../atoms/icon-button/icon-button";
import { InputField } from "../../../../atoms/input-field/input-field";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { IngredientUpdateSchema } from "@/lib/db";

export const EditIngredient = ({
  ingredient,
  sectionField,
  handleRemove,
  sortingIndex,
}: {
  ingredient: IngredientUpdateSchema;
  sectionField: string;
  handleRemove: (index: number) => void;
  sortingIndex: number;
}) => {
  const { control } = useFormContext();

  return (
    <SortableItem id={ingredient.id}>
      {({ setActivatorNodeRef, listeners }) => (
        <div className="flex flex-row gap-2 items-end p-2">
          <InputField
            label="Quantity"
            {...control.register(`${sectionField}.quantity`)}
            className="w-16"
          />

          <InputField
            label="Unit"
            {...control.register(`${sectionField}.unit`)}
            className="w-24"
          />

          <InputField
            label="Name"
            {...control.register(`${sectionField}.name`)}
            className="grow"
          />

          <Button variant="ghost" onClick={() => handleRemove(sortingIndex)}>
            <Trash2 />
          </Button>

          <div ref={setActivatorNodeRef} {...listeners}>
            <IconButton icon={<GripVertical />} />
          </div>
        </div>
      )}
    </SortableItem>
  );
};
