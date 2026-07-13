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
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type Props = {
  items?: { id: string }[];
  onDragEnd?: (args: { activeIndex: number; overIndex: number }) => void;
  useInternalDnd?: boolean;
  containerId?: UniqueIdentifier;
  containerData?: Record<string, unknown>;
  children: React.ReactNode;
};

export const SortableContainer = ({
  items,
  onDragEnd,
  useInternalDnd = true,
  containerId,
  containerData,
  children,
}: Props) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const ids = items?.map((item) => item.id) ?? [];
  const autoContainerId = React.useId();

  const { setNodeRef, isOver } = useDroppable({
    id: containerId ?? `sortable-container-${autoContainerId}`,
    data: containerData,
  });

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    if (!onDragEnd) {
      setActiveId(null);
      return;
    }

    const activeIndex = ids.indexOf(active.id as string);
    const overIndex = ids.indexOf(over.id as string);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      onDragEnd({ activeIndex, overIndex });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const content = (
    <div
      ref={setNodeRef}
      className={clsx(
        "transition-colors duration-200 rounded-md",
        (activeId !== null || isOver) &&
          "bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400",
      )}
    >
      {ids.length === 0 ? (
        <div
          className={clsx(
            "h-20 flex items-center justify-center border-2 border-dashed rounded-md",
            isOver ? "bg-blue-100 border-blue-500" : "border-slate-300",
          )}
        >
          Drop items here
        </div>
      ) : (
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      )}
    </div>
  );

  if (!useInternalDnd) {
    return content;
  }

  if (!onDragEnd) {
    return content;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToVerticalAxis]}
    >
      {content}
    </DndContext>
  );
};
