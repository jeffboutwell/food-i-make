import { RecipeList } from "@/components/organisms/recipe-list/recipe-list";
import {
  getCategoryBySlug,
  getRecipesByCategorySlug,
} from "@/server/recipes/actions";
import { H1 } from "@/components/ui/typography";

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
        {recipes && recipes.length > 0 && <RecipeList recipes={recipes} />}
      </div>
    </div>
  );
}
