import React from "react";
import { RecipeList } from "../../organisms/recipe-list/recipe-list";
import { getRelatedRecipesById } from "@/server/recipes/actions";
import { RecipeCardVariant } from "@/types";
import { H3 } from "@/components/ui/typography";

type RelatedRecipesProps = {
  recipeId: number;
  numberOfRecipes?: number;
};

export const RelatedRecipes = async ({
  recipeId,
  numberOfRecipes,
}: RelatedRecipesProps) => {
  const relatedRecipes = await getRelatedRecipesById(recipeId, numberOfRecipes);

  if (!relatedRecipes.length) {
    return null;
  }

  return (
    <div className="RecipeList--related mt-8">
      <H3>Related Recipes</H3>
      <RecipeList
        className="mt-4"
        recipes={relatedRecipes}
        variant={RecipeCardVariant.COMPACT}
      />
    </div>
  );
};
