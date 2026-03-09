import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { decimalToFraction } from "@/lib/utils";

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
  const quantity =
    ingredient.quantity !== undefined
      ? decimalToFraction(ingredient.quantity)
      : null;

  return (
    <li className="flex flex-row gap-1 py-4">
      <Quantity quantity={quantity} />
      <span>{ingredient.unit}</span> <span>{ingredient.name}</span>
    </li>
  );
};
