import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { RecipeCreateNestedManyWithoutCategoriesInputObjectSchema as RecipeCreateNestedManyWithoutCategoriesInputObjectSchema } from './RecipeCreateNestedManyWithoutCategoriesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  image: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  recipes: z.lazy(() => RecipeCreateNestedManyWithoutCategoriesInputObjectSchema).optional()
}).strict();
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>;
export const CategoryCreateInputObjectZodSchema = makeSchema();
