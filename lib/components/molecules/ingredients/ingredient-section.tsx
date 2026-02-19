import { H3 } from "@/lib/typography";
import { Ingredient } from "./ingredient";

import { IngredientSectionFull } from "@/lib/db/ingredient-section";
import { IngredientFull } from "@/lib/db/ingredient";

export const IngredientSection = ({
  section,
}: {
  section: IngredientSectionFull;
}) => {
  return (
    <div className="IngredientSection mb-6">
      <H3>{section.name}</H3>
      <ul className="IngredientSection__list flex flex-col divide-y">
        {section.ingredients.map((ing: IngredientFull) => (
          <Ingredient key={ing.name} ingredient={ing} />
        ))}
      </ul>
    </div>
  );
};
