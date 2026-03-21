import {
  RecipeCard,
  RecipeCardVariant,
} from "../../molecules/recipe-card/recipe-card";
import { Recipe } from "@/app/generated/prisma/client";
import clsx from "clsx";

type RecipeListProps = {
  recipes: Recipe[];
  variant?: RecipeCardVariant;
  className?: string;
};

export const RecipeList = ({
  recipes,
  variant = RecipeCardVariant.DEFAULT,
  className,
}: RecipeListProps) => {
  return (
    <div
      className={clsx("RecipeList grid gap-8", className, {
        "md:grid-cols-2 lg:grid-cols-3": variant === RecipeCardVariant.DEFAULT,
        "grid-cols-2 md:grid-cols-4": variant === RecipeCardVariant.COMPACT,
      })}
    >
      {recipes &&
        recipes.map((recipe) => {
          return (
            <RecipeCard key={recipe.id} recipe={recipe} variant={variant} />
          );
        })}
    </div>
  );
};
