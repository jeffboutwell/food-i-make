import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RecipeSkeleton } from "@/lib/components/organisms/recipe/recipe.skeleton";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import { Recipe } from "@/lib/components/organisms/recipe/recipe";
import { RelatedRecipes } from "@/lib/components/molecules/related-recipes/related-recipes";

export default async function Page({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }

  return (
    <div className="Recipe w-full">
      <Suspense fallback={<RecipeSkeleton />}>
        {recipe && (
          <>
            <Recipe recipe={recipe} />
            <RelatedRecipes recipeId={recipe.id} numberOfRecipes={3} />
          </>
        )}
      </Suspense>
    </div>
  );
}
