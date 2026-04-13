import "dotenv/config";
import { algoliasearch } from "algoliasearch";
import prisma from "./db/prisma";

const client = algoliasearch("V1Z1S66I2G", "0c934be8841218fd0a91032c0e9e6e98");

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
    })),
  });
};

processRecords()
  .then(() => console.log("Successfully indexed objects!"))
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
