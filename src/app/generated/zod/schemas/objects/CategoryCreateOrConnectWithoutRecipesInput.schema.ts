import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutRecipesInputObjectSchema as CategoryCreateWithoutRecipesInputObjectSchema } from './CategoryCreateWithoutRecipesInput.schema';
import { CategoryUncheckedCreateWithoutRecipesInputObjectSchema as CategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './CategoryUncheckedCreateWithoutRecipesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CategoryCreateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutRecipesInputObjectSchema)])
}).strict();
export const CategoryCreateOrConnectWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateOrConnectWithoutRecipesInput>;
export const CategoryCreateOrConnectWithoutRecipesInputObjectZodSchema = makeSchema();
