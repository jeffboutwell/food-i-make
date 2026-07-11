import { H3 } from "@/lib/typography";
import { Ingredient } from "./ingredient";

import { IngredientFormValues } from "@/lib/db/recipe/ingredient.schemas";
import { IngredientSectionFormValues } from "@/lib/db/recipe/ingredient-section.schemas";

export const IngredientSection = ({
  section,
}: {
  section: IngredientSectionFormValues;
}) => {
  return (
    <div className="IngredientSection mb-6">
      <H3>{section.name}</H3>
      <ul className="IngredientSection__list flex flex-col divide-y">
        {section.ingredients.map((ing: IngredientFormValues) => (
          <Ingredient key={ing.name} ingredient={ing} />
        ))}
      </ul>
    </div>
  );
};
