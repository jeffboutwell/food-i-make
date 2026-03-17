import { getAllCategories } from "@/lib/actions/recipe.actions";
import { CategoryList } from "@/lib/components/organisms/category-list/category-list";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">All Categories</h1>
      {categories.length === 0 ? (
        <p className="text-muted-foreground">No categories found yet.</p>
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
}
