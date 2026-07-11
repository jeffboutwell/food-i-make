import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableListFilterObjectSchema as JsonNullableListFilterObjectSchema } from './JsonNullableListFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema'

const recipescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RecipeScalarWhereInputObjectSchema), z.lazy(() => RecipeScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecipeScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecipeScalarWhereInputObjectSchema), z.lazy(() => RecipeScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  cookTime: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  directions: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  images: z.lazy(() => JsonNullableListFilterObjectSchema).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  prepTime: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  servings: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  source: z.lazy(() => JsonFilterObjectSchema).optional(),
  sections: z.lazy(() => JsonNullableListFilterObjectSchema).optional(),
  authorId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable()
}).strict();
export const RecipeScalarWhereInputObjectSchema: z.ZodType<Prisma.RecipeScalarWhereInput> = recipescalarwhereinputSchema as unknown as z.ZodType<Prisma.RecipeScalarWhereInput>;
export const RecipeScalarWhereInputObjectZodSchema = recipescalarwhereinputSchema;
