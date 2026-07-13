"use client";

import React from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable, UseSortableArguments } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { DragButton } from "../atoms/actions/drag-button";

type Props = {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  disabled?: UseSortableArguments["disabled"];
  showInsertionIndicator?: boolean;
  children: React.ReactNode;
};

export const SortableItem = ({
  id,
  data,
  disabled,
  showInsertionIndicator = false,
  children,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-2">
      {showInsertionIndicator ? (
        <div className="h-1 rounded-full bg-sky-500/80 shadow-[0_0_0_3px_rgba(14,165,233,0.14)] dark:bg-sky-400/80 dark:shadow-[0_0_0_3px_rgba(56,189,248,0.18)]" />
      ) : null}
      <div
        className={clsx(
          "rounded-md bg-white dark:bg-slate-900",
          isDragging && "opacity-30 shadow-lg ring-2 ring-blue-500",
        )}
      >
        <div className="flex items-start gap-2">
          <DragButton attributes={attributes} listeners={listeners} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};
