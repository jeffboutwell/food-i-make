import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutRecipesInputObjectSchema as CategoryUpdateWithoutRecipesInputObjectSchema } from './CategoryUpdateWithoutRecipesInput.schema';
import { CategoryUncheckedUpdateWithoutRecipesInputObjectSchema as CategoryUncheckedUpdateWithoutRecipesInputObjectSchema } from './CategoryUncheckedUpdateWithoutRecipesInput.schema';
import { CategoryCreateWithoutRecipesInputObjectSchema as CategoryCreateWithoutRecipesInputObjectSchema } from './CategoryCreateWithoutRecipesInput.schema';
import { CategoryUncheckedCreateWithoutRecipesInputObjectSchema as CategoryUncheckedCreateWithoutRecipesInputObjectSchema } from './CategoryUncheckedCreateWithoutRecipesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CategoryUpdateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutRecipesInputObjectSchema)]),
  create: z.union([z.lazy(() => CategoryCreateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutRecipesInputObjectSchema)])
}).strict();
export const CategoryUpsertWithWhereUniqueWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutRecipesInput>;
export const CategoryUpsertWithWhereUniqueWithoutRecipesInputObjectZodSchema = makeSchema();
