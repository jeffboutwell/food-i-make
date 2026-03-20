"use client";

import { useRef, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { EditIngredientSection } from "./edit-recipe-ingredient-section";
import { AddButton } from "@/lib/components/atoms/actions/add-button";
import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { SortableContainer } from "@/lib/components/sortable/sortable-container";
import { SortableItem } from "@/lib/components/sortable/sortable-item";
import { GripVertical } from "lucide-react";
import {
  CollisionDetection,
  DndContext,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
  closestCenter,
  pointerWithin,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type SortableData = {
  kind?: "section" | "ingredient" | "ingredient-section";
  sectionIndex?: number;
  ingredientIndex?: number;
};

type IngredientOverlayData = {
  quantity: string;
  unit: string;
  name: string;
};

type DropIndicatorData = {
  sectionIndex: number;
  ingredientIndex: number;
};

export const EditIngredientSections = () => {
  const { control, getValues } = useFormContext<RecipeFormValues>();
  const [activeDragKind, setActiveDragKind] = useState<
    SortableData["kind"] | null
  >(null);
  const [activeIngredientPreview, setActiveIngredientPreview] =
    useState<IngredientOverlayData | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicatorData | null>(
    null,
  );
  const lastValidOverRef = useRef<{
    id: UniqueIdentifier;
    data?: SortableData;
  } | null>(null);

  const { fields, append, move, remove, replace } = useFieldArray({
    control,
    name: "sections",
  });

  const sectionIdToIndex = new Map(
    fields.map((field, index) => [field.id, index] as const),
  );

  const getSectionIndexFromId = (
    id: UniqueIdentifier | undefined,
  ): number | undefined => {
    if (id === undefined) {
      return undefined;
    }

    const value = String(id);

    if (value.startsWith("ingredient-section-")) {
      const sectionId = value.slice("ingredient-section-".length);
      return sectionIdToIndex.get(sectionId);
    }

    if (value.startsWith("section-")) {
      const sectionId = value.slice("section-".length);
      return sectionIdToIndex.get(sectionId);
    }

    for (const [sectionId, index] of sectionIdToIndex.entries()) {
      if (value.startsWith(`${sectionId}-`)) {
        return index;
      }
    }

    return undefined;
  };

  const createEmptyIngredientItem = (): IngredientFormValues => ({
    name: "",
    quantity: undefined,
    unit: "",
  });

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);

    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    return closestCenter(args);
  };

  const resolveDropIndicator = (
    overId: UniqueIdentifier | undefined,
    overData: SortableData | undefined,
  ): DropIndicatorData | null => {
    if (overData?.kind === "ingredient") {
      if (
        overData.sectionIndex === undefined ||
        overData.ingredientIndex === undefined
      ) {
        return null;
      }

      return {
        sectionIndex: overData.sectionIndex,
        ingredientIndex: overData.ingredientIndex,
      };
    }

    if (
      overData?.kind === "ingredient-section" ||
      overData?.kind === "section"
    ) {
      const sectionIndex = overData.sectionIndex;

      if (sectionIndex === undefined) {
        return null;
      }

      const allSections = getValues("sections");

      return {
        sectionIndex,
        ingredientIndex: allSections[sectionIndex]?.ingredients.length ?? 0,
      };
    }

    const sectionIndex = getSectionIndexFromId(overId);

    if (sectionIndex === undefined) {
      return null;
    }

    const allSections = getValues("sections");

    return {
      sectionIndex,
      ingredientIndex: allSections[sectionIndex]?.ingredients.length ?? 0,
    };
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveDragKind(null);
    setActiveIngredientPreview(null);
    setDropIndicator(null);

    const resolvedOverId =
      over && active.id !== over.id
        ? over.id
        : (lastValidOverRef.current?.id ?? over?.id);

    const resolvedOverData =
      over && active.id !== over.id
        ? (over.data.current as SortableData | undefined)
        : (lastValidOverRef.current?.data ??
          (over?.data.current as SortableData | undefined));

    if (!resolvedOverId) {
      lastValidOverRef.current = null;
      return;
    }

    const activeData = active.data.current as SortableData | undefined;
    const overData = resolvedOverData;

    if (activeData?.kind === "section") {
      if (overData?.kind !== "section") {
        lastValidOverRef.current = null;
        return;
      }

      const activeIndex = activeData.sectionIndex;
      const overIndex = overData.sectionIndex;

      if (
        activeIndex === undefined ||
        overIndex === undefined ||
        activeIndex === overIndex
      ) {
        lastValidOverRef.current = null;
        return;
      }

      move(activeIndex, overIndex);
      lastValidOverRef.current = null;
      return;
    }

    if (activeData?.kind !== "ingredient") {
      lastValidOverRef.current = null;
      return;
    }

    const fromSectionIndex =
      activeData.sectionIndex ?? getSectionIndexFromId(active.id);
    const fromIngredientIndex = activeData.ingredientIndex;

    let toSectionIndex: number | undefined;
    let toIngredientIndex: number | undefined;

    if (overData?.kind === "ingredient") {
      toSectionIndex = overData.sectionIndex;
      toIngredientIndex = overData.ingredientIndex;
    }

    if (overData?.kind === "ingredient-section") {
      const sectionIndex = overData.sectionIndex;

      if (sectionIndex === undefined) {
        lastValidOverRef.current = null;
        return;
      }

      toSectionIndex = sectionIndex;
      const allSections = getValues("sections");
      toIngredientIndex = allSections[sectionIndex]?.ingredients.length ?? 0;
    }

    if (overData?.kind === "section") {
      const sectionIndex = overData.sectionIndex;

      if (sectionIndex === undefined) {
        lastValidOverRef.current = null;
        return;
      }

      toSectionIndex = sectionIndex;
      const allSections = getValues("sections");
      toIngredientIndex = allSections[sectionIndex]?.ingredients.length ?? 0;
    }

    if (toSectionIndex === undefined) {
      const sectionIndex = getSectionIndexFromId(resolvedOverId);

      if (sectionIndex !== undefined) {
        toSectionIndex = sectionIndex;
        const allSections = getValues("sections");
        toIngredientIndex = allSections[sectionIndex]?.ingredients.length ?? 0;
      }
    }

    if (
      fromSectionIndex === undefined ||
      fromIngredientIndex === undefined ||
      toSectionIndex === undefined ||
      toIngredientIndex === undefined
    ) {
      lastValidOverRef.current = null;
      return;
    }

    const sections = getValues("sections").map((section) => ({
      ...section,
      ingredients: [...section.ingredients],
    }));

    const sourceIngredients = sections[fromSectionIndex]?.ingredients;
    const targetIngredients = sections[toSectionIndex]?.ingredients;

    if (!sourceIngredients || !targetIngredients) {
      lastValidOverRef.current = null;
      return;
    }

    const [movedIngredient] = sourceIngredients.splice(fromIngredientIndex, 1);

    if (!movedIngredient) {
      lastValidOverRef.current = null;
      return;
    }

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
    lastValidOverRef.current = null;
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) {
      setDropIndicator(null);
      return;
    }

    const activeData = active.data.current as SortableData | undefined;
    const overData = over.data.current as SortableData | undefined;

    if (activeData?.kind === "ingredient") {
      setDropIndicator(resolveDropIndicator(over.id, overData));
    } else {
      setDropIndicator(null);
    }

    lastValidOverRef.current = {
      id: over.id,
      data: overData,
    };
  };

  const handleDragStartWithActive = ({ active }: DragStartEvent) => {
    const activeData = active.data.current as SortableData | undefined;
    setActiveDragKind(activeData?.kind ?? null);

    if (
      activeData?.kind === "ingredient" &&
      activeData.sectionIndex !== undefined &&
      activeData.ingredientIndex !== undefined
    ) {
      const ingredient = getValues(
        `sections.${activeData.sectionIndex}.ingredients.${activeData.ingredientIndex}`,
      );

      const quantity = ingredient?.quantity;
      const unit = ingredient?.unit?.trim() ?? "";
      const name = ingredient?.name?.trim() ?? "";
      const quantityText =
        quantity !== undefined &&
        quantity !== null &&
        `${quantity}`.trim() !== ""
          ? `${quantity}`
          : "";

      setActiveIngredientPreview({
        quantity: quantityText,
        unit,
        name: name || "Ingredient",
      });
    } else {
      setActiveIngredientPreview(null);
    }

    setDropIndicator(null);
    lastValidOverRef.current = null;
  };

  const handleDragCancel = () => {
    setActiveDragKind(null);
    setActiveIngredientPreview(null);
    setDropIndicator(null);
    lastValidOverRef.current = null;
  };

  return (
    <div className="EditIngredientSections flex flex-col gap-6">
      <DndContext
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStartWithActive}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContainer
          items={fields.map((field) => {
            return { id: `section-${field.id}` };
          })}
          useInternalDnd={false}
        >
          {fields.map((field, index) => (
            <SortableItem
              key={field.id}
              id={`section-${field.id}`}
              disabled={
                activeDragKind === "ingredient" ? { draggable: true } : false
              }
              data={{
                kind: "section",
                sectionIndex: index,
              }}
            >
              <EditIngredientSection
                key={field.id}
                sectionId={field.id}
                sectionIndex={index}
                dropIndicatorIndex={
                  dropIndicator?.sectionIndex === index
                    ? dropIndicator.ingredientIndex
                    : null
                }
                isDropTarget={dropIndicator?.sectionIndex === index}
                onRemove={() => remove(index)}
              />
            </SortableItem>
          ))}
        </SortableContainer>

        <DragOverlay>
          {activeDragKind === "ingredient" && activeIngredientPreview ? (
            <div className="w-[min(36rem,calc(100vw-2rem))] rounded-xl border border-blue-300 bg-white/95 p-2 shadow-2xl ring-2 ring-blue-400 backdrop-blur-sm dark:border-blue-600 dark:bg-slate-900/95">
              <div className="flex items-end gap-2 rounded-lg bg-sky-50/80 p-2 text-sm dark:bg-slate-800/90">
                <div className="mt-2 shrink-0 self-center text-slate-400 dark:text-slate-500">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="w-16 shrink-0">
                  <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Quantity
                  </div>
                  <div className="rounded-md border border-slate-200 bg-white px-2 py-2 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    {activeIngredientPreview.quantity || "-"}
                  </div>
                </div>
                <div className="w-24 shrink-0">
                  <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Unit
                  </div>
                  <div className="rounded-md border border-slate-200 bg-white px-2 py-2 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    {activeIngredientPreview.unit || "-"}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Name
                  </div>
                  <div className="truncate rounded-md border border-slate-200 bg-white px-2 py-2 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    {activeIngredientPreview.name}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
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
