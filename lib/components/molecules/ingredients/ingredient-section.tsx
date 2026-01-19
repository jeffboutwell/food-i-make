import { H3 } from "@/lib/typography";
import { Ingredient } from "./ingredient";

import { IngredientSectionProps, IngredientProps } from "@/lib/schema";

export const IngredientSection = ({
  section,
}: {
  section: IngredientSectionProps;
}) => {
  return (
    <div className="IngredientSection mb-6">
      <H3>{section.name}</H3>
      <ul className="IngredientSection__list flex flex-col divide-y">
        {section.ingList.map((ing: IngredientProps) => (
          <Ingredient key={ing.name} ingredient={ing} />
        ))}
      </ul>
    </div>
  );
};
