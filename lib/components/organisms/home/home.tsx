import React from "react";
import { Logo } from "../../atoms/logo/logo";
import Image from "next/image";
import { RecipeFull } from "@/lib/db/recipe";

export const Home = ({ recipe }: { recipe: RecipeFull | null }) => {
  return (
    <section className="Home flex flex-col gap-y-12 justify-center w-full text-center">
      <h1>
        <Logo size={"lg"} asLink={true} />
      </h1>
      {recipe && (
        <div className="justify-center relative w-full aspect-video overflow-hidden">
          <Image
            src={recipe.images[0]}
            layout="fill"
            objectFit="cover"
            alt={recipe.name}
          />
        </div>
      )}
    </section>
  );
};
