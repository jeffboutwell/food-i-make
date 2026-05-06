import React from "react";
import { auth } from "@/lib/auth";
import { Profile } from "@/lib/components/organisms/profile/profile";
import { getUserByEmail } from "@/lib/actions/user.actions";

const Page = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");
  return <Profile session={session} user={user} />;
};

export default Page;
