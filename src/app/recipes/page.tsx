import { RecipeList } from "@/components/organisms/recipe-list/recipe-list";
import { getAllRecipes } from "@/server/recipes/actions";
import { Suspense } from "react";
import { RecipeListSkeleton } from "@/components/organisms/recipe-list/recipe-list.skeleton";
import { H1 } from "@/components/ui/typography";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex flex-col gap-6">
      <H1>All Recipes</H1>
      <Suspense fallback={<RecipeListSkeleton items={recipes?.length || 12} />}>
        {recipes && <RecipeList recipes={recipes} />}
      </Suspense>
    </div>
  );
}
