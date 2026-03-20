import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { getUnitAbbreviation } from "@/lib/units";
import { decimalToFraction } from "@/lib/utils";
import { parseIngredient, identifyUnit } from "parse-ingredient";
import configureMeasurements from "convert-units";
import volume from "convert-units/definitions/volume";

const Quantity = ({
  quantity,
}: {
  quantity: number | [number, number] | [number, number, number] | null;
}) => {
  if (quantity === null) {
    return null;
  }

  if (typeof quantity === "number") {
    return <span>{quantity}</span>;
  }

  // Mixed number: [whole, numerator, denominator]
  if (quantity.length === 3) {
    return (
      <span>
        <span>{quantity[0]}</span>
        <sup className="numerator">{quantity[1]}</sup>
        <span className="slash">&#8260;</span>
        <sub className="denominator">{quantity[2]}</sub>
      </span>
    );
  }

  // Simple fraction: [numerator, denominator]
  return (
    <span>
      <sup className="numerator">{quantity[0]}</sup>
      <span className="slash">&#8260;</span>
      <sub className="denominator">{quantity[1]}</sub>
    </span>
  );
};

export const Ingredient = ({
  ingredient,
}: {
  ingredient: IngredientFormValues;
}) => {
  const convert = configureMeasurements({
    volume,
  });

  const identifiedUnit = identifyUnit(ingredient.unit || "");
  const unitAbbreviation = getUnitAbbreviation(identifiedUnit);

  return (
    <li className="flex flex-row gap-1 py-4">
      <Quantity quantity={ingredient.quantity ?? null} />
      <span>{unitAbbreviation ?? ingredient.unit}</span>
      <span>{ingredient.name}</span>
    </li>
  );
};
