import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutCategoriesInputObjectSchema as RecipeUpdateWithoutCategoriesInputObjectSchema } from './RecipeUpdateWithoutCategoriesInput.schema';
import { RecipeUncheckedUpdateWithoutCategoriesInputObjectSchema as RecipeUncheckedUpdateWithoutCategoriesInputObjectSchema } from './RecipeUncheckedUpdateWithoutCategoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RecipeUpdateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUncheckedUpdateWithoutCategoriesInputObjectSchema)])
}).strict();
export const RecipeUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutCategoriesInput>;
export const RecipeUpdateWithWhereUniqueWithoutCategoriesInputObjectZodSchema = makeSchema();
