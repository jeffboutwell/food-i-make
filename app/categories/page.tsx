import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getAllRecipes } from "@/lib/actions/recipe.actions";

export default async function CategoriesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>
    </div>
  );
}
