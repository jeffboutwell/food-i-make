import { Prisma } from "@/app/generated/prisma/client";

export const userFullInclude = {
  recipes: true,
} satisfies Prisma.UserInclude;

export type UserFull = Prisma.UserGetPayload<{
  include: typeof userFullInclude;
}>;
