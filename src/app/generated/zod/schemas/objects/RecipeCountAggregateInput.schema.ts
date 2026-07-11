import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  cookTime: z.literal(true).optional(),
  description: z.literal(true).optional(),
  directions: z.literal(true).optional(),
  images: z.literal(true).optional(),
  name: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  prepTime: z.literal(true).optional(),
  servings: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  source: z.literal(true).optional(),
  sections: z.literal(true).optional(),
  authorId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RecipeCountAggregateInputObjectSchema: z.ZodType<Prisma.RecipeCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCountAggregateInputType>;
export const RecipeCountAggregateInputObjectZodSchema = makeSchema();
