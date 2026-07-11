import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { RecipeUncheckedCreateNestedManyWithoutCategoriesInputObjectSchema as RecipeUncheckedCreateNestedManyWithoutCategoriesInputObjectSchema } from './RecipeUncheckedCreateNestedManyWithoutCategoriesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  image: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  recipes: z.lazy(() => RecipeUncheckedCreateNestedManyWithoutCategoriesInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateInput>;
export const CategoryUncheckedCreateInputObjectZodSchema = makeSchema();
