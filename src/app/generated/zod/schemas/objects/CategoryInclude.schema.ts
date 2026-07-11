import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { CategoryCountOutputTypeArgsObjectSchema as CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  recipes: z.union([z.boolean(), z.lazy(() => RecipeFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategoryIncludeObjectSchema: z.ZodType<Prisma.CategoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.CategoryInclude>;
export const CategoryIncludeObjectZodSchema = makeSchema();
