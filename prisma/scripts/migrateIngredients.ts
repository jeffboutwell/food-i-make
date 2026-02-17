import { PrismaClient } from "@/prisma-client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function migrateIngredients() {
  console.log("Starting ingredient migration...");

  const recipes = await prisma.recipe.findMany({
    include: {
      sections: {
        include: {
          ingredients: true,
        },
      },
    },
  });

  console.log(`Found ${recipes.length} recipes to migrate.`);

  for (const recipe of recipes) {
    const sections = recipe.sections as any[];

    if (!Array.isArray(sections)) continue;

    await prisma.$transaction(async (tx) => {
      for (
        let sectionIndex = 0;
        sectionIndex < sections.length;
        sectionIndex++
      ) {
        const section = sections[sectionIndex];

        const createdSection = await tx.ingredientSection.create({
          data: {
            name: section.title ?? null,
            order: sectionIndex,
            recipeId: recipe.id,
          },
        });

        if (Array.isArray(section.ingList)) {
          for (
            let ingIndex = 0;
            ingIndex < section.ingList.length;
            ingIndex++
          ) {
            const ing = section.ingList[ingIndex];

            await tx.ingredient.create({
              data: {
                name: ing.name,
                quantity: ing.quantity ?? null,
                unit: ing.unit ?? null,
                note: ing.note ?? null,
                order: ingIndex,
                sectionId: createdSection.id,
              },
            });
          }
        }
      }

      // OPTIONAL: Clear old JSON field after successful migration
      /*       await tx.recipe.update({
        where: { id: recipe.id },
        data: { ingredients: [] },
      }); */
    });

    console.log(`Migrated recipe: ${recipe.name}`);
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
