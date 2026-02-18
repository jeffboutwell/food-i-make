import { Ingredient as IngredientProps } from "@/lib/types";

export const Ingredient = ({ ingredient }: { ingredient: IngredientProps }) => {
  return (
    <li className="py-4">
      {ingredient.quantity} {ingredient.unit} {ingredient.name}
    </li>
  );
};
