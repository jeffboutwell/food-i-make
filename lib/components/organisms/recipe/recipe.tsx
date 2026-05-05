import { Image } from "../../atoms/image/image";

import { SourceProps } from "@/lib/db/recipe/source.schema";
import { RecipeFull } from "@/lib/db/recipe/recipe.types";

import { H1, H2, P } from "@/lib/typography";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { inter } from "@/lib/fonts";
import { IngredientCore } from "../../molecules/ingredients/ingredient-core";

import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/actions/user.actions";

const Source = ({ source }: { source: SourceProps }) => {
  if (source.name && source.url) {
    return (
      <div className="Recipe__source">
        Source:{" "}
        <Link href={source.url} target="_blank">
          {source.name}
        </Link>
      </div>
    );
  }
  return null;
};

export const Recipe = async ({ recipe }: { recipe: RecipeFull }) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");

  const isAuthor = user?.id === recipe.authorId;

  const image = recipe.images[0];
  return (
    <div className="Recipe flex flex-col gap-12">
      <section className="grid md:grid-cols-2 gap-8">
        <div className="Recipe__info">
          <H1>{recipe.name}</H1>
          <P>{recipe.description}</P>
          <div className="Recipe__edit">
            {session?.user && isAuthor && (
              <Link href={`/recipe/edit/${recipe.slug}`}>Edit</Link>
            )}
          </div>
          <Source source={recipe.source as SourceProps} />
        </div>
        <div className="Recipe__image">
          <Image
            src={image.url}
            width={700}
            height={700}
            alt={`${recipe.name} image`}
            className="aspect-3/2 object-cover"
            loading="eager"
          />
        </div>
      </section>
      <section className="w-full grid grid-cols-2 lg:flex lg:flex-wrap justify-between items-center gap-y-4 lg:gap-8 border-y py-4">
        {recipe.servings && (
          <div className="Recipe_servings">
            <p>
              Makes{" "}
              {recipe.servings.split(" ").length === 1
                ? `${recipe.servings} servings`
                : `${recipe.servings}`}
            </p>
          </div>
        )}
        <div className="Recipe__meta flex flex-row gap-4 col-span-full justify-between md:justify-start">
          <p className="text-center md:text-left">
            Prep Time: {recipe.prepTime}
          </p>
          {recipe.cookTime !== 0 && (
            <p className="text-center md:text-left">
              Cook Time: {recipe.cookTime}
            </p>
          )}
          <p className="text-center md:text-left">
            Total Time:{" "}
            {recipe.cookTime && recipe.cookTime !== 0
              ? recipe.cookTime + recipe.prepTime
              : recipe.prepTime}
          </p>
        </div>
        <div className="Recipe__tags row-start-1 col-start-2 flex flex-row gap-2 lg:gap-4 justify-end">
          {recipe.categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Badge
                variant={"secondary"}
                className={`${inter.className} rounded-md font-subtle-font hover:brightness-90 transition-all`}
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-16">
        <div className="Recipe__ingredients">
          <H2>Ingredients</H2>
          <IngredientCore sections={recipe.sections} />
        </div>
        <div className="Recipe__directions">
          <H2>Directions</H2>
          <ol className="list-decimal list-inside divide-y">
            {recipe.directions.map((direction: string) => (
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
