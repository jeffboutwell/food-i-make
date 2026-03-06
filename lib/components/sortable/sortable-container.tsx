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

type Props = {
  ids: string[];
  onReorder: (from: number, to: number) => void;
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

export const SortableContainer = ({ ids, onReorder, children }: Props) => {
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

    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);

    if (oldIndex !== newIndex) {
      onReorder(oldIndex, newIndex);
    }

    setActiveId(null);
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
        {ids.length === 0 ? (
          <EmptyDropZone />
        ) : (
          <SortableContext
            items={ids.map((id) => id)}
            strategy={verticalListSortingStrategy}
          >
            {children}
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
};
