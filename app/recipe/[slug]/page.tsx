import { notFound } from "next/navigation";
import Image from "next/image";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}
import { getRecipeBySlug } from "@/lib/actions";
// import { Recipe } from "@/src/lib/components/organisms/recipe/recipe";

export default async function Page({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }

  return (
    <div className="Recipe">
      {recipe && (
        <div>
          <p>{recipe.name}</p>
          <Image
            src={recipe.images[0]}
            alt={`image of ${recipe.name}`}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
}
