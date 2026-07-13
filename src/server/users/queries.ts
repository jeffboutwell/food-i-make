import "server-only";

import { UserFull, userFullInclude } from "@/types";
import prisma from "@/server/db/prisma";

export const getUserById = async (id: number): Promise<UserFull | null> => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: userFullInclude,
    });
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw new Error("Failed to fetch user");
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<UserFull | null> => {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: userFullInclude,
    });
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw new Error("Failed to fetch user");
  }
};
