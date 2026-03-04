"use client";

import { EditIngredient } from "./edit-recipe-ingredient";
import { H3 } from "@/lib/typography";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { RecipeFormValues } from "@/lib/db";

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
  const { control } = useFormContext<RecipeFormValues>();
  const { fields, move, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  return (
    <FieldSet>
      <InputField
        name={`sections.${sectionIndex}.name`}
        label={"Section Name"}
      />
      <SortableContainer
        items={fields}
        onDragEnd={({ activeIndex, overIndex }) => {
          move(activeIndex, overIndex);
        }}
      >
        {fields.map((field, index) => (
          <SortableItem key={field.id} id={field.id}>
            <EditIngredient
              index={index}
              sectionIndex={sectionIndex}
              onRemove={() => remove(index)}
            />
          </SortableItem>
        ))}
      </SortableContainer>
    </FieldSet>
  );
};
