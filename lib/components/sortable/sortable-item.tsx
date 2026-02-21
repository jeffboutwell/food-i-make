"use client";

import type { DraggableSyntheticListeners } from "@dnd-kit/core";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

type SortableItemProps = {
  id: string | number;
  children: (props: {
    setActivatorNodeRef: (element: HTMLElement | null) => void;
    listeners: DraggableSyntheticListeners;
  }) => ReactNode;
};

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 50 : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children({ setActivatorNodeRef, listeners })}
    </div>
  );
}
