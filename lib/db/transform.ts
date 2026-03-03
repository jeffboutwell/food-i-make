import { RecipeUpdateSchema, RecipeFormSchema } from "./recipe";
import { Prisma } from "@/app/generated/prisma/client";

export function buildRecipeUpdateInput(
  form: RecipeFormSchema,
): Prisma.RecipeUpdateInput {
  return {
    name: form.name,
    cookTime: form.cookTime,
    prepTime: form.prepTime,
    description: form.description,
    directions: form.directions.map((dir) => dir.value),
    notes: form.notes,
    servings: form.servings,
    tags: form.tags,
    source: form.source === null ? Prisma.JsonNull : form.source,

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
