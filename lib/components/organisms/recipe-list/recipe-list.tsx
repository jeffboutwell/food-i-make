import { RecipeCard } from "../../molecules/recipe-card/recipe-card";
import { RecipeFull } from "@/lib/db/recipe";

export const RecipeList = ({ recipes }: { recipes: RecipeFull[] }) => {
  return (
    <div className="RecipeList grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes &&
        recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
    </div>
  );
};
