import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { getUnitAbbreviation } from "@/lib/units";
import { identifyUnit } from "parse-ingredient";
import Fraction from "fraction.js";

export const Ingredient = ({
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

  return (
    <li className="flex flex-row gap-1 py-4">
      {quantity !== null && <span>{quantity}</span>}
      {unit !== null && <span>{unit}</span>}
      <span>{ingredient.name}</span>
    </li>
  );
};
