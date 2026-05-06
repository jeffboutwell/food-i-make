import React from "react";
import Image from "next/image";
import SignIn from "@/lib/components/molecules/auth/sign-in";
import SignOut from "@/lib/components/molecules/auth/sign-out";
import { H1 } from "@/lib/typography";
import { Session } from "next-auth";

type ProfileProps = {
  session: Session | null;
};

export const Profile = ({ session }: ProfileProps) => {
  if (!session?.user) return <SignIn />;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <H1>{session.user.name ?? "Profile"}</H1>
          <p>{session.user.email}</p>
        </div>
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={150}
            height={150}
          />
        )}
      </div>
      <SignOut />
    </div>
  );
};
