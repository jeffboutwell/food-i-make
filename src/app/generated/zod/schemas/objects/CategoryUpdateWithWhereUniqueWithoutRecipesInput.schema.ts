import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateWithoutRecipesInputObjectSchema as CategoryUpdateWithoutRecipesInputObjectSchema } from './CategoryUpdateWithoutRecipesInput.schema';
import { CategoryUncheckedUpdateWithoutRecipesInputObjectSchema as CategoryUncheckedUpdateWithoutRecipesInputObjectSchema } from './CategoryUncheckedUpdateWithoutRecipesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CategoryUpdateWithoutRecipesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutRecipesInputObjectSchema)])
}).strict();
export const CategoryUpdateWithWhereUniqueWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutRecipesInput>;
export const CategoryUpdateWithWhereUniqueWithoutRecipesInputObjectZodSchema = makeSchema();
