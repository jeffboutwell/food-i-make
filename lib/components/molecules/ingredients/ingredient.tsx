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
  return (
    <li className="py-4">
      {quantity ? `${quantity[0]}/${quantity[1]} ` : ""}
      {ingredient.unit} {ingredient.name}
    </li>
  );
};
