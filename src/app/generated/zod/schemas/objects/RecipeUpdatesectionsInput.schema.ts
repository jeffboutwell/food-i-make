import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  set: jsonSchema.array().optional(),
  push: z.union([jsonSchema, jsonSchema.array()]).optional()
}).strict();
export const RecipeUpdatesectionsInputObjectSchema: z.ZodType<Prisma.RecipeUpdatesectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdatesectionsInput>;
export const RecipeUpdatesectionsInputObjectZodSchema = makeSchema();
