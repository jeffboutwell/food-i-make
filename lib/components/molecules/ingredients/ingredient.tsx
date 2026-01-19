import { IngredientProps } from "@/lib/schema";

export const Ingredient = ({ ingredient }: { ingredient: IngredientProps }) => {
  return (
    <li className="py-4">
      {ingredient.amt} {ingredient.unit} {ingredient.name}
    </li>
  );
};
