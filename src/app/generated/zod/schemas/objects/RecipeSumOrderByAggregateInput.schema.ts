import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  cookTime: SortOrderSchema.optional(),
  prepTime: SortOrderSchema.optional(),
  authorId: SortOrderSchema.optional()
}).strict();
export const RecipeSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeSumOrderByAggregateInput>;
export const RecipeSumOrderByAggregateInputObjectZodSchema = makeSchema();
