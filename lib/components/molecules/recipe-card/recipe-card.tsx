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
import clsx from "clsx";

export enum RecipeCardVariant {
  DEFAULT = "default",
  COMPACT = "compact",
}

type RecipeCardProps = {
  recipe: Recipe;
  variant?: RecipeCardVariant;
};

export const RecipeCard = ({
  recipe,
  variant = RecipeCardVariant.DEFAULT,
}: RecipeCardProps) => {
  const image = recipe.images[0];

  return (
    <div
      className={clsx("RecipeCard", {
        "RecipeCard--compact": variant === RecipeCardVariant.COMPACT,
      })}
    >
      <Link href={`/recipe/${recipe.slug}`} className="RecipeCard__link block">
        <Card className="hover:bg-card-hover transition-all">
          <CardContent>
            <Image
              src={image.url}
              alt={recipe.name}
              width={500}
              height={333}
              className="aspect-3/2 object-cover mb-2 rounded-md"
              loading="lazy"
            />
            <CardTitle
              className={clsx("RecipeCard__title", inter.className, {
                "text-2xl": variant === RecipeCardVariant.DEFAULT,
                "text-lg": variant === RecipeCardVariant.COMPACT,
              })}
            >
              {recipe.name}
            </CardTitle>
            {variant !== RecipeCardVariant.COMPACT && (
              <CardDescription
                className={clsx(
                  "RecipeCard__description",
                  inter.className,
                  "text-gray-500",
                )}
              >
                {recipe.description}
              </CardDescription>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
