import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getRecipesByCategorySlug } from "@/lib/actions/recipe.actions";
import { getCategoryBySlug } from "@/lib/actions/recipe.actions";
import { Suspense } from "react";
import { RecipeListSkeleton } from "@/lib/components/organisms/recipe-list/recipe-list.skeleton";
import { H1 } from "@/lib/typography";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const recipes = await getRecipesByCategorySlug(categorySlug);

  return (
    <div className="mx-auto w-full flex flex-col gap-6">
      <H1>{category?.name ?? categorySlug}</H1>
      <div className="flex min-h-[40vh] items-start justify-center">
        <Suspense fallback={<RecipeListSkeleton />}>
          {recipes && recipes.length > 0 && <RecipeList recipes={recipes} />}
        </Suspense>
      </div>
    </div>
  );
}
