-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "directions" TEXT[],
    "images" TEXT[],
    "name" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "servings" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "source" JSONB,
    "tags" TEXT[],
    "user" JSONB,
    "ingredients" JSONB NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
