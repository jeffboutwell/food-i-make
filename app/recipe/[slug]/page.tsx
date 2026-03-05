import { notFound } from "next/navigation";
import { Suspense } from "react";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import { Recipe } from "@/lib/components/organisms/recipe/recipe";

export default async function Page({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }

  return (
    <div className="Recipe">
      <Suspense fallback={<p>Loading recipe form ...</p>}>
        {recipe && <Recipe recipe={recipe} />}
      </Suspense>
    </div>
  );
}
