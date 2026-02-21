"use client";

import { IconButton } from "../../../../atoms/icon-button/icon-button";
import { InputField } from "../../../../atoms/input-field/input-field";
import { FieldGroup } from "@/components/ui/field";
import { Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { clsx } from "clsx";
import { IngredientFull } from "@/lib/db/ingredient";

export const EditIngredient = ({
  ingredient,
  sectionField,
  handleRemove,
  sortingIndex,
  sortingDisabled = false,
}: {
  ingredient: IngredientFull;
  sectionField: string;
  handleRemove: (index: number) => void;
  sortingIndex: number;
  sortingDisabled?: boolean;
}) => {
  const { control } = useFormContext();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: ingredient.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={clsx(
        "flex flex-row gap-2 items-end p-2 w-full",
        !sortingDisabled && "hover:bg-zinc-100",
      )}
    >
      <InputField
        label="Quantity"
        placeholder="Quantity"
        {...control.register(`${sectionField}.quantity`)}
        className="grow-0 w-16"
      />
      <InputField
        label="Unit"
        placeholder="Unit"
        {...control.register(`${sectionField}.unit`)}
        className="grow w-24"
      />
      <InputField
        label="Name"
        placeholder="Name"
        {...control.register(`${sectionField}.name`)}
        className="grow"
      />
      <div className="flex flex-row gap grow items-center">
        <div>
          <Button
            className="p-0 text-gray-400 cursor-pointer"
            variant={"ghost"}
            onClick={() => handleRemove(sortingIndex)}
          >
            <Trash2 />
          </Button>
        </div>
        {!sortingDisabled && (
          <div ref={setActivatorNodeRef} {...listeners}>
            <IconButton icon={<GripVertical />} />
          </div>
        )}
      </div>
    </div>
  );
};
