import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutCategoriesInputObjectSchema as RecipeCreateWithoutCategoriesInputObjectSchema } from './RecipeCreateWithoutCategoriesInput.schema';
import { RecipeUncheckedCreateWithoutCategoriesInputObjectSchema as RecipeUncheckedCreateWithoutCategoriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RecipeCreateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutCategoriesInputObjectSchema)])
}).strict();
export const RecipeCreateOrConnectWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutCategoriesInput>;
export const RecipeCreateOrConnectWithoutCategoriesInputObjectZodSchema = makeSchema();
