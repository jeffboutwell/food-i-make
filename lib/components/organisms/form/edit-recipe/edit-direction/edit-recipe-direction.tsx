// EditDirectionItem.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import type { RecipeFormValues } from "@/lib/db";
import { TextArea } from "@/lib/components/atoms/text-area/text-area";

type Props = {
  index: number;
  onRemove: () => void;
};

export const EditDirectionItem = ({ index, onRemove }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const fieldError = errors.directions?.[index]?.value;

  return (
    <div className="flex items-start gap-2">
      <span className="mt-2 text-sm font-medium">{index + 1}.</span>

      <div className="flex-1">
        <TextArea
          {...register(`directions.${index}.value`)}
          rows={2}
          className="w-full rounded border p-2 text-sm"
          placeholder="Describe this step..."
        />
        {fieldError && (
          <p className="mt-1 text-xs text-red-500">{fieldError.message}</p>
        )}
      </div>

      <button type="button" onClick={onRemove} className="text-sm text-red-500">
        Remove
      </button>
    </div>
  );
};
