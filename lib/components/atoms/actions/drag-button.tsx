import React from "react";
import {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

type DragButtonProps = {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
};

export const DragButton = ({ attributes, listeners }: DragButtonProps) => {
  return (
    <button
      type="button"
      {...attributes}
      {...listeners}
      aria-label="Reorder item"
      className="mt-2 shrink-0 self-center cursor-grab touch-none text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
};
