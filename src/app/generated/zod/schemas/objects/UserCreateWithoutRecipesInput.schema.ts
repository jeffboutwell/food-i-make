import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  authId: z.string(),
  name: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string(),
  image: z.string().optional().nullable()
}).strict();
export const UserCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutRecipesInput>;
export const UserCreateWithoutRecipesInputObjectZodSchema = makeSchema();
