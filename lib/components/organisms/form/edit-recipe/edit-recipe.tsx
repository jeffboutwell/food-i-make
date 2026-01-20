import React from "react";
import { Recipe as RecipeProps } from "@/app/generated/prisma/client";

export const EditRecipe = ({ recipe }: { recipe: RecipeProps }) => {
  return <div>EditRecipe: {recipe.name}</div>;
};
