import { H3 } from "@/lib/typography";
import { Ingredient } from "./ingredient";

import {
  IngredientSectionResultSchema,
  IngredientResultSchema,
} from "@/lib/db";

export const IngredientSection = ({
  section,
}: {
  section: IngredientSectionResultSchema;
}) => {
  return (
    <div className="IngredientSection mb-6">
      <H3>{section.name}</H3>
      <ul className="IngredientSection__list flex flex-col divide-y">
        {section.ingredients.map((ing: IngredientResultSchema) => (
          <Ingredient key={ing.name} ingredient={ing} />
        ))}
      </ul>
    </div>
  );
};
