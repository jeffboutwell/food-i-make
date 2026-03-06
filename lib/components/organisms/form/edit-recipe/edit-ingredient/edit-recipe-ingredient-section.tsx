"use client";

import { EditIngredient } from "./edit-recipe-ingredient";
import { H3 } from "@/lib/typography";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { RecipeFormValues } from "@/lib/forms/recipe/recipe-form.schemas";
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
        ids={fields.map((f) => f.id)}
        onReorder={(from: number, to: number) => move(from, to)}
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
