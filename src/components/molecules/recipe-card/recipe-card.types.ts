import { Recipe } from "@/generated/prisma/client";

export enum RecipeCardVariant {
  DEFAULT = "default",
  COMPACT = "compact",
  PROFILE = "profile",
}

export type RecipeCardProps = {
  recipe: Recipe;
  variant?: RecipeCardVariant;
};
