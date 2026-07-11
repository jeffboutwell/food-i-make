import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreateWithoutCategoriesInputObjectSchema as RecipeCreateWithoutCategoriesInputObjectSchema } from './RecipeCreateWithoutCategoriesInput.schema';
import { RecipeUncheckedCreateWithoutCategoriesInputObjectSchema as RecipeUncheckedCreateWithoutCategoriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoriesInput.schema';
import { RecipeCreateOrConnectWithoutCategoriesInputObjectSchema as RecipeCreateOrConnectWithoutCategoriesInputObjectSchema } from './RecipeCreateOrConnectWithoutCategoriesInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RecipeCreateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeCreateWithoutCategoriesInputObjectSchema).array(), z.lazy(() => RecipeUncheckedCreateWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutCategoriesInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RecipeCreateOrConnectWithoutCategoriesInputObjectSchema), z.lazy(() => RecipeCreateOrConnectWithoutCategoriesInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RecipeWhereUniqueInputObjectSchema), z.lazy(() => RecipeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RecipeCreateNestedManyWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedManyWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedManyWithoutCategoriesInput>;
export const RecipeCreateNestedManyWithoutCategoriesInputObjectZodSchema = makeSchema();
