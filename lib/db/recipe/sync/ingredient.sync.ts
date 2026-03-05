import { Prisma } from "@/app/generated/prisma/client";
import { IngredientFormValues } from "../ingredient.schemas";
import { diffById } from "./diff";

export async function syncIngredients(
  tx: Prisma.TransactionClient,
  sectionId: number,
  existing: { id: number }[],
  incoming: IngredientFormValues[],
) {
  const diff = diffById(existing, incoming);

  if (diff.create.length) {
    await tx.ingredient.createMany({
      data: diff.create.map((i) => ({
        ...i,
        sectionId,
      })),
    });
  }

  for (const item of diff.update) {
    if (!item.id) continue;

    await tx.ingredient.update({
      where: { id: item.id },
      data: {
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        note: item.note,
        order: item.order,
      },
    });
  }

  if (diff.delete.length) {
    await tx.ingredient.deleteMany({
      where: { id: { in: diff.delete } },
    });
  }
}
