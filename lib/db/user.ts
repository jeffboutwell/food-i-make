import { UserSchema } from "@/app/generated/zod/schemas";
import { z } from "zod";
import { recipeFullInclude, RecipeResultSchema } from "./recipe";

export const UserUpdateSchema = UserSchema.pick({
  id: true,
  name: true,
  firstName: true,
  lastName: true,
  email: true,
  image: true,
});

export type UserUpdateSchema = z.infer<typeof UserUpdateSchema>;

export const UserCreateSchema = UserSchema.pick({
  name: true,
  firstName: true,
  lastName: true,
  email: true,
  image: true,
});

export type UserCreateSchema = z.infer<typeof UserCreateSchema>;

export const UserResultSchema = UserSchema.pick({
  id: true,
  name: true,
  firstName: true,
  lastName: true,
  email: true,
  image: true,
  authId: true,
}).extend({ recipes: z.array(RecipeResultSchema) });

export type UserResultSchema = z.infer<typeof UserResultSchema>;
