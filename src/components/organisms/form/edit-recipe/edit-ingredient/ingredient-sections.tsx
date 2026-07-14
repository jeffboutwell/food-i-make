"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  pointerWithin,
  closestCenter,
  CollisionDetection,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { EditIngredientSection } from "./ingredient-section";
import { AddButton } from "@/components/atoms/actions/add-button";
import { SortableItem } from "@/components/ui/sortable";
import { IngredientFormValues, RecipeFormValues } from "@/types";

type SortableData = {
  kind?: "section" | "ingredient";
  sectionIndex?: number;
  ingredientIndex?: number;
};

export const EditIngredientSections = () => {
  const { control, getValues } = useFormContext<RecipeFormValues>();
  const [activeDragKind, setActiveDragKind] = useState<
    SortableData["kind"] | null
  >(null);

  const { fields, append, move, remove, replace } = useFieldArray({
    control,
    name: "sections",
  });

  const createEmptyIngredientItem = (): IngredientFormValues => ({
    name: "",
    quantity: undefined,
    unit: "",
  });

  const sectionItems = fields.map((field, index) => ({
    id: `section-${field.id}`,
    index,
  }));

  const getSectionIndexFromId = (
    id: UniqueIdentifier | undefined,
  ): number | undefined => {
    if (id === undefined) return undefined;

    const value = String(id);

    if (value.startsWith("section-")) {
      const sectionId = value.slice("section-".length);

      return fields.findIndex((field) => field.id === sectionId);
    }

    for (
      let sectionIndex = 0;
      sectionIndex < fields.length;
      sectionIndex += 1
    ) {
      const sectionId = fields[sectionIndex]?.id;

      if (sectionId && value.startsWith(`${sectionId}-ingredient-`)) {
        return sectionIndex;
      }
    }

    return undefined;
  };

  const handleSectionSort = (value: Array<{ id: string; index: number }>) => {
    const currentSections = getValues("sections");

    if (!currentSections?.length) return;

    const ordered = value.map((item) => currentSections[item.index]);
    replace(ordered);
  };

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    return closestCenter(args);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeData = active.data.current as SortableData | undefined;
    setActiveDragKind(activeData?.kind ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveDragKind(null);

    if (!over || active.id === over.id) return;

    const activeData = active.data.current as SortableData | undefined;
    const overData = over.data.current as SortableData | undefined;

    if (activeData?.kind === "section" && overData?.kind === "section") {
      const activeIndex = activeData.sectionIndex;
      const overIndex = overData.sectionIndex;

      if (
        activeIndex === undefined ||
        overIndex === undefined ||
        activeIndex === overIndex
      ) {
        return;
      }

      move(activeIndex, overIndex);
      return;
    }

    if (activeData?.kind !== "ingredient") return;

    const fromSectionIndex =
      activeData.sectionIndex ?? getSectionIndexFromId(active.id);
    const fromIngredientIndex = activeData.ingredientIndex;

    let toSectionIndex: number | undefined;
    let toIngredientIndex: number | undefined;

    if (overData?.kind === "ingredient") {
      toSectionIndex = overData.sectionIndex;
      toIngredientIndex = overData.ingredientIndex;
    } else if (overData?.kind === "section") {
      toSectionIndex = overData.sectionIndex;

      if (toSectionIndex !== undefined) {
        const sections = getValues("sections");
        toIngredientIndex = sections[toSectionIndex]?.ingredients.length ?? 0;
      }
    } else {
      toSectionIndex = getSectionIndexFromId(over.id);

      if (toSectionIndex !== undefined) {
        const sections = getValues("sections");
        toIngredientIndex = sections[toSectionIndex]?.ingredients.length ?? 0;
      }
    }

    if (
      fromSectionIndex === undefined ||
      fromIngredientIndex === undefined ||
      toSectionIndex === undefined ||
      toIngredientIndex === undefined
    ) {
      return;
    }

    const sections = getValues("sections").map((section) => ({
      ...section,
      ingredients: [...section.ingredients],
    }));

    const sourceIngredients = sections[fromSectionIndex]?.ingredients;
    const targetIngredients = sections[toSectionIndex]?.ingredients;

    if (!sourceIngredients || !targetIngredients) return;

    const [movedIngredient] = sourceIngredients.splice(fromIngredientIndex, 1);

    if (!movedIngredient) return;

    const normalizedTargetIndex =
      fromSectionIndex === toSectionIndex &&
      fromIngredientIndex < toIngredientIndex
        ? toIngredientIndex - 1
        : toIngredientIndex;

    targetIngredients.splice(
      Math.max(0, Math.min(normalizedTargetIndex, targetIngredients.length)),
      0,
      movedIngredient,
    );

    replace(sections);
  };

  const handleDragCancel = () => {
    setActiveDragKind(null);
  };

  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      <DndContext
        collisionDetection={collisionDetectionStrategy}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={sectionItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => (
            <SortableItem
              key={field.id}
              value={`section-${field.id}`}
              sortableData={{ kind: "section", sectionIndex: index }}
              disabled={activeDragKind === "ingredient"}
            >
              <EditIngredientSection
                sectionId={field.id}
                sectionIndex={index}
                onRemove={() => remove(index)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <AddButton
        onAppend={() =>
          append({
            name: "",
            ingredients: [createEmptyIngredientItem()],
          })
        }
      />
    </div>
  );
};
