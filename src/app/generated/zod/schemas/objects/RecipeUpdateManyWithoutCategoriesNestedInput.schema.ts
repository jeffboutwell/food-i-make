import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreateWithoutCategoriesInputObjectSchema as RecipeCreateWithoutCategoriesInputObjectSchema } from './RecipeCreateWithoutCategoriesInput.schema';
import { RecipeUncheckedCreateWithoutCategoriesInputObjectSchema as RecipeUncheckedCreateWithoutCategoriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoriesInput.schema';
import { RecipeCreateOrConnectWithoutCategoriesInputObjectSchema as RecipeCreateOrConnectWithoutCategoriesInputObjectSchema } from './RecipeCreateOrConnectWithoutCategoriesInput.schema';
import { RecipeUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema as RecipeUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema } from './RecipeUpsertWithWhereUniqueWithoutCategoriesInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema as RecipeUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema } from './RecipeUpdateWithWhereUniqueWithoutCategoriesInput.schema';
import { RecipeUpdateManyWithWhereWithoutCategoriesInputObjectSchema as RecipeUpdateManyWithWhereWithoutCategoriesInputObjectSchema } from './RecipeUpdateManyWithWhereWithoutCategoriesInput.schema';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecipeCreateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeCreateWithoutCategoriesInputObjectSchema).array(), z.lazy(() => RecipeUncheckedCreateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutCategoriesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecipeCreateOrConnectWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeCreateOrConnectWithoutCategoriesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RecipeUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RecipeUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RecipeUpdateManyWithWhereWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUpdateManyWithWhereWithoutCategoriesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RecipeScalarWhereInputObjectSchema), z.lazy(() => RecipeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RecipeUpdateManyWithoutCategoriesNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithoutCategoriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithoutCategoriesNestedInput>;
export const RecipeUpdateManyWithoutCategoriesNestedInputObjectZodSchema = makeSchema();
