"use client";

import { useMemo, useState } from "react";
import Fraction from "fraction.js";
import { InlineLink } from "@/components/molecules/inline-link/inline-link";
import { H2, H3 } from "@/components/ui/typography";
import { ParsedShortcodePart } from "@/features/recipes/shortcodes-parse";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

const SERVING_QUANTITY_PATTERN =
  /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(.*)$/;

const parseServingQuantity = (value: string): number | null => {
  const trimmed = value.trim();

  if (/^\d+\s+\d+\/\d+$/.test(trimmed)) {
    const [whole, fraction] = trimmed.split(/\s+/);
    return Number(whole) + new Fraction(fraction).valueOf();
  }

  if (/^\d+\/\d+$/.test(trimmed)) {
    return new Fraction(trimmed).valueOf();
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
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

    const match = servings.trim().match(SERVING_QUANTITY_PATTERN);
    if (!match) {
      return servings;
    }

    const quantity = parseServingQuantity(match[1]);
    if (quantity === null) {
      return servings;
    }

    const suffix = match[2]?.trim();
    const value = quantity * scale;

    if (suffix) {
      return `${formatQuantity(value)} ${suffix}`;
    }

    return `${formatQuantity(value)} servings`;
  }, [servings, scale]);

  return (
    <div className="Recipe__ingredients">
      <div className="mb-4 flex flex-col gap-3">
        <H2>Ingredients</H2>
        <div className="flex flex-col items-start gap-4">
          {servings && (
            <p className="text-sm text-muted-foreground">
              Makes {scaledServings}
            </p>
          )}
          <div className="flex flex-row gap-2 items-center">
            <span className="text-sm text-muted-foreground">Scale</span>
            <ToggleGroup
              variant={"outline"}
              value={scale.toString()}
              type="single"
              onValueChange={(value) => {
                if (!value) {
                  return;
                }

                const nextScale = Number(value);
                if (
                  SCALE_OPTIONS.includes(
                    nextScale as (typeof SCALE_OPTIONS)[number],
                  )
                ) {
                  setScale(nextScale as (typeof SCALE_OPTIONS)[number]);
                }
              }}
            >
              {SCALE_OPTIONS.map((option) => {
                return (
                  <ToggleGroupItem
                    key={option}
                    value={option.toString()}
                    className="cursor-pointer"
                  >
                    {option}x
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </div>
      </div>
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
                      <span className="shrink-0">
                        {formatQuantity(scaledQuantity)}
                      </span>
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
