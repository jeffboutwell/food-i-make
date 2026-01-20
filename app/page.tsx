import { Home } from "../lib/components/organisms/home/home";
import { getRandomRecipe } from "@/lib/actions";

export default async function Page() {
  const recipe = await getRandomRecipe();
  return (
    <div className="w-full">
      <Home recipe={recipe} />
    </div>
  );
}
