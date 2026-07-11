import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableListFilterObjectSchema as JsonNullableListFilterObjectSchema } from './JsonNullableListFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema'

const recipescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RecipeScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RecipeScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecipeScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecipeScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RecipeScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  cookTime: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  directions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  images: z.lazy(() => JsonNullableListFilterObjectSchema).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  prepTime: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  servings: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  source: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  sections: z.lazy(() => JsonNullableListFilterObjectSchema).optional(),
  authorId: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable()
}).strict();
export const RecipeScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RecipeScalarWhereWithAggregatesInput> = recipescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RecipeScalarWhereWithAggregatesInput>;
export const RecipeScalarWhereWithAggregatesInputObjectZodSchema = recipescalarwherewithaggregatesinputSchema;
