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

async function migrateIngredients() {
  console.log("Starting ingredient migration...");

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
    await prisma.recipe.create({
      data: {
        authorId: defaultUser.id,
        ...recipe,
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
            return uploadedImage || { url: image, alt: recipe.name };
          }),
        ),
      },
    });
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
