import { H3 } from "@/lib/typography";
import { Ingredient } from "./ingredient";

import {
  SectionWithIngredients,
  Ingredient as IngredientProps,
} from "@/lib/types";

export const IngredientSection = ({
  section,
}: {
  section: SectionWithIngredients;
}) => {
  return (
    <div className="IngredientSection mb-6">
      <H3>{section.name}</H3>
      <ul className="IngredientSection__list flex flex-col divide-y">
        {section.ingredients.map((ing: IngredientProps) => (
          <Ingredient key={ing.name} ingredient={ing} />
        ))}
      </ul>
    </div>
  );
};
