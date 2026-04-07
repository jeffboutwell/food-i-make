import React from "react";
import { Image } from "../../atoms/image/image";
import { Recipe } from "@/app/generated/prisma/client";
import Link from "next/link";
import { H2 } from "@/lib/typography";

export const Home = ({ recipe }: { recipe: Recipe | null }) => {
  const image = recipe?.images[0];

  return (
    <section className="Home flex flex-col gap-y-12 justify-center mx-auto w-3/4 text-center">
      {recipe && (
        <Link href={`/recipe/${recipe.slug}`}>
          <div className="justify-center relative mx-auto mb-8 aspect-video overflow-hidden grow">
            <Image
              src={image?.url}
              layout="fill"
              objectFit="cover"
              alt={recipe.name}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <H2>{recipe.name}</H2>
            <p>{recipe.description}</p>
          </div>
        </Link>
      )}
    </section>
  );
};
