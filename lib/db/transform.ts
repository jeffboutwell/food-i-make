import { Prisma } from "@/prisma-client";
import { RecipeFull } from "./recipe";

export function buildRecipeUpdateInput(
  form: RecipeFull,
): Prisma.RecipeUpdateInput {
  return {
    name: form.name,
    cookTime: form.cookTime,
    prepTime: form.prepTime,
    description: form.description,
    directions: form.directions,
    notes: form.notes,
    servings: form.servings,
    tags: form.tags,

    sections: {
      deleteMany: {},

      create: form.sections.map((section, sectionIndex) => ({
        name: section.name ?? null,
        order: sectionIndex,

        ingredients: {
          create: section.ingredients.map((ing, ingIndex) => ({
            name: ing.name,
            quantity: ing.quantity ?? null,
            unit: ing.unit ?? null,
            note: ing.note ?? null,
            order: ingIndex,
          })),
        },
      })),
    },
  };
}
