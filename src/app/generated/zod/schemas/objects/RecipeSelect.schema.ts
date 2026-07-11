import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryFindManySchema as CategoryFindManySchema } from '../findManyCategory.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeCountOutputTypeArgsObjectSchema as RecipeCountOutputTypeArgsObjectSchema } from './RecipeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  cookTime: z.boolean().optional(),
  description: z.boolean().optional(),
  directions: z.boolean().optional(),
  images: z.boolean().optional(),
  name: z.boolean().optional(),
  notes: z.boolean().optional(),
  prepTime: z.boolean().optional(),
  servings: z.boolean().optional(),
  slug: z.boolean().optional(),
  source: z.boolean().optional(),
  categories: z.union([z.boolean(), z.lazy(() => CategoryFindManySchema)]).optional(),
  sections: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  authorId: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => RecipeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RecipeSelectObjectSchema: z.ZodType<Prisma.RecipeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RecipeSelect>;
export const RecipeSelectObjectZodSchema = makeSchema();
