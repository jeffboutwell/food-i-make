import { IngredientFormValues } from "@/types";
import { getUnitAbbreviation } from "@/lib/utils/units";
import { identifyUnit } from "parse-ingredient";
import { renderShortcodeReact } from "@/features/recipes/shortcode-render";
import Fraction from "fraction.js";

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

  const inlineLink = await renderShortcodeReact(ingredient.name);

  return (
    <li className="flex flex-row gap-1 py-4">
      {quantity !== null && <span>{quantity}</span>}
      {unit !== null && <span>{unit}</span>}
      <span className="lowercase">{inlineLink || ingredient.name}</span>
    </li>
  );
};
