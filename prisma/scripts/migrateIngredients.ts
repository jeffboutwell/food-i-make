import { PrismaClient } from "@/prisma-client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { recipes } from "../seed-data.json";
import { uploadImage } from "./image-uploader";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "category";

const createPlaceholderImage = (recipeName: string) => ({
  url: `https://placehold.co/1200x800/png?text=${encodeURIComponent(recipeName)}`,
  alt: `${recipeName} placeholder image`,
});

async function migrateIngredients() {
  console.log("Starting ingredient migration...");
  const imageFallbacks: Array<{ recipeSlug: string; imageUrl: string }> = [];

  console.log("Deleting all current rows...");
  await prisma.recipe.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Deleted all current rows.");

  console.log("Creating default user jeffboutwell@gmail.com");
  const defaultUser = await prisma.user.create({
    data: {
      authId: "115240539659829599294",
      name: "Jeff Boutwell",
      firstName: "Jeff",
      lastName: "Boutwell",
      email: "jeffboutwell@gmail.com",
    },
  });

  console.log("Default user created", defaultUser);

  console.log(`Found ${recipes.length} recipes to migrate.`);

  for (const recipe of recipes) {
    const categoryNames = [...new Set((recipe.tags ?? []).map((tag) => tag.trim()))].filter(
      (name) => name.length > 0,
    );
    const { tags: _legacyTags, ...recipeData } = recipe;

    await prisma.recipe.create({
      data: {
        authorId: defaultUser.id,
        ...recipeData,
        sections: recipe.sections.map((section) => {
          return {
            name: section.name,
            ingredients: section.ingredients.map((ingredient) => ({
              name: ingredient.name,
              quantity: Number(ingredient.quantity),
              unit: ingredient.unit,
            })),
          };
        }),
        images: await Promise.all(
          recipe.images.map(async (image) => {
            const uploadedImage = await uploadImage(image, recipe.slug);

            if (!uploadedImage) {
              imageFallbacks.push({
                recipeSlug: recipe.slug,
                imageUrl: image,
              });
            }

            return uploadedImage || createPlaceholderImage(recipe.name);
          }),
        ),
        categories: {
          connectOrCreate: categoryNames.map((name) => ({
            where: { slug: toSlug(name) },
            create: {
              name,
              slug: toSlug(name),
            },
          })),
        },
      },
    });
  }

  if (imageFallbacks.length > 0) {
    console.warn(`\nImage fallback count: ${imageFallbacks.length}`);

    for (const fallback of imageFallbacks) {
      console.warn(`- ${fallback.recipeSlug}: ${fallback.imageUrl}`);
    }
  }

  console.log("Migration complete.");
}

migrateIngredients()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
