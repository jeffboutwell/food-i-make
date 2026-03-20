"use client";

import { EditIngredient } from "./edit-recipe-ingredient";
import { FieldSet } from "@/components/ui/field";
import { useFormContext, useWatch } from "react-hook-form";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { AddButton } from "@/lib/components/atoms/actions/add-button";
import { RemoveButton } from "@/lib/components/atoms/actions/remove-button";
import clsx from "clsx";

import { InputField } from "@/lib/components/atoms/input-field/input-field";

export const EditIngredientSection = ({
  onRemove,
  sectionIndex,
  sectionId,
  isDropTarget,
  dropIndicatorIndex,
}: {
  onRemove: () => void;
  sectionIndex: number;
  sectionId: string;
  isDropTarget: boolean;
  dropIndicatorIndex: number | null;
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

  const ingredientCount = ingredients?.length ?? 0;
  const showEndInsertionIndicator =
    isDropTarget && dropIndicatorIndex === ingredientCount;

  return (
    <div
      className={clsx(
        "rounded-xl border border-transparent p-3 transition-colors duration-150",
        isDropTarget &&
          "border-sky-300 bg-sky-50/70 shadow-sm dark:border-sky-700 dark:bg-sky-950/20",
      )}
    >
      <FieldSet>
        <div className="flex items-end gap-2">
          <InputField
            name={`sections.${sectionIndex}.name`}
            label={"Section Name"}
            className="grow"
          />
          <RemoveButton onRemove={onRemove} />
        </div>
        <SortableContainer
          items={(ingredients ?? []).map((_, index) => ({
            id: `${sectionId}-ingredient-${index}`,
          }))}
          useInternalDnd={false}
          containerId={`ingredient-section-${sectionId}`}
          containerData={{
            kind: "ingredient-section",
            sectionIndex,
          }}
        >
          {(ingredients ?? []).map((_, index) => (
            <SortableItem
              key={`${sectionId}-ingredient-${index}`}
              id={`${sectionId}-ingredient-${index}`}
              showInsertionIndicator={dropIndicatorIndex === index}
              data={{
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
        </SortableContainer>

        {showEndInsertionIndicator ? (
          <div className="h-1 rounded-full bg-sky-500/80 shadow-[0_0_0_3px_rgba(14,165,233,0.14)] dark:bg-sky-400/80 dark:shadow-[0_0_0_3px_rgba(56,189,248,0.18)]" />
        ) : null}

        <AddButton onAppend={appendIngredient} />
      </FieldSet>
    </div>
  );
};
