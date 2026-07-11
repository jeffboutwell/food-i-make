import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  slug: z.string().optional()
}).strict();
export const RecipeWhereUniqueInputObjectSchema: z.ZodType<Prisma.RecipeWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeWhereUniqueInput>;
export const RecipeWhereUniqueInputObjectZodSchema = makeSchema();
