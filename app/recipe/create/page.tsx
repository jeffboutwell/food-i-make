import { auth } from "@/lib/auth";
import SignIn from "@/lib/components/molecules/auth/sign-in";
import { CreateRecipe } from "@/lib/components/organisms/form/create-recipe/create-recipe";

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
