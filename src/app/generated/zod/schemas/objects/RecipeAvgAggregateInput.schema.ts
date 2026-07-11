import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  cookTime: z.literal(true).optional(),
  prepTime: z.literal(true).optional(),
  authorId: z.literal(true).optional()
}).strict();
export const RecipeAvgAggregateInputObjectSchema: z.ZodType<Prisma.RecipeAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RecipeAvgAggregateInputType>;
export const RecipeAvgAggregateInputObjectZodSchema = makeSchema();
