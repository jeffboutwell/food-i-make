import Fraction from "fraction.js";
import NextLink from "next/link";
import { H2, H3 } from "@/components/ui/typography";
import { IngredientSectionDisplay } from "./recipe-ingredients.types";

const formatQuantity = (quantity: number) => {
  const fraction = new Fraction(quantity);
  return fraction.toFraction(true);
};

const renderNameParts = (
  parts: IngredientSectionDisplay["ingredients"][number]["nameParts"],
) => {
  return parts.map((part, index) => {
    if (part.type === "text") {
      return <span key={`text-${index}`}>{part.value}</span>;
    }

    return (
      <NextLink
        key={`link-${index}-${part.recipe.slug}`}
        href={`/recipe/${part.recipe.slug}`}
        className="underline hover:no-underline"
      >
        {part.value}
      </NextLink>
    );
  });
};

export const RecipeIngredientsStatic = ({
  sections,
  servings,
}: {
  sections: IngredientSectionDisplay[];
  servings?: string | null;
}) => {
  return (
    <div className="Recipe__ingredients">
      <div className="mb-4 flex flex-col gap-3">
        <H2>Ingredients</H2>
        {servings && (
          <p className="text-sm text-muted-foreground">Makes {servings}</p>
        )}
      </div>
      <div className="Ingredients">
        {sections.map((section) => (
          <div key={section.name} className="IngredientSection mb-6">
            <H3>{section.name}</H3>
            <ul className="IngredientSection__list flex flex-col divide-y">
              {section.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex flex-row gap-1 py-4">
                  {ingredient.quantity !== null && (
                    <span className="shrink-0">
                      {formatQuantity(ingredient.quantity)}
                    </span>
                  )}
                  {ingredient.unit !== null && <span>{ingredient.unit}</span>}
                  <span className="lowercase">
                    {renderNameParts(ingredient.nameParts)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
