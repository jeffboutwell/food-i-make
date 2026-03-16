/*
  Warnings:

  - You are about to drop the column `tags` on the `Recipe` table. All the data in the column will be lost.
  - The `images` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientSection` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `source` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientSection" DROP CONSTRAINT "IngredientSection_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "tags",
ADD COLUMN     "sections" JSONB[],
ALTER COLUMN "cookTime" DROP NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB[],
ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "source" SET NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "IngredientSection";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "_CategoryToRecipe_B_index" ON "_CategoryToRecipe"("B");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD CONSTRAINT "_CategoryToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD CONSTRAINT "_CategoryToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
