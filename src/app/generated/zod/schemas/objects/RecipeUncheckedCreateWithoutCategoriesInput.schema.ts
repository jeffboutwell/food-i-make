import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreatedirectionsInputObjectSchema as RecipeCreatedirectionsInputObjectSchema } from './RecipeCreatedirectionsInput.schema';
import { RecipeCreateimagesInputObjectSchema as RecipeCreateimagesInputObjectSchema } from './RecipeCreateimagesInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { RecipeCreatesectionsInputObjectSchema as RecipeCreatesectionsInputObjectSchema } from './RecipeCreatesectionsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  cookTime: z.number().int().optional().nullable(),
  description: z.string(),
  directions: z.union([z.lazy(() => RecipeCreatedirectionsInputObjectSchema), z.string().array()]).optional(),
  images: z.union([z.lazy(() => RecipeCreateimagesInputObjectSchema), jsonSchema.array()]).optional(),
  name: z.string(),
  notes: z.string().optional().nullable(),
  prepTime: z.number().int(),
  servings: z.string(),
  slug: z.string(),
  source: z.union([JsonNullValueInputSchema, jsonSchema]),
  sections: z.union([z.lazy(() => RecipeCreatesectionsInputObjectSchema), jsonSchema.array()]).optional(),
  authorId: z.number().int().optional().nullable()
}).strict();
export const RecipeUncheckedCreateWithoutCategoriesInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedCreateWithoutCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedCreateWithoutCategoriesInput>;
export const RecipeUncheckedCreateWithoutCategoriesInputObjectZodSchema = makeSchema();
