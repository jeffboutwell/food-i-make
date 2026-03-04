"use client";

import React from "react";
import { EditIngredient } from "./edit-recipe-ingredient";
import { H3 } from "@/lib/typography";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { RecipeFormSchema } from "@/lib/db";
import {
  IngredientUpdateSchema,
  IngredientSectionUpdateSchema,
  RecipeUpdateSchema,
} from "@/lib/db";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { InputField } from "@/lib/components/atoms/input-field/input-field";

export const EditingredientSection = ({
  sectionIndex,
  id,
  isDisabled = false,
}: {
  sectionIndex: number;
  id: number;
  isDisabled?: boolean;
}) => {
  const { control } = useFormContext<RecipeFormSchema>();
  const {
    fields,
    move: moveIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // console.log("handleDragEnd", { active, over });

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex(({ id }) => id === active.id);
      const newIndex = fields.findIndex(({ id }) => id === over?.id);
      // console.log("handleDragEnd", { oldIndex, newIndex });

      moveIngredients(oldIndex, newIndex);
    }
  };

  const handleRemove = (index: number) => {
    removeIngredients(index);
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <FieldSet>
        <InputField
          name={`sections.${sectionIndex}.name`}
          label={"Section Name"}
        />
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => {
            return (
              <EditIngredient
                key={field.id}
                sectionField={`sections.${sectionIndex}.ingredients.${index}`}
                sortingIndex={index}
                handleRemove={handleRemove}
              />
            );
          })}
        </SortableContext>
      </FieldSet>
    </DndContext>
  );
};
