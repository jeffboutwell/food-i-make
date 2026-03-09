import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { decimalToFraction } from "@/lib/utils";

export const Ingredient = ({
  ingredient,
}: {
  ingredient: IngredientFormValues;
}) => {
  const quantity =
    ingredient.quantity !== undefined
      ? decimalToFraction(ingredient.quantity)
      : null;

  const quantityText =
    quantity === null
      ? ""
      : typeof quantity === "number"
        ? `${quantity} `
        : `${quantity[0]}/${quantity[1]} `;

  return (
    <li className="py-4">
      {quantityText}
      {ingredient.unit} {ingredient.name}
    </li>
  );
};
