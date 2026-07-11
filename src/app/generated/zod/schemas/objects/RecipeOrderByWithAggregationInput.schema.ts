import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RecipeCountOrderByAggregateInputObjectSchema as RecipeCountOrderByAggregateInputObjectSchema } from './RecipeCountOrderByAggregateInput.schema';
import { RecipeAvgOrderByAggregateInputObjectSchema as RecipeAvgOrderByAggregateInputObjectSchema } from './RecipeAvgOrderByAggregateInput.schema';
import { RecipeMaxOrderByAggregateInputObjectSchema as RecipeMaxOrderByAggregateInputObjectSchema } from './RecipeMaxOrderByAggregateInput.schema';
import { RecipeMinOrderByAggregateInputObjectSchema as RecipeMinOrderByAggregateInputObjectSchema } from './RecipeMinOrderByAggregateInput.schema';
import { RecipeSumOrderByAggregateInputObjectSchema as RecipeSumOrderByAggregateInputObjectSchema } from './RecipeSumOrderByAggregateInput.schema'

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
  _count: z.lazy(() => RecipeCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RecipeAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RecipeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RecipeMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RecipeSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RecipeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RecipeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeOrderByWithAggregationInput>;
export const RecipeOrderByWithAggregationInputObjectZodSchema = makeSchema();
