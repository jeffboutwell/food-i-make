import { beforeEach, describe, expect, it, vi } from "vitest";
import NextAuth from "next-auth";
import prisma from "@/server/db/prisma";
import { getUserByEmail } from "@/server/users/queries";

vi.mock("server-only", () => ({}));
vi.mock("next-auth", () => ({
  default: vi.fn(() => ({})),
}));
vi.mock("@/server/db/prisma", () => ({
  default: {
    approvedEmail: { findUnique: vi.fn() },
    user: { create: vi.fn() },
  },
}));
vi.mock("@/server/users/queries", () => ({
  getUserByEmail: vi.fn(),
}));

import "./auth";

const config = vi.mocked(NextAuth).mock.calls[0][0];
if (typeof config === "function" || !config.callbacks?.signIn) {
  throw new Error("Missing sign-in callback");
}
const signIn = config.callbacks.signIn;

const googleSignIn = {
  user: {
    id: "google-id",
    email: "Person@Example.com",
    name: "Person",
    image: "https://example.com/photo",
  },
  account: {
    provider: "google",
    providerAccountId: "google-id",
    type: "oidc" as const,
  },
  profile: {
    sub: "google-id",
    email_verified: true,
  },
};

describe("Google sign-in approval", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("denies an email that has not been approved without creating a user", async () => {
    vi.mocked(prisma.approvedEmail.findUnique).mockResolvedValue(null);

    expect(await signIn(googleSignIn)).toBe(false);
    expect(prisma.approvedEmail.findUnique).toHaveBeenCalledWith({
      where: { email: "person@example.com" },
    });
    expect(getUserByEmail).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("creates an approved user's account with their Google subject", async () => {
    vi.mocked(prisma.approvedEmail.findUnique).mockResolvedValue({
      email: "person@example.com",
    });
    vi.mocked(getUserByEmail).mockResolvedValue(null);

    expect(await signIn(googleSignIn)).toBe(true);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        authId: "google-id",
        email: "Person@Example.com",
        name: "Person",
        image: "https://example.com/photo",
      },
    });
  });

  it("allows an approved existing user without creating another account", async () => {
    vi.mocked(prisma.approvedEmail.findUnique).mockResolvedValue({
      email: "person@example.com",
    });
    vi.mocked(getUserByEmail).mockResolvedValue({
      id: 1,
      authId: "google-id",
      name: "Person",
      firstName: null,
      lastName: null,
      email: "Person@Example.com",
      image: null,
      recipes: [],
    });

    expect(await signIn(googleSignIn)).toBe(true);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("does not create an account when the approved profile has no name", async () => {
    vi.mocked(prisma.approvedEmail.findUnique).mockResolvedValue({
      email: "person@example.com",
    });
    vi.mocked(getUserByEmail).mockResolvedValue(null);

    expect(await signIn({
      ...googleSignIn,
      user: { ...googleSignIn.user, name: null },
    })).toBe(false);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("propagates allowlist database failures", async () => {
    vi.mocked(prisma.approvedEmail.findUnique).mockRejectedValue(
      new Error("Database unavailable"),
    );

    await expect(signIn(googleSignIn)).rejects.toThrow("Database unavailable");
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it.each([
    { ...googleSignIn, profile: { ...googleSignIn.profile, email_verified: false } },
    { ...googleSignIn, profile: undefined },
    { ...googleSignIn, user: { ...googleSignIn.user, email: null } },
    { ...googleSignIn, account: { ...googleSignIn.account, providerAccountId: "" } },
    { ...googleSignIn, account: { ...googleSignIn.account, provider: "other" } },
  ])("rejects incomplete or unverified identities", async (input) => {
    expect(await signIn(input)).toBe(false);
    expect(prisma.approvedEmail.findUnique).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});
