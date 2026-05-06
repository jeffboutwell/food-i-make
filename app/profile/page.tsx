import React from "react";
import { auth } from "@/lib/auth";
import { Profile } from "@/lib/components/organisms/profile/profile";

const Page = async () => {
  const session = await auth();

  return <Profile session={session} />;
};

export default Page;
