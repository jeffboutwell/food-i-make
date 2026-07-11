import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export const MockSessionProvider = ({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
