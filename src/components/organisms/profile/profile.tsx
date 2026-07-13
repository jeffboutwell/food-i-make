import React from "react";
import Image from "next/image";
import SignIn from "@/components/molecules/auth/sign-in";
import SignOut from "@/components/molecules/auth/sign-out";
import { H1, H2 } from "@/lib/typography";
import { Session } from "next-auth";
import { UserFull, RecipeCardVariant } from "@/types";
import { RecipeList } from "../recipe-list/recipe-list";

type ProfileProps = {
  session: Session | null;
  user: UserFull | null;
};

export const Profile = ({ session, user }: ProfileProps) => {
  if (!session?.user) return <SignIn />;

  return (
    <div className="grid gap-24">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <H1>{session.user.name ?? "Profile"}</H1>
          <p className="mb-8">{session.user.email}</p>
          <SignOut />
        </div>
        {session.user.image && (
          <div className="ml-auto">
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={150}
              height={150}
            />
          </div>
        )}
      </div>
      {user?.recipes && user.recipes.length > 0 && (
        <div className="flex flex-col gap-4">
          <H2>My Recipes</H2>
          <RecipeList
            recipes={user?.recipes ?? []}
            variant={RecipeCardVariant.PROFILE}
          />
        </div>
      )}
    </div>
  );
};
