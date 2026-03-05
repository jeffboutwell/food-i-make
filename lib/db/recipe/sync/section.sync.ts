import { Prisma } from "@/app/generated/prisma/client";
import { RecipeFull } from "../recipe.types";
import { IngredientSectionFormValues } from "../ingredient-section.schemas";
import { diffById } from "./diff";
import { syncIngredients } from "./ingredient.sync";

export async function syncRecipeSections(
  tx: Prisma.TransactionClient,
  recipeId: number,
  existingSections: RecipeFull["sections"],
  incomingSections: IngredientSectionFormValues[],
) {
  const diff = diffById(existingSections, incomingSections);

  // CREATE
  for (const section of diff.create) {
    const created = await tx.ingredientSection.create({
      data: {
        name: section.name,
        order: section.order,
        recipeId,
      },
    });

    if (section.ingredients.length) {
      await tx.ingredient.createMany({
        data: section.ingredients.map((i) => ({
          ...i,
          sectionId: created.id,
        })),
      });
    }
  }

  // UPDATE
  for (const section of diff.update) {
    if (!section.id) continue;

    const existing = existingSections.find((s) => s.id === section.id);

    await tx.ingredientSection.update({
      where: { id: section.id },
      data: {
        name: section.name,
        order: section.order,
      },
    });

    if (existing) {
      await syncIngredients(
        tx,
        section.id,
        existing.ingredients,
        section.ingredients,
      );
    }
  }

  // DELETE
  if (diff.delete.length) {
    await tx.ingredientSection.deleteMany({
      where: { id: { in: diff.delete } },
    });
  }
}
