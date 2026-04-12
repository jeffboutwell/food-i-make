import React from "react";
import { Recipe } from "@/app/generated/prisma/client";
import { Image } from "@/lib/components/atoms/image/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

export const SearchResultsItem = ({ recipe }: { recipe: Recipe }) => {
  return (
    <li>
      <Link
        href={`/recipe/${recipe.slug}`}
        className="grid grid-cols-4 hover:bg-muted transition-all"
      >
        <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted">
          <Image
            src={recipe.images[0].url}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </AspectRatio>
        <div className="col-span-3 p-2">
          <p className="font-bold text-lg/tight">{recipe.name}</p>
        </div>
      </Link>
    </li>
  );
};
