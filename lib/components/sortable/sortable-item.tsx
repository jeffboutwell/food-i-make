"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import clsx from "clsx";

type Props = {
  id: string;
  activeId?: UniqueIdentifier;
  children: React.ReactNode;
};

export const SortableItem = ({ id, activeId, children }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const isDragging = activeId === id;

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
        "rounded-md bg-white dark:bg-slate-900",
        isDragging && "shadow-lg ring-2 ring-blue-500",
      )}
    >
      <div {...listeners} className="cursor-grab">
        {children}
      </div>
    </div>
  );
};
