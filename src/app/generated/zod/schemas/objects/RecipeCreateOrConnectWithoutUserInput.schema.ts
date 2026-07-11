import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutUserInputObjectSchema as RecipeCreateWithoutUserInputObjectSchema } from './RecipeCreateWithoutUserInput.schema';
import { RecipeUncheckedCreateWithoutUserInputObjectSchema as RecipeUncheckedCreateWithoutUserInputObjectSchema } from './RecipeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecipeCreateWithoutUserInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const RecipeCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutUserInput>;
export const RecipeCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
