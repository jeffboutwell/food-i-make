import { Skeleton } from "@/components/ui/skeleton";

export const RecipeSkeleton = () => {
  return (
    <div className="Recipe flex flex-col gap-12 w-full">
      <section className="grid md:grid-cols-2 gap-8">
        <div className="Recipe__info">
          <Skeleton className="w-full h-12 mb-2" />
          <Skeleton className="w-3/4 h-12 mb-4" />
          <div className="flex flex-col gap-2 mb-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
          <div className="Recipe__edit">
            <Skeleton className="w-12 h-4" />
          </div>
        </div>
        <div className="Recipe__image">
          <Skeleton className="aspect-3/2" />
        </div>
      </section>
      <section className="flex justify-between items-center gap-8 border-y py-4">
        <div className="Recipe__meta flex flex-row gap-4">
          <Skeleton className="w-12 h-6" />
          <Skeleton className="w-12 h-6" />
          <Skeleton className="w-12 h-6" />
        </div>
        <div className="Recipe__tags flex flex-row gap-4">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-16">
        <div className="Recipe__ingredients">
          <Skeleton className="w-3/4 h-10 mb-4" />
          <div className="Ingredients">
            <div className="IngredientSection mb-6">
              <Skeleton className="w-full h-8" />
              <ul className="IngredientSection__list flex flex-col divide-y">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex flex-row gap-2 py-4">
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="w-6 h-4" />
                    <Skeleton className="w-48 h-4" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="IngredientSection mb-6">
              <Skeleton className="w-full h-8" />
              <ul className="IngredientSection__list flex flex-col divide-y">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="flex flex-row gap-2 py-4">
                    <Skeleton className="w-8 h-4" />
                    <Skeleton className="w-6 h-4" />
                    <Skeleton className="w-48 h-4" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="Recipe__directions">
          <Skeleton className="w-3/4 h-10 mb-4" />
          <div className="flex flex-col gap-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
