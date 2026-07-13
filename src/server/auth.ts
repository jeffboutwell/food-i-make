import "server-only";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/server/db/prisma";
import { getUserByEmail } from "@/server/users/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      const user = await getUserByEmail(profile?.email as string);

      if (!user) {
        await prisma.user.create({
          data: {
            authId: profile?.id as string,
            name: profile?.name as string,
            email: profile?.email as string,
            image: profile?.image as string,
          },
        });
      }

      return true;
    },
    async session({ session }) {
      const user = await getUserByEmail(session.user?.email as string);

      session.user.id = user?.authId as string;
      return session;
    },
  },
});
