"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
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

const DropItem = ({ id }: { id: UniqueIdentifier }) => {
  return <div className="w-full h-12 bg-slate-500"></div>;
};

export function SortableContainer<T extends { id: string }>({
  items,
  onDragEnd,
  children,
}: Props<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
  }
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
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
      {/*       <DragOverlay>{activeId ? <DropItem id={activeId} /> : null}</DragOverlay>*/}
    </DndContext>
  );
}
