import { getAllCategories } from "@/lib/actions/recipe.actions";
import { CategoryList } from "@/lib/components/organisms/category-list/category-list";
import { H1 } from "@/lib/typography";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="mx-auto w-full flex flex-col gap-6">
      <H1>All Categories</H1>
      {categories.length === 0 ? (
        <p className="text-muted-foreground">No categories found yet.</p>
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
}
