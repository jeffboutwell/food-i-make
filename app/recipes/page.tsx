import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getAllRecipes } from "@/lib/actions/recipe.actions";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
