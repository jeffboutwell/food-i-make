import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  set: jsonSchema.array()
}).strict();
export const RecipeCreateimagesInputObjectSchema: z.ZodType<Prisma.RecipeCreateimagesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateimagesInput>;
export const RecipeCreateimagesInputObjectZodSchema = makeSchema();
