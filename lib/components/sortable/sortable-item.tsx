"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { GripVertical } from "lucide-react";
import { DragButton } from "../atoms/actions/drag-button";

type Props = {
  id: string;
  children: React.ReactNode;
};

export const SortableItem = ({ id, children }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "rounded-md bg-white dark:bg-slate-900",
        isDragging && "shadow-lg ring-2 ring-blue-500",
      )}
    >
      <div className="flex items-start gap-2">
        <DragButton attributes={attributes} listeners={listeners} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
};
