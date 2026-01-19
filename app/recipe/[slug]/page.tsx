import { notFound } from "next/navigation";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}
import { getRecipeBySlug } from "@/lib/actions";
import { Recipe } from "@/lib/components/organisms/recipe/recipe";

export default async function Page({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }

  return <div className="Recipe">{recipe && <Recipe recipe={recipe} />}</div>;
}
