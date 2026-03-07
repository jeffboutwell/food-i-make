import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const RecipeCardSkeleton = () => {
  return (
    <Card className="py-6 lg:py-4 hover:bg-card-hover transition-all w-[400px]">
      <CardContent className="px-6 lg:px-4">
        <Skeleton className="w-full aspect-3/2 mb-2" />
        <CardTitle className="RecipeCard__title text-2xl mb-2">
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
        <CardDescription className="RecipeCard__description flex flex-col gap-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[300px]" />
        </CardDescription>
      </CardContent>
    </Card>
  );
};
