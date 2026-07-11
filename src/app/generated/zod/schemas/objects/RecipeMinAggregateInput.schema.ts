import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  cookTime: z.literal(true).optional(),
  description: z.literal(true).optional(),
  name: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  prepTime: z.literal(true).optional(),
  servings: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  authorId: z.literal(true).optional()
}).strict();
export const RecipeMinAggregateInputObjectSchema: z.ZodType<Prisma.RecipeMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecipeMinAggregateInputType>;
export const RecipeMinAggregateInputObjectZodSchema = makeSchema();
