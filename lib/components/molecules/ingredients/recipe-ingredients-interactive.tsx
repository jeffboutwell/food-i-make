"use client";

import { useMemo, useState } from "react";
import Fraction from "fraction.js";
import { InlineLink } from "@/lib/components/molecules/inline-link/inline-link";
import { H2, H3 } from "@/lib/typography";
import { ParsedShortcodePart } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/lib/components/ui/toggle-group";

type IngredientDisplay = {
  name: string;
  quantity: number | null;
  unit: string | null;
  nameParts: ParsedShortcodePart[];
};

type IngredientSectionDisplay = {
  name: string;
  ingredients: IngredientDisplay[];
};

const SCALE_OPTIONS = [0.5, 1, 2] as const;

const formatQuantity = (quantity: number) => {
  const fraction = new Fraction(quantity);
  return fraction.toFraction(true);
};

const renderNameParts = (parts: ParsedShortcodePart[]) => {
  return parts.map((part, index) => {
    if (part.type === "text") {
      return <span key={`text-${index}`}>{part.value}</span>;
    }

    return (
      <InlineLink
        key={`link-${index}-${part.recipe.slug}`}
        recipe={part.recipe}
        label={part.value}
      />
    );
  });
};

export const RecipeIngredientsInteractive = ({
  sections,
  servings,
}: {
  sections: IngredientSectionDisplay[];
  servings?: string | null;
}) => {
  const [scale, setScale] = useState<(typeof SCALE_OPTIONS)[number]>(1);

  const scaledServings = useMemo(() => {
    if (!servings) {
      return null;
    }

    const parsed = Number(servings);
    if (!Number.isFinite(parsed)) {
      return servings;
    }

    const value = parsed * scale;
    return `${formatQuantity(value)} servings`;
  }, [servings, scale]);

  return (
    <div className="Recipe__ingredients">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <H2>Ingredients</H2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Scale</span>
          <ToggleGroup
            variant={"outline"}
            value={scale.toString()}
            type="single"
          >
            {SCALE_OPTIONS.map((option) => {
              return (
                <ToggleGroupItem
                  key={option}
                  value={option.toString()}
                  className="cursor-pointer"
                  onClick={() => setScale(option)}
                >
                  {option}x
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      </div>

      {servings && (
        <p className="mb-4 text-sm text-muted-foreground">
          Makes {scaledServings}
        </p>
      )}

      <div className="Ingredients">
        {sections.map((section) => (
          <div key={section.name} className="IngredientSection mb-6">
            <H3>{section.name}</H3>
            <ul className="IngredientSection__list flex flex-col divide-y">
              {section.ingredients.map((ingredient) => {
                const baseQuantity = ingredient.quantity;
                const scaledQuantity =
                  baseQuantity !== null ? baseQuantity * scale : null;

                return (
                  <li
                    key={ingredient.name}
                    className="flex flex-row gap-1 py-4"
                  >
                    {scaledQuantity !== null && (
                      <span>{formatQuantity(scaledQuantity)}</span>
                    )}
                    {ingredient.unit !== null && <span>{ingredient.unit}</span>}
                    <span className="lowercase">
                      {renderNameParts(ingredient.nameParts)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
