"use client";

import React from "react";
import { EditIngredient } from "./edit-recipe-ingredient";
import { IngredientProps, IngredientSectionProps } from "../../../../../schema";
import { H3 } from "@/lib/typography";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Recipe as RecipeProps } from "../../../../../../app/generated/prisma/client";
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
  section,
  sectionIndex,
  id,
  isDisabled = false,
}: {
  section: IngredientSectionProps;
  sectionIndex: number;
  id: string;
  isDisabled?: boolean;
}) => {
  const { control } = useFormContext<RecipeProps>();
  const {
    fields: ingredientFields,
    move: moveIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: `ingredients.${sectionIndex}.ingList`,
    keyName: "id",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log("handleDragEnd", { active, over });

    if (active.id !== over?.id) {
      const oldIndex = ingredientFields.findIndex(({ id }) => id === active.id);
      const newIndex = ingredientFields.findIndex(({ id }) => id === over?.id);
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
          name={`ingredients.${sectionIndex}.name`}
          label={"Section Name"}
        />
        <SortableContext id={id} items={ingredientFields} disabled={isDisabled}>
          {ingredientFields.map((ingredient: IngredientProps, index) => {
            return (
              <EditIngredient
                key={ingredient.id}
                sectionField={`ingredients.${sectionIndex}.ingList.${index}`}
                id={ingredient.id}
                ingIndex={index}
                handleRemove={handleRemove}
                sortingDisabled={isDisabled}
              />
            );
          })}
        </SortableContext>
      </FieldSet>
    </DndContext>
  );
};
