import { RecipeCardSkeleton } from "../../molecules/recipe-card/recipe-card.skeleton";

export const RecipeListSkeleton = ({ items }: { items: number }) => {
  return (
    <div className="RecipeList grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: items }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
};
