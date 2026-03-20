"use client";

import { InputField } from "../../../../atoms/input-field/input-field";
import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { RemoveButton } from "@/lib/components/atoms/actions/remove-button";

export const EditIngredient = ({
  sectionIndex,
  onRemove,
  index,
}: {
  sectionIndex: number;
  index: number;
  onRemove: () => void;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const fieldError =
    errors.sections?.[sectionIndex]?.ingredients?.[index]?.message;

  return (
    <div className="EditIngredient hover:bg-slate-50">
      <div className="flex flex-row gap-2 items-end p-2">
        <InputField
          label="Quantity"
          {...register(
            `sections.${sectionIndex}.ingredients.${index}.quantity`,
          )}
          className="w-16"
        />

        <InputField
          label="Unit"
          {...register(`sections.${sectionIndex}.ingredients.${index}.unit`)}
          className="w-24"
        />

        <InputField
          label="Name"
          {...register(`sections.${sectionIndex}.ingredients.${index}.name`)}
          className="grow"
        />
        <RemoveButton onRemove={onRemove} />
      </div>
      {fieldError && <p className="mt-1 text-xs text-red-500">{fieldError}</p>}
    </div>
  );
};
