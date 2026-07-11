import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  name: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string(),
  image: z.string().optional().nullable()
}).strict();
export const UserUncheckedCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutRecipesInput>;
export const UserUncheckedCreateWithoutRecipesInputObjectZodSchema = makeSchema();
