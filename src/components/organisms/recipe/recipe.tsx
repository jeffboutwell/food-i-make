import { Image } from "../../atoms/image/image";

import { RecipeFull, IngredientSectionFormValues, SourceProps } from "@/types";

import { H1, H2 } from "@/components/ui/typography";
import { Link } from "@/components/atoms/link/link";
import { Badge } from "@/components/ui/badge";
import { inter } from "@/styles/fonts";
import { renderShortcodeReact } from "@/features/recipes/shortcode-render";

import {
  parseShortcodeLinks,
  type ShortcodeRecipeResolver,
} from "@/features/recipes/shortcodes-parse";
import { getUnitAbbreviation } from "@/lib/utils/units";
import { identifyUnit } from "parse-ingredient";
import { RecipeIngredientsInteractive } from "../../molecules/ingredients/recipe-ingredients-interactive";

const prepareIngredientSections = async (
  sections: IngredientSectionFormValues[],
) => {
  let resolveRecipe: ShortcodeRecipeResolver | undefined;

  if (typeof window === "undefined") {
    const { getRecipeBySlug } = await import("@/server/recipes/actions");
    resolveRecipe = getRecipeBySlug;
  }

  return Promise.all(
    sections.map(async (section) => ({
      name: section.name,
      ingredients: await Promise.all(
        section.ingredients.map(async (ingredient) => {
          const identifiedUnit = identifyUnit(ingredient.unit || "");
          const unitAbbreviation = getUnitAbbreviation(identifiedUnit);
          const unit = unitAbbreviation || ingredient.unit || null;

          const nameParts = await parseShortcodeLinks(
            ingredient.name,
            false,
            resolveRecipe,
          );

          return {
            name: ingredient.name,
            quantity:
              typeof ingredient.quantity === "number"
                ? ingredient.quantity
                : null,
            unit,
            nameParts,
          };
        }),
      ),
    })),
  );
};

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
  let session: { user?: { email?: string | null } } | null = null;
  let user: { id?: number } | null = null;

  if (typeof window === "undefined") {
    const [{ auth }, { getUserByEmail }] = await Promise.all([
      import("@/server/auth"),
      import("@/server/users/queries"),
    ]);

    session = await auth();
    const email = session?.user?.email;
    user = email ? await getUserByEmail(email) : null;
  }

  const isAuthor = user?.id === recipe.authorId;

  const image = recipe.images[0];

  const [inlineLink, preparedSections] = await Promise.all([
    renderShortcodeReact(recipe.description),
    prepareIngredientSections(recipe.sections),
  ]);

  return (
    <div className="Recipe flex flex-col gap-12">
      <section className="grid md:grid-cols-2 gap-8">
        <div className="Recipe__info">
          <H1>{recipe.name}</H1>
          <p>{inlineLink}</p>
          <div className="flex flex-row gap-4 items-center justify-between mt-3 text-sm">
            <Source source={recipe.source as SourceProps} />
            {session?.user && isAuthor && (
              <Link href={`/recipe/edit/${recipe.slug}`} icon={"square-pen"}>
                Edit
              </Link>
            )}
          </div>
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
      <section className="w-full grid sm:grid-cols-2 lg:flex lg:flex-wrap justify-between items-center gap-y-4 lg:gap-8 border-y py-4">
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
        {recipe.categories.length > 0 && (
          <div className="Recipe__tags sm:row-start-1 sm:col-start-2 flex flex-row gap-2 lg:gap-4 sm:justify-end">
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
        )}
      </section>
      <section className="grid md:grid-cols-2 gap-16">
        <RecipeIngredientsInteractive
          sections={preparedSections}
          servings={recipe.servings}
        />
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
