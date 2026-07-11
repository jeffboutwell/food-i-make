import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryCountOutputTypeCountRecipesArgsObjectSchema as CategoryCountOutputTypeCountRecipesArgsObjectSchema } from './CategoryCountOutputTypeCountRecipesArgs.schema'

const makeSchema = () => z.object({
  recipes: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeCountRecipesArgsObjectSchema)]).optional()
}).strict();
export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCountOutputTypeSelect>;
export const CategoryCountOutputTypeSelectObjectZodSchema = makeSchema();
