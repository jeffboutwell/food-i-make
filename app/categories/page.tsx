import Link from "next/link";
import { getAllCategories } from "@/lib/actions/recipe.actions";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">All Categories</h1>
      {categories.length === 0 ? (
        <p className="text-muted-foreground">No categories found yet.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between rounded-md border p-4 transition-colors hover:bg-muted"
              >
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {category.recipeCount} recipe
                  {category.recipeCount === 1 ? "" : "s"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
