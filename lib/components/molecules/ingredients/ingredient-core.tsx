import { IngredientSection } from "./ingredient-section";
import { IngredientSectionProps } from "@/lib/schema";

export const IngredientCore = ({
  ingredients,
}: {
  ingredients: IngredientSectionProps[];
}) => {
  return (
    <div className="Ingredients">
      {ingredients.map((section) => (
        <IngredientSection key={section.name} section={section} />
      ))}
    </div>
  );
};
