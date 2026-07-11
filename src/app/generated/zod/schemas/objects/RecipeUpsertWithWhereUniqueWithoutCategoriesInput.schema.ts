import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutCategoriesInputObjectSchema as RecipeUpdateWithoutCategoriesInputObjectSchema } from './RecipeUpdateWithoutCategoriesInput.schema';
import { RecipeUncheckedUpdateWithoutCategoriesInputObjectSchema as RecipeUncheckedUpdateWithoutCategoriesInputObjectSchema } from './RecipeUncheckedUpdateWithoutCategoriesInput.schema';
import { RecipeCreateWithoutCategoriesInputObjectSchema as RecipeCreateWithoutCategoriesInputObjectSchema } from './RecipeCreateWithoutCategoriesInput.schema';
import { RecipeUncheckedCreateWithoutCategoriesInputObjectSchema as RecipeUncheckedCreateWithoutCategoriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RecipeUpdateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUncheckedUpdateWithoutCategoriesInputObjectSchema)]),
  create: z.union([z.lazy(() => RecipeCreateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutCategoriesInputObjectSchema)])
}).strict();
export const RecipeUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutCategoriesInput>;
export const RecipeUpsertWithWhereUniqueWithoutCategoriesInputObjectZodSchema = makeSchema();
