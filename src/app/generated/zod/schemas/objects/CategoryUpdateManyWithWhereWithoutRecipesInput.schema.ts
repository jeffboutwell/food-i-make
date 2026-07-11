import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryScalarWhereInputObjectSchema as CategoryScalarWhereInputObjectSchema } from './CategoryScalarWhereInput.schema';
import { CategoryUpdateManyMutationInputObjectSchema as CategoryUpdateManyMutationInputObjectSchema } from './CategoryUpdateManyMutationInput.schema';
import { CategoryUncheckedUpdateManyWithoutRecipesInputObjectSchema as CategoryUncheckedUpdateManyWithoutRecipesInputObjectSchema } from './CategoryUncheckedUpdateManyWithoutRecipesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CategoryUpdateManyMutationInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateManyWithoutRecipesInputObjectSchema)])
}).strict();
export const CategoryUpdateManyWithWhereWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateManyWithWhereWithoutRecipesInput>;
export const CategoryUpdateManyWithWhereWithoutRecipesInputObjectZodSchema = makeSchema();
