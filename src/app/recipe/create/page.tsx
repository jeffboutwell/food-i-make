import { auth } from "@/server/auth";
import SignIn from "@/components/molecules/auth/sign-in";
import { CreateRecipe } from "@/components/organisms/form/create-recipe/create-recipe";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return (
    <div className="RecipeCreate container">
      <CreateRecipe />
    </div>
  );
}
