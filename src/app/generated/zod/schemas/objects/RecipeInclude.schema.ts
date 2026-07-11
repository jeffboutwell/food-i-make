import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { CategoryFindManySchema as CategoryFindManySchema } from '../findManyCategory.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { RecipeCountOutputTypeArgsObjectSchema as RecipeCountOutputTypeArgsObjectSchema } from './RecipeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  categories: z.union([z.boolean(), z.lazy(() => CategoryFindManySchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RecipeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RecipeIncludeObjectSchema: z.ZodType<Prisma.RecipeInclude> = makeSchema() as unknown as z.ZodType<Prisma.RecipeInclude>;
export const RecipeIncludeObjectZodSchema = makeSchema();
