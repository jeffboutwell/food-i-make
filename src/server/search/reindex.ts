import "dotenv/config";

import { algoliasearch } from "algoliasearch";
import prisma from "@/server/db/prisma";
import { renderShortcodeText } from "@/features/recipes/shortcode-render";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_WRITE_API_KEY as string,
);

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
        description: await renderShortcodeText(recipe.description),
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
