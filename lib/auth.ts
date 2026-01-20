import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/lib/actions";
// import { User as UserProps } from "@/generated/prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the database
      // 2. Check if the user exists in the database
      const user = await getUserByEmail(profile?.email as string);
      // 3. If the user does not exist, create a new user in the database
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
      // 4. If the user exists, return the user object
      // 5. Return true if the user exists, false otherwise
      return true;
    },
    // Session
    async session({ session }) {
      // 1. Get user from database
      const user = await getUserByEmail(session.user?.email as string);
      // 2. Attach user to session object
      session.user.id = user?.authId as string;
      // 3. Return session object
      return session;
    },
  },
});
