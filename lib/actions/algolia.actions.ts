import { algoliasearch } from "algoliasearch";
import { Recipe } from "@/app/generated/prisma/client";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_WRITE_API_KEY as string,
);

export async function saveRecipeToAlgolia(recipe: Recipe) {
  try {
    const response = await client.saveObject({
      indexName: "recipes_index",
      body: {
        ...recipe,
        objectID: String(recipe.id),
        url: `/recipe/${recipe.slug}`,
      },
    });

    return { success: true, indexedObject: response };
  } catch (error) {
    console.error("Algolia indexing error:", error);
    return { success: false };
  }
}
