"use client";

import React, { useEffect, useState } from "react";
import { RecipeList } from "../../organisms/recipe-list/recipe-list";
import { getRelatedRecipesById } from "@/lib/actions/recipe.actions";
import { Recipe } from "@/app/generated/prisma/client";

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

  return <RecipeList recipes={relatedRecipes} />;
};
