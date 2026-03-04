import { IngredientSection } from "./ingredient-section";
import { IngredientSectionResultSchema } from "@/lib/db";

export const IngredientCore = ({
  sections,
}: {
  sections: IngredientSectionResultSchema[];
}) => {
  return (
    <div className="Ingredients">
      {sections.map((section) => (
        <IngredientSection key={section.id} section={section} />
      ))}
    </div>
  );
};
