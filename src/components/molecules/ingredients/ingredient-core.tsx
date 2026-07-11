import { IngredientSectionFormValues } from "@/lib/db/recipe/ingredient-section.schemas";
import { IngredientSection } from "./ingredient-section";

export const IngredientCore = ({
  sections,
}: {
  sections: IngredientSectionFormValues[];
}) => {
  return (
    <div className="Ingredients">
      {sections.map((section) => (
        <IngredientSection key={section.name} section={section} />
      ))}
    </div>
  );
};
