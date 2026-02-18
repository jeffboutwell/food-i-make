import { IngredientSection } from "./ingredient-section";
// import { IngredientSectionProps } from "@/lib/schema";
import { SectionWithIngredients } from "@/lib/types";
export const IngredientCore = ({
  ingredients,
}: {
  ingredients: SectionWithIngredients[];
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
