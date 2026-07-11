import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereInputObjectSchema).optional()
}).strict();
export const CategoryCountOutputTypeCountRecipesArgsObjectSchema = makeSchema();
export const CategoryCountOutputTypeCountRecipesArgsObjectZodSchema = makeSchema();
