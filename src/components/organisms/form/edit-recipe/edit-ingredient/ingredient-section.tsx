"use client";

import { EditIngredient } from "./ingredient";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DragEndEvent } from "@dnd-kit/core";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { IngredientFormValues, RecipeFormValues } from "@/types";
import { AddButton } from "@/components/atoms/actions/add-button";
import { RemoveButton } from "@/components/atoms/actions/remove-button";
import { GripVertical } from "lucide-react";

import { InputField } from "@/components/atoms/input-field/input-field";

export const EditIngredientSection = ({
  onRemove,
  sectionIndex,
}: {
  onRemove: () => void;
  sectionIndex: number;
}) => {
  const { control } = useFormContext<RecipeFormValues>();
  const ingredientPath = `sections.${sectionIndex}.ingredients` as const;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: ingredientPath,
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
    <div className="rounded-xl border border-transparent p-3 transition-colors duration-150">
      <FieldSet>
        <div className="flex items-end gap-2">
          <SortableItemHandle className="mb-2 text-slate-400 hover:text-slate-600">
            <GripVertical className="h-4 w-4" />
          </SortableItemHandle>

          <InputField
            name={`sections.${sectionIndex}.name`}
            label={"Section Name"}
            className="grow"
          />
          <RemoveButton onRemove={onRemove} />
        </div>

        <Sortable
          value={fields}
          onValueChange={() => {}}
          onDragEnd={handleDragEnd}
          getItemValue={(field) => field.id}
          strategy="vertical"
          className="space-y-2"
        >
          {fields.map((field, index) => (
            <SortableItem key={field.id} value={field.id}>
              <EditIngredient
                index={index}
                sectionIndex={sectionIndex}
                onRemove={() => remove(index)}
              />
            </SortableItem>
          ))}
        </Sortable>

        <AddButton onAppend={() => append(createEmptyIngredientItem())} />
      </FieldSet>
    </div>
  );
};
