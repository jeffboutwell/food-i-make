"use client";

import React, { useState } from "react";
import clsx from "clsx";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

type Props<T extends { id: string }> = {
  items: T[];
  onDragEnd: (args: { activeIndex: number; overIndex: number }) => void;
  children: React.ReactNode;
};

const EmptyDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "empty-drop-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "h-20 flex items-center justify-center border-2 border-dashed rounded-md",
        isOver ? "bg-blue-100 border-blue-500" : "border-slate-300",
      )}
    >
      Drop items here
    </div>
  );
};

export function SortableContainer<T extends { id: string }>({
  items,
  onDragEnd,
  children,
}: Props<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    setOverId(event.over?.id ?? null);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex((i) => i.id === active.id);
      const overIndex = items.findIndex((i) => i.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        onDragEnd({ activeIndex, overIndex });
      }
    }

    // 🔥 Always clear drag state
    setActiveId(null);
    setOverId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToVerticalAxis]}
    >
      <div
        className={clsx(
          "transition-colors duration-200 rounded-md",
          activeId !== null &&
            "bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400",
        )}
      >
        {items.length === 0 ? (
          <EmptyDropZone />
        ) : (
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {children}
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
}
