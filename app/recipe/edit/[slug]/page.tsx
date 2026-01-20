import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/actions";
import { EditRecipe } from "@/lib/components/organisms/form/edit-recipe/edit-recipe";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }

  return (
    <div className="RecipeEdit container">
      {recipe && <EditRecipe recipe={recipe} />}
    </div>
  );
}
