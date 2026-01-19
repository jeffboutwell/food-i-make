import prisma from "@/lib/prisma";

export default async function Home() {
  const recipes = await prisma.recipe.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Food I Make
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-2">
            {recipe.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
