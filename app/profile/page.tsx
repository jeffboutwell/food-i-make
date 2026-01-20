import { H1 } from "@/lib/typography";
import React from "react";
import { auth } from "@/lib/auth";
import Image from "next/image";
import SignIn from "@/lib/components/molecules/auth/sign-in";
import SignOut from "@/lib/components/molecules/auth/sign-out";

const Page = async () => {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div>
      <H1>Profile Page</H1>
      {session.user.image && (
        <Image
          src={session.user.image}
          alt="User Avatar"
          width={50}
          height={50}
        />
      )}
      <SignOut />
    </div>
  );
};

export default Page;
