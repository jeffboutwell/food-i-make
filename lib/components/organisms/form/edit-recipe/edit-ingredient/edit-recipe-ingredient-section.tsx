"use client";

import { EditIngredient } from "./edit-recipe-ingredient";
import { H3 } from "@/lib/typography";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { IngredientFormValues, RecipeFormValues } from "@/lib/db";
import { AddButton } from "@/lib/components/atoms/actions/add-button";

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
  const { fields, move, remove, append } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  const createEmptyIngredientItem = (order: number): IngredientFormValues => ({
    name: "",
    quantity: null,
    unit: "",
    note: "",
    order,
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
      <AddButton
        onAppend={() =>
          append(createEmptyIngredientItem(fields.length), {
            shouldFocus: true,
          })
        }
      />
    </FieldSet>
  );
};
