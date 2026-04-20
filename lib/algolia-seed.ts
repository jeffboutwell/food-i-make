import "dotenv/config";
import { algoliasearch } from "algoliasearch";
import prisma from "./db/prisma";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
);

// Fetch and index objects in Algolia
const processRecords = async () => {
  const recipes = await prisma.recipe.findMany({
    include: { categories: true },
  });

  return await client.saveObjects({
    indexName: "recipes_index",
    objects: recipes.map((recipe) => ({
      ...recipe,
      objectID: String(recipe.id),
      url: `recipe/${recipe.slug}`,
    })),
  });
};

processRecords()
  .then(() => console.log("Successfully indexed objects!"))
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
