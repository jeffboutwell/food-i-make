import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  image: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const CategoryUncheckedCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateWithoutRecipesInput>;
export const CategoryUncheckedCreateWithoutRecipesInputObjectZodSchema = makeSchema();
