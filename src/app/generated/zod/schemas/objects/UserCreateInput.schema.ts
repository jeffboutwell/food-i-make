import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreateNestedManyWithoutUserInputObjectSchema as RecipeCreateNestedManyWithoutUserInputObjectSchema } from './RecipeCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  authId: z.string(),
  name: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string(),
  image: z.string().optional().nullable(),
  recipes: z.lazy(() => RecipeCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
