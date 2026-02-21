-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "IngredientSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
