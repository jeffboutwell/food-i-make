import { recipes as recipeData, users as userData } from "./seed-data.json";
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Deleting existing recipes...");
  await prisma.recipe.deleteMany();

  console.log("Deleting existing users...");
  await prisma.user.deleteMany();

  console.log("Start seeding...");
  for (const recipe of recipeData) {
    await prisma.recipe.create({
      data: {
        cookTime: recipe.cookTime,
        description: recipe.description,
        directions: recipe.directions,
        images: recipe.images,
        ingredients: recipe.ingredients ?? [],
        name: recipe.name,
        notes: recipe.notes,
        prepTime: recipe.prepTime,
        servings: recipe.servings,
        slug: recipe.slug,
        source: recipe.source,
        tags: recipe.tags,
      },
    });
  }

  for (const user of userData) {
    await prisma.user.create({
      data: {
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        authId: user.authId,
      },
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main(); */

/*
import { recipes as recipeData, users as userData } from "./seed-data.json"; // Adjust path as necessary
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Deleting existing recipes...");
  await prisma.recipe.deleteMany();

  console.log("Deleting existing users...");
  await prisma.user.deleteMany();

  console.log("Start seeding...");
  for (const recipe of recipeData) {
    await prisma.recipe.create({
      data: {
        cookTime: recipe.cookTime,
        description: recipe.description,
        directions: recipe.directions,
        images: recipe.images,
        ingredients: recipe.ingredients ?? [],
        name: recipe.name,
        notes: recipe.notes,
        prepTime: recipe.prepTime,
        servings: recipe.servings,
        slug: recipe.slug,
        source: recipe.source,
        tags: recipe.tags,
      },
    });
  }

  for (const user of userData) {
    await prisma.user.create({
      data: {
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        authId: user.authId,
      },
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

*/
