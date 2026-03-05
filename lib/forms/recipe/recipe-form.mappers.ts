import { RecipeFull } from "../../db/recipe/recipe.types";
import { RecipeFormValues } from "./recipe-form.schemas";

export const recipeToFormValues = (recipe: RecipeFull): RecipeFormValues => ({
  id: recipe.id,
  name: recipe.name,
  slug: recipe.slug,
  description: recipe.description,
  prepTime: recipe.prepTime,
  cookTime: recipe.cookTime,
  servings: recipe.servings,
  notes: recipe.notes,
  images: recipe.images,
  tags: recipe.tags,
  source: recipe.source ?? undefined,

  directions: recipe.directions.map((d) => ({ value: d })),

  sections: recipe.sections.map((section) => ({
    id: section.id,
    name: section.name ?? "",
    order: section.order,

    ingredients: section.ingredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      note: ingredient.note,
      order: ingredient.order,
    })),
  })),
});

export const formValuesToRecipeUpdate = (values: RecipeFormValues) => {
  const { sections, directions, id: _, ...recipe } = values;

  return {
    recipe,
    sections,
    directions: directions.map((d) => d.value),
  };
};
