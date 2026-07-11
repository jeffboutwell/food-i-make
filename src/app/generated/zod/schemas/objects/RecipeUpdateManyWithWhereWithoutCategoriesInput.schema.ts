import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './RecipeUpdateManyMutationInput.schema';
import { RecipeUncheckedUpdateManyWithoutCategoriesInputObjectSchema as RecipeUncheckedUpdateManyWithoutCategoriesInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutCategoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RecipeUpdateManyMutationInputObjectSchema), z.lazy(() => RecipeUncheckedUpdateManyWithoutCategoriesInputObjectSchema)])
}).strict();
export const RecipeUpdateManyWithWhereWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutCategoriesInput>;
export const RecipeUpdateManyWithWhereWithoutCategoriesInputObjectZodSchema = makeSchema();
