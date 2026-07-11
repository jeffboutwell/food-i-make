import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  set: jsonSchema.array()
}).strict();
export const RecipeCreatesectionsInputObjectSchema: z.ZodType<Prisma.RecipeCreatesectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreatesectionsInput>;
export const RecipeCreatesectionsInputObjectZodSchema = makeSchema();
