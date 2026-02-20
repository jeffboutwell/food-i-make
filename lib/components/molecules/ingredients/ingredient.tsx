import { IngredientFull } from "@/lib/db/ingredient";

export const Ingredient = ({ ingredient }: { ingredient: IngredientFull }) => {
  return (
    <li className="py-4">
      {ingredient.quantity} {ingredient.unit} {ingredient.name}
    </li>
  );
};
