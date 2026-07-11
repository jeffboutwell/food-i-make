import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  cookTime: SortOrderSchema.optional(),
  prepTime: SortOrderSchema.optional(),
  authorId: SortOrderSchema.optional()
}).strict();
export const RecipeAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RecipeAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeAvgOrderByAggregateInput>;
export const RecipeAvgOrderByAggregateInputObjectZodSchema = makeSchema();
