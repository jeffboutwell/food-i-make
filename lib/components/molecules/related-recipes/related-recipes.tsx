"use client";

import React, { useEffect, useState } from "react";
import { RecipeList } from "../../organisms/recipe-list/recipe-list";
import { getRelatedRecipesById } from "@/lib/actions/recipe.actions";
import { Recipe } from "@/app/generated/prisma/client";
import { RecipeCardVariant } from "../recipe-card/recipe-card";
import { H3 } from "@/lib/typography";

type RelatedRecipesProps = {
  recipeId: number;
  numberOfRecipes?: number;
};

export const RelatedRecipes = ({
  recipeId,
  numberOfRecipes,
}: RelatedRecipesProps) => {
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      const recipes = await getRelatedRecipesById(recipeId, numberOfRecipes);
      setRelatedRecipes(recipes ?? []);
    };

    fetchRelatedRecipes();
  }, [recipeId, numberOfRecipes]);

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
