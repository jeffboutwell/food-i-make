import { PrismaClient } from "@/prisma-client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { recipes } from "../seed-data.json";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function migrateIngredients() {
  console.log("Starting ingredient migration...");

  console.log("Deleting all current rows...");
  await prisma.user.deleteMany({});
  await prisma.ingredient.deleteMany({});
  await prisma.ingredientSection.deleteMany({});
  await prisma.recipe.deleteMany({});
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
        sections: {
          create: recipe.sections.map((section, sectionIndex) => ({
            name: section.name,
            order: sectionIndex,
            ingredients: {
              create: section.ingredients.map((ing, ingIndex) => ({
                name: ing.name,
                quantity: parseFloat(ing.amt) ?? null,
                unit: ing.unit ?? null,
                note: null,
                order: ingIndex,
              })),
            },
          })),
        },
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
