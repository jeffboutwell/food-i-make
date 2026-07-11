import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  equals: jsonSchema.array().optional().nullable(),
  has: jsonSchema.optional().nullable(),
  hasEvery: jsonSchema.array().optional(),
  hasSome: jsonSchema.array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const JsonNullableListFilterObjectSchema: z.ZodType<Prisma.JsonNullableListFilter> = makeSchema() as unknown as z.ZodType<Prisma.JsonNullableListFilter>;
export const JsonNullableListFilterObjectZodSchema = makeSchema();
