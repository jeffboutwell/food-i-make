import { RecipeList } from "@/lib/components/organisms/recipe-list/recipe-list";
import { getRecipesByCategorySlug } from "@/lib/actions/recipe.actions";

const formatCategoryLabel = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: categorySlug } = await params;
  const recipes = await getRecipesByCategorySlug(categorySlug);
  const label = formatCategoryLabel(categorySlug);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">Recipes for {label}</h1>
      <div className="flex min-h-[40vh] items-start justify-center">
        {recipes && recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <p className="text-muted-foreground">No recipes found for this category.</p>
        )}
      </div>
    </div>
  );
}
