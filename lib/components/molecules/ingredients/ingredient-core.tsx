import { IngredientSection } from "./ingredient-section";
import { IngredientSectionFull } from "@/lib/db/ingredient-section";

export const IngredientCore = ({
  ingredients,
}: {
  ingredients: IngredientSectionFull[];
}) => {
  console.log("IngredientCore", ingredients);
  return (
    <div className="Ingredients">
      {ingredients.map((section) => (
        <IngredientSection key={section.id} section={section} />
      ))}
    </div>
  );
};
