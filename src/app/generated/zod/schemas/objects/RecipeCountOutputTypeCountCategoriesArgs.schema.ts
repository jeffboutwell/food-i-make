import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const RecipeCountOutputTypeCountCategoriesArgsObjectSchema = makeSchema();
export const RecipeCountOutputTypeCountCategoriesArgsObjectZodSchema = makeSchema();
