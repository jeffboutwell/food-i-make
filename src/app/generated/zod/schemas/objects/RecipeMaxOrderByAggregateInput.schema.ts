import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  cookTime: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  prepTime: SortOrderSchema.optional(),
  servings: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  authorId: SortOrderSchema.optional()
}).strict();
export const RecipeMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeMaxOrderByAggregateInput>;
export const RecipeMaxOrderByAggregateInputObjectZodSchema = makeSchema();
