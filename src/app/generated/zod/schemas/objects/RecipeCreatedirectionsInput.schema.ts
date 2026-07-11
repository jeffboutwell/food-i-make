import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const RecipeCreatedirectionsInputObjectSchema: z.ZodType<Prisma.RecipeCreatedirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreatedirectionsInput>;
export const RecipeCreatedirectionsInputObjectZodSchema = makeSchema();
