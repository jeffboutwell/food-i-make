import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getAllRecipes } from "@/lib/actions/recipe.actions";
import { Suspense } from "react";
import { RecipeListSkeleton } from "@/lib/components/organisms/recipe-list/recipe-list.skeleton";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <Suspense fallback={<RecipeListSkeleton items={recipes?.length || 12} />}>
        {recipes && <RecipeList recipes={recipes} />}
      </Suspense>
    </div>
  );
}
