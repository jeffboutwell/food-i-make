import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCountOutputTypeCountCategoriesArgsObjectSchema as RecipeCountOutputTypeCountCategoriesArgsObjectSchema } from './RecipeCountOutputTypeCountCategoriesArgs.schema'

const makeSchema = () => z.object({
  categories: z.union([z.boolean(), z.lazy(() => RecipeCountOutputTypeCountCategoriesArgsObjectSchema)]).optional()
}).strict();
export const RecipeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RecipeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCountOutputTypeSelect>;
export const RecipeCountOutputTypeSelectObjectZodSchema = makeSchema();
