import { Recipe } from "@/app/generated/prisma/client";
import Link from "next/link";
import { Image } from "../../atoms/image/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { inter } from "@/lib/fonts";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const image = recipe.images[0];

  return (
    <div className="RecipeCard">
      <Link href={`/recipe/${recipe.slug}`} className="RecipeCard__link block">
        <Card className="py-6 lg:py-4 hover:bg-card-hover transition-all">
          <CardContent className="px-6 lg:px-4">
            <Image
              src={image.url}
              alt={recipe.name}
              width={500}
              height={333}
              // transformation={[{ width: "500", height: "333", crop: "at_max" }]}
              className="aspect-3/2 object-cover mb-2 rounded-md"
              loading="lazy"
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
