"use client";

import React from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props<T extends { id: string }> = {
  items: T[];
  onDragEnd: (args: { activeIndex: number; overIndex: number }) => void;
  children: React.ReactNode;
};

export function SortableContainer<T extends { id: string }>({
  items,
  onDragEnd,
  children,
}: Props<T>) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeIndex = items.findIndex((i) => i.id === active.id);
    const overIndex = items.findIndex((i) => i.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      onDragEnd({ activeIndex, overIndex });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
