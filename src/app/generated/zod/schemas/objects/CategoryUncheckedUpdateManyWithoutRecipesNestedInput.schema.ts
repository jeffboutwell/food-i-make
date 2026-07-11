import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryCreateWithoutRecipesInputObjectSchema as CategoryCreateWithoutRecipesInputObjectSchema } from './CategoryCreateWithoutRecipesInput.schema';
import { CategoryUncheckedCreateWithoutRecipesInputObjectSchema as CategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './CategoryUncheckedCreateWithoutRecipesInput.schema';
import { CategoryCreateOrConnectWithoutRecipesInputObjectSchema as CategoryCreateOrConnectWithoutRecipesInputObjectSchema } from './CategoryCreateOrConnectWithoutRecipesInput.schema';
import { CategoryUpsertWithWhereUniqueWithoutRecipesInputObjectSchema as CategoryUpsertWithWhereUniqueWithoutRecipesInputObjectSchema } from './CategoryUpsertWithWhereUniqueWithoutRecipesInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithWhereUniqueWithoutRecipesInputObjectSchema as CategoryUpdateWithWhereUniqueWithoutRecipesInputObjectSchema } from './CategoryUpdateWithWhereUniqueWithoutRecipesInput.schema';
import { CategoryUpdateManyWithWhereWithoutRecipesInputObjectSchema as CategoryUpdateManyWithWhereWithoutRecipesInputObjectSchema } from './CategoryUpdateManyWithWhereWithoutRecipesInput.schema';
import { CategoryScalarWhereInputObjectSchema as CategoryScalarWhereInputObjectSchema } from './CategoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryCreateWithoutRecipesInputObjectSchema).array(), z.lazy(() => CategoryUncheckedCreateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutRecipesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CategoryCreateOrConnectWithoutRecipesInputObjectSchema), z.lazy(() => CategoryCreateOrConnectWithoutRecipesInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CategoryUpsertWithWhereUniqueWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUpsertWithWhereUniqueWithoutRecipesInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CategoryUpdateWithWhereUniqueWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUpdateWithWhereUniqueWithoutRecipesInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CategoryUpdateManyWithWhereWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUpdateManyWithWhereWithoutRecipesInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CategoryScalarWhereInputObjectSchema), z.lazy(() => CategoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CategoryUncheckedUpdateManyWithoutRecipesNestedInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutRecipesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutRecipesNestedInput>;
export const CategoryUncheckedUpdateManyWithoutRecipesNestedInputObjectZodSchema = makeSchema();
