"use client";

import { EditIngredient } from "./edit-recipe-ingredient";
import { H3 } from "@/lib/typography";
import { FieldSet } from "@/components/ui/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { AddButton } from "@/lib/components/atoms/actions/add-button";

import { InputField } from "@/lib/components/atoms/input-field/input-field";

export const EditIngredientSection = ({
  sectionIndex,
}: {
  sectionIndex: number;
}) => {
  const { control } = useFormContext<RecipeFormValues>();
  const { fields, move, remove, append } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  const createEmptyIngredientItem = (): IngredientFormValues => ({
    name: "",
    quantity: undefined,
    unit: "",
  });

  return (
    <FieldSet>
      <InputField
        name={`sections.${sectionIndex}.name`}
        label={"Section Name"}
      />
      <SortableContainer
        items={fields.map((f) => ({ id: f.id }))}
        onDragEnd={(args: { activeIndex: number; overIndex: number }) =>
          move(args.activeIndex, args.overIndex)
        }
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
          append(createEmptyIngredientItem(), {
            shouldFocus: true,
          })
        }
      />
    </FieldSet>
  );
};
