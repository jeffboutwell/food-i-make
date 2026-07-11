import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableListFilterObjectSchema as JsonNullableListFilterObjectSchema } from './JsonNullableListFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { CategoryListRelationFilterObjectSchema as CategoryListRelationFilterObjectSchema } from './CategoryListRelationFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const recipewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RecipeWhereInputObjectSchema), z.lazy(() => RecipeWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RecipeWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RecipeWhereInputObjectSchema), z.lazy(() => RecipeWhereInputObjectSchema).array()]).optional(),
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
  authorId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  categories: z.lazy(() => CategoryListRelationFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const RecipeWhereInputObjectSchema: z.ZodType<Prisma.RecipeWhereInput> = recipewhereinputSchema as unknown as z.ZodType<Prisma.RecipeWhereInput>;
export const RecipeWhereInputObjectZodSchema = recipewhereinputSchema;
