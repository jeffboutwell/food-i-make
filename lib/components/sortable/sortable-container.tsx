"use client";

import React, { useState } from "react";
import clsx from "clsx";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  useDroppable,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

type Props = {
  items?: { id: string }[];
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

export const SortableContainer = ({ items, onDragEnd, children }: Props) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const ids = items?.map((item) => item.id) ?? [];

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeIndex = ids.indexOf(active.id as string);
    const overIndex = ids.indexOf(over.id as string);

    if (activeIndex !== overIndex) {
      onDragEnd({ activeIndex, overIndex });
    }

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
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      modifiers={[restrictToVerticalAxis]}
    >
      <div
        className={clsx(
          "transition-colors duration-200 rounded-md",
          activeId !== null &&
            "bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400",
        )}
      >
        {ids.length === 0 ? (
          <EmptyDropZone />
        ) : (
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {children}
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
};
