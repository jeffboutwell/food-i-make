import { RecipeIngredientsInteractive } from "./recipe-ingredients-interactive";
import { RecipeIngredientsStatic } from "./recipe-ingredients-static";
import { IngredientSectionDisplay } from "./recipe-ingredients.types";

const STATIC_CONTAINER_ID = "recipe-ingredients-static";

export const RecipeIngredients = ({
  sections,
  servings,
}: {
  sections: IngredientSectionDisplay[];
  servings?: string | null;
}) => {
  return (
    <>
      <div id={STATIC_CONTAINER_ID}>
        <RecipeIngredientsStatic sections={sections} servings={servings} />
      </div>
      <RecipeIngredientsInteractive
        sections={sections}
        servings={servings}
        staticContainerId={STATIC_CONTAINER_ID}
      />
    </>
  );
};
