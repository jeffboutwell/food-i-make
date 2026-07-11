import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeUncheckedCreateNestedManyWithoutUserInputObjectSchema as RecipeUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RecipeUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  name: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string(),
  image: z.string().optional().nullable(),
  recipes: z.lazy(() => RecipeUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
