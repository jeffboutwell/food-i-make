import React from "react";
import { auth } from "@/server/auth";
import { Profile } from "@/components/organisms/profile/profile";
import { getUserByEmail } from "@/server/users/queries";

const Page = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");
  return <Profile session={session} user={user} />;
};

export default Page;
