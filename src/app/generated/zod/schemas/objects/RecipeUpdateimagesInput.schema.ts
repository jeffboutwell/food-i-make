import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  set: jsonSchema.array().optional(),
  push: z.union([jsonSchema, jsonSchema.array()]).optional()
}).strict();
export const RecipeUpdateimagesInputObjectSchema: z.ZodType<Prisma.RecipeUpdateimagesInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateimagesInput>;
export const RecipeUpdateimagesInputObjectZodSchema = makeSchema();
