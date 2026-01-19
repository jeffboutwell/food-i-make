import { Recipe as RecipeProps } from "@/app/generated/prisma/client";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { inter } from "@/lib/fonts";

export const RecipeCard = ({ recipe }: { recipe: RecipeProps }) => {
  return (
    <div className="RecipeCard">
      <Link href={`/recipe/${recipe.slug}`} className="RecipeCard__link block">
        <Card className="py-6 lg:py-4 hover:bg-card-hover transition-all">
          <CardContent className="px-6 lg:px-4">
            <Image
              src={recipe.images[0]}
              alt={recipe.name}
              width={500}
              height={500}
              className="aspect-3/2 object-cover mb-2"
            />
            <CardTitle className="RecipeCard__title text-2xl">
              {recipe.name}
            </CardTitle>
            <CardDescription
              className={`RecipeCard__description ${inter.className} text-gray-500`}
            >
              {recipe.description}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
