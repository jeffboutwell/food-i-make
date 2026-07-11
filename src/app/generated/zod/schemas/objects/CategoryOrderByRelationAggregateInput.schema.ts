import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CategoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CategoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryOrderByRelationAggregateInput>;
export const CategoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
