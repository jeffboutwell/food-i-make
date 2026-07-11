import { type ReactElement, type ReactNode } from "react";
import "dotenv/config";
import { algoliasearch } from "algoliasearch";
import prisma from "./db/prisma";
import { renderShortcodeLinks } from "@/lib/hooks/render-shortcode-links";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_WRITE_API_KEY as string,
);

const getDescriptionText = (textElementArray: ReactElement[]) => {
  const firstElement = textElementArray[0] as
    | ReactElement<{ children?: ReactNode }>
    | undefined;

  return firstElement?.props.children ?? "";
};

// Fetch and index objects in Algolia
const processRecords = async () => {
  const recipes = await prisma.recipe.findMany({
    include: { categories: true },
  });

  return await client.saveObjects({
    indexName: "recipes_index",
    objects: await Promise.all(
      recipes.map(async (recipe) => ({
        ...recipe,
        objectID: String(recipe.id),
        url: `/recipe/${recipe.slug}`,
        description: getDescriptionText(
          await renderShortcodeLinks(recipe.description, true),
        ),
      })),
    ),
  });
};

processRecords()
  .then(() => console.log("Successfully indexed objects!"))
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
