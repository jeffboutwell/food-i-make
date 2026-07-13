import { Home } from "../components/organisms/home/home";
import { getRandomRecipe } from "@/server/recipes/actions";

export default async function Page() {
  const recipe = await getRandomRecipe();
  return (
    <div className="w-full">
      <Home recipe={recipe} />
    </div>
  );
}
