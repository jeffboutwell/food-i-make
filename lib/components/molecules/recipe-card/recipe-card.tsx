import Link from "next/link";
import { Image } from "../../atoms/image/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardAction,
  CardHeader,
} from "@/components/ui/card";
import { inter } from "@/lib/fonts";
import clsx from "clsx";
import { RecipeCardVariant, RecipeCardProps } from "./recipe-card.types";
import { RecipeCardEdit } from "./recipe-card-edit";

export const RecipeCard = ({
  recipe,
  variant = RecipeCardVariant.DEFAULT,
}: RecipeCardProps) => {
  const image = recipe.images[0];
  const url = `/recipe/${recipe.slug}`;

  return (
    <div
      className={clsx("RecipeCard border-0 rounded-b-none", {
        [`RecipeCard--${variant}`]: variant !== RecipeCardVariant.DEFAULT,
      })}
    >
      <Card
        className="hover:bg-card-hover transition-all gap-2 p-0 border-none ring-0"
        size={
          variant === RecipeCardVariant.COMPACT ||
          variant === RecipeCardVariant.PROFILE
            ? "sm"
            : "default"
        }
      >
        <CardHeader className="block relative p-0">
          {variant === RecipeCardVariant.PROFILE && (
            <CardAction className="absolute right-4 top-1">
              <RecipeCardEdit slug={recipe.slug} />
            </CardAction>
          )}
          <Link href={url} className="RecipeCard__link">
            <Image
              src={image.url}
              alt={recipe.name}
              width={500}
              height={333}
              className="w-full aspect-3/2 object-cover mb-2 rounded-none"
              loading="lazy"
            />
            <CardTitle
              className={clsx(
                "RecipeCard__title text-2xl font-bold",
                inter.className,
              )}
            >
              {recipe.name}
            </CardTitle>
          </Link>
        </CardHeader>
        {variant !== RecipeCardVariant.COMPACT &&
          variant !== RecipeCardVariant.PROFILE && (
            <CardContent className="p-0">
              <CardDescription
                className={clsx(
                  "RecipeCard__description",
                  inter.className,
                  "text-gray-500",
                )}
              >
                {recipe.description}
              </CardDescription>
            </CardContent>
          )}
      </Card>
    </div>
  );
};
