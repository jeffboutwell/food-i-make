import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreateWithoutUserInputObjectSchema as RecipeCreateWithoutUserInputObjectSchema } from './RecipeCreateWithoutUserInput.schema';
import { RecipeUncheckedCreateWithoutUserInputObjectSchema as RecipeUncheckedCreateWithoutUserInputObjectSchema } from './RecipeUncheckedCreateWithoutUserInput.schema';
import { RecipeCreateOrConnectWithoutUserInputObjectSchema as RecipeCreateOrConnectWithoutUserInputObjectSchema } from './RecipeCreateOrConnectWithoutUserInput.schema';
import { RecipeUpsertWithWhereUniqueWithoutUserInputObjectSchema as RecipeUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './RecipeUpsertWithWhereUniqueWithoutUserInput.schema';
import { RecipeCreateManyUserInputEnvelopeObjectSchema as RecipeCreateManyUserInputEnvelopeObjectSchema } from './RecipeCreateManyUserInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithWhereUniqueWithoutUserInputObjectSchema as RecipeUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './RecipeUpdateWithWhereUniqueWithoutUserInput.schema';
import { RecipeUpdateManyWithWhereWithoutUserInputObjectSchema as RecipeUpdateManyWithWhereWithoutUserInputObjectSchema } from './RecipeUpdateManyWithWhereWithoutUserInput.schema';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecipeCreateWithoutUserInputObjectSchema), z.lazy(() => RecipeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => RecipeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecipeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => RecipeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RecipeUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => RecipeUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RecipeCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RecipeUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => RecipeUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RecipeUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => RecipeUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RecipeScalarWhereInputObjectSchema), z.lazy(() => RecipeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RecipeUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedUpdateManyWithoutUserNestedInput>;
export const RecipeUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
