import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryCreateWithoutRecipesInputObjectSchema as CategoryCreateWithoutRecipesInputObjectSchema } from './CategoryCreateWithoutRecipesInput.schema';
import { CategoryUncheckedCreateWithoutRecipesInputObjectSchema as CategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './CategoryUncheckedCreateWithoutRecipesInput.schema';
import { CategoryCreateOrConnectWithoutRecipesInputObjectSchema as CategoryCreateOrConnectWithoutRecipesInputObjectSchema } from './CategoryCreateOrConnectWithoutRecipesInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryCreateWithoutRecipesInputObjectSchema).array(), z.lazy(() => CategoryUncheckedCreateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutRecipesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CategoryCreateOrConnectWithoutRecipesInputObjectSchema), z.lazy(() => CategoryCreateOrConnectWithoutRecipesInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CategoryWhereUniqueInputObjectSchema), z.lazy(() => CategoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CategoryCreateNestedManyWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryCreateNestedManyWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateNestedManyWithoutRecipesInput>;
export const CategoryCreateNestedManyWithoutRecipesInputObjectZodSchema = makeSchema();
