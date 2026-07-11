import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCountOutputTypeCountRecipesArgsObjectSchema as UserCountOutputTypeCountRecipesArgsObjectSchema } from './UserCountOutputTypeCountRecipesArgs.schema'

const makeSchema = () => z.object({
  recipes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRecipesArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
