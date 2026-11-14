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
    async signIn({ user, account, profile }) {
      if (
        account?.provider !== "google" ||
        !account.providerAccountId ||
        profile?.email_verified !== true ||
        !user.email
      ) {
        return false;
      }

      const email = user.email.trim().toLowerCase();
      const approved = await prisma.approvedEmail.findUnique({
        where: { email },
      });

      if (!approved) {
        return false;
      }

      const existingUser = await getUserByEmail(user.email);

      if (!existingUser) {
        if (!user.name) {
          return false;
        }

        await prisma.user.create({
          data: {
            authId: account.providerAccountId,
            name: user.name,
            email: user.email,
            image: user.image,
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
