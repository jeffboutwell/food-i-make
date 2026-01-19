import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getAllRecipes } from "@/lib/actions";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <RecipeList recipes={recipes} />
    </div>
  );
}
