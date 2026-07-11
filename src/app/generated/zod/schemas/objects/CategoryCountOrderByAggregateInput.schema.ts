import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  image: SortOrderSchema.optional()
}).strict();
export const CategoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCountOrderByAggregateInput>;
export const CategoryCountOrderByAggregateInputObjectZodSchema = makeSchema();
