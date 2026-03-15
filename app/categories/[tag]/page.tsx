import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getRecipesByTag } from "@/lib/actions/recipe.actions";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const recipes = await getRecipesByTag(tag);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recipes for {tag}</h1>
      <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
        {recipes && <RecipeList recipes={recipes} />}
      </div>
    </div>
  );
}
