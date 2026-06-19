import { RecipeCard } from "../../molecules/recipe-card/recipe-card";
import { RecipeCardVariant } from "../../molecules/recipe-card/recipe-card.types";
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
      className={clsx("RecipeList grid", className, {
        "sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-x-12 md:gap-y-24 lg:gap-x-16":
          variant === RecipeCardVariant.DEFAULT,
        "grid-cols-2 md:grid-cols-4 gap-4":
          variant === RecipeCardVariant.COMPACT ||
          variant === RecipeCardVariant.PROFILE,
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
