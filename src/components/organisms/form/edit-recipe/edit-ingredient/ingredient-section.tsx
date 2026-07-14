"use client";

import { EditIngredient } from "./ingredient";
import { FieldSet } from "@/components/ui/field";
import { useFormContext, useWatch } from "react-hook-form";
import { SortableItem, SortableItemHandle } from "@/components/ui/sortable";
import { IngredientFormValues, RecipeFormValues } from "@/types";
import { AddButton } from "@/components/atoms/actions/add-button";
import { RemoveButton } from "@/components/atoms/actions/remove-button";
import { GripVertical } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { InputField } from "@/components/atoms/input-field/input-field";

export const EditIngredientSection = ({
  onRemove,
  sectionIndex,
  sectionId,
}: {
  onRemove: () => void;
  sectionIndex: number;
  sectionId: string;
}) => {
  const { control, getValues, setValue } = useFormContext<RecipeFormValues>();
  const ingredientPath = `sections.${sectionIndex}.ingredients` as const;
  const ingredients = useWatch({
    control,
    name: ingredientPath,
  });

  const createEmptyIngredientItem = (): IngredientFormValues => ({
    name: "",
    quantity: undefined,
    unit: "",
  });

  const removeIngredient = (index: number) => {
    const currentIngredients = getValues(ingredientPath) ?? [];

    setValue(
      ingredientPath,
      currentIngredients.filter((_, itemIndex) => itemIndex !== index),
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );
  };

  const appendIngredient = () => {
    const currentIngredients = getValues(ingredientPath) ?? [];

    setValue(
      ingredientPath,
      [...currentIngredients, createEmptyIngredientItem()],
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );
  };

  const ingredientItems = (ingredients ?? []).map((_, index) => ({
    id: `${sectionId}-ingredient-${index}`,
  }));

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

        <SortableContext
          items={ingredientItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {(ingredients ?? []).map((_, index) => (
            <SortableItem
              key={`${sectionId}-ingredient-${index}`}
              value={`${sectionId}-ingredient-${index}`}
              sortableData={{
                kind: "ingredient",
                sectionIndex,
                ingredientIndex: index,
              }}
            >
              <EditIngredient
                index={index}
                sectionIndex={sectionIndex}
                onRemove={() => removeIngredient(index)}
              />
            </SortableItem>
          ))}
        </SortableContext>

        <AddButton onAppend={appendIngredient} />
      </FieldSet>
    </div>
  );
};
