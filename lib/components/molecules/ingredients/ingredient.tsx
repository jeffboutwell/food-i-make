import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";

export const Ingredient = ({
  ingredient,
}: {
  ingredient: IngredientFormValues;
}) => {
  return (
    <li className="py-4">
      {ingredient.quantity} {ingredient.unit} {ingredient.name}
    </li>
  );
};
