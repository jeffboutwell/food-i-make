import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { getUnitAbbreviation } from "@/lib/units";
import { identifyUnit } from "parse-ingredient";
import { parseShortcodeLinks } from "@/lib/utils";
import Fraction from "fraction.js";
import { InlineLink } from "../inline-link/inline-link";

export const Ingredient = async ({
  ingredient,
}: {
  ingredient: IngredientFormValues;
}) => {
  const getQuantity = () => {
    if (ingredient.quantity === undefined || ingredient.quantity === null) {
      return null;
    }
    const fr = new Fraction(ingredient.quantity);
    return fr?.toFraction(true) ?? null;
  };

  const identifiedUnit = identifyUnit(ingredient.unit || "");
  const unitAbbreviation = getUnitAbbreviation(identifiedUnit);

  const quantity = getQuantity();
  const unit = unitAbbreviation || ingredient.unit || null;

  const getInlineLink = async (text: string) => {
    const parts = await parseShortcodeLinks(text);

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

  const inlineLink = await getInlineLink(ingredient.name);

  return (
    <li className="flex flex-row gap-1 py-4">
      {quantity !== null && <span>{quantity}</span>}
      {unit !== null && <span>{unit}</span>}
      <span className="lowercase">{inlineLink || ingredient.name}</span>
    </li>
  );
};
