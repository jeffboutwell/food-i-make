import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CategoryOrderByRelationAggregateInputObjectSchema as CategoryOrderByRelationAggregateInputObjectSchema } from './CategoryOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  cookTime: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: SortOrderSchema.optional(),
  directions: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  prepTime: SortOrderSchema.optional(),
  servings: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  sections: SortOrderSchema.optional(),
  authorId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  categories: z.lazy(() => CategoryOrderByRelationAggregateInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const RecipeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RecipeOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeOrderByWithRelationInput>;
export const RecipeOrderByWithRelationInputObjectZodSchema = makeSchema();
