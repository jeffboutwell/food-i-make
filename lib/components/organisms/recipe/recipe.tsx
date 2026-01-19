import Image from "next/image";

import { Recipe as RecipeProps } from "../../../../app/generated/prisma/client";
import { IngredientSectionProps, SourceProps } from "@/lib/schema";
import { H1, H2, P } from "@/lib/typography";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { inter } from "@/lib/fonts";
import { IngredientCore } from "../../molecules/ingredients/ingredient-core";

const Source = ({ source }: { source: SourceProps }) => {
  if (!source) return null;
  return (
    <div className="Recipe__source">
      Source:{" "}
      <Link href={source.url} target="_blank">
        {source.name}
      </Link>
    </div>
  );
};

export const Recipe = ({ recipe }: { recipe: RecipeProps }) => {
  return (
    <div className="Recipe flex flex-col gap-12">
      <section className="grid md:grid-cols-2 gap-8">
        <div className="Recipe__info">
          <H1>{recipe.name}</H1>
          <P>{recipe.description}</P>
          <div className="Recipe__edit">
            <Link href={`/recipe/edit/${recipe.slug}`}>Edit</Link>
          </div>
          <Source source={recipe.source as SourceProps} />
        </div>
        <div className="Recipe__image">
          <Image
            src={recipe.images[0]}
            width={700}
            height={700}
            alt={`${recipe.name} image`}
            // preload={true}
            className="aspect-3/2 object-cover"
          />
        </div>
      </section>
      <section className="flex justify-between items-center gap-8 border-y py-4">
        <div className="Recipe__meta flex flex-row gap-4">
          <p>Prep Time: {recipe.prepTime}</p>
          <p>Cook Time: {recipe.cookTime}</p>
          <p>Total Time: {recipe.cookTime + recipe.prepTime}</p>
        </div>
        <div className="Recipe__tags flex flex-row gap-4">
          {recipe.tags.map((tag) => (
            <Badge
              variant={"secondary"}
              key={tag}
              className={`${inter.className} rounded-md font-subtle-font`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-16">
        <div className="Recipe__ingredients">
          <H2>Ingredients</H2>
          <IngredientCore
            ingredients={recipe.ingredients as IngredientSectionProps[]}
          />
        </div>
        <div className="Recipe__directions">
          <H2>Directions</H2>
          <ol className="list-decimal list-inside divide-y">
            {recipe.directions.map((direction) => (
              <li key={direction} className="py-4">
                {direction}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
