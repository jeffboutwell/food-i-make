import React from "react";
import { Logo } from "../../atoms/logo/logo";
import { Image } from "../../atoms/image/image";
import { Recipe } from "@/app/generated/prisma/client";
import Link from "next/link";

export const Home = ({ recipe }: { recipe: Recipe | null }) => {
  const image = recipe?.images[0];

  return (
    <section className="Home flex flex-col gap-y-12 justify-center w-full text-center">
      <h1>
        <Logo size={"lg"} asLink={true} />
      </h1>
      {recipe && (
        <div className="justify-center relative w-full aspect-video overflow-hidden">
          <Link href={`/recipe/${recipe.slug}`}>
            <Image
              src={image?.url}
              layout="fill"
              objectFit="cover"
              alt={recipe.name}
            />
          </Link>
        </div>
      )}
    </section>
  );
};
