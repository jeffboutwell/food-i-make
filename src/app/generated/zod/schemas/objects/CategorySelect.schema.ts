import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeFindManySchema as RecipeFindManySchema } from '../findManyRecipe.schema';
import { CategoryCountOutputTypeArgsObjectSchema as CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  recipes: z.union([z.boolean(), z.lazy(() => RecipeFindManySchema)]).optional(),
  image: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategorySelectObjectSchema: z.ZodType<Prisma.CategorySelect> = makeSchema() as unknown as z.ZodType<Prisma.CategorySelect>;
export const CategorySelectObjectZodSchema = makeSchema();
