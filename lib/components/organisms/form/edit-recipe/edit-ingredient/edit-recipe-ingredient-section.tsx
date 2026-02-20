"use client";

import React from "react";
import { EditIngredient } from "./edit-recipe-ingredient";
import { IngredientFull } from "@/lib/db/ingredient";
import { IngredientSectionFull } from "@/lib/db/ingredient-section";
import { RecipeFull } from "@/lib/db/recipe";
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
  section: IngredientSectionFull;
  sectionIndex: number;
  id: number;
  isDisabled?: boolean;
}) => {
  const { control } = useFormContext<RecipeFull>();
  const {
    fields: ingredientFields,
    move: moveIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
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
          name={`sections.${sectionIndex}.name`}
          label={"Section Name"}
        />
        <SortableContext
          id={id.toString()}
          items={ingredientFields}
          disabled={isDisabled}
        >
          {ingredientFields.map((ingredient: IngredientFull, index) => {
            return (
              <EditIngredient
                key={ingredient.id}
                sectionField={`sections.${sectionIndex}.ingredients.${index}`}
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
