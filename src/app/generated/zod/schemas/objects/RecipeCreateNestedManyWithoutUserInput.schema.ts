import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreateWithoutUserInputObjectSchema as RecipeCreateWithoutUserInputObjectSchema } from './RecipeCreateWithoutUserInput.schema';
import { RecipeUncheckedCreateWithoutUserInputObjectSchema as RecipeUncheckedCreateWithoutUserInputObjectSchema } from './RecipeUncheckedCreateWithoutUserInput.schema';
import { RecipeCreateOrConnectWithoutUserInputObjectSchema as RecipeCreateOrConnectWithoutUserInputObjectSchema } from './RecipeCreateOrConnectWithoutUserInput.schema';
import { RecipeCreateManyUserInputEnvelopeObjectSchema as RecipeCreateManyUserInputEnvelopeObjectSchema } from './RecipeCreateManyUserInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecipeCreateWithoutUserInputObjectSchema), z.lazy(() => RecipeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => RecipeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecipeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => RecipeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RecipeCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RecipeCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedManyWithoutUserInput>;
export const RecipeCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
