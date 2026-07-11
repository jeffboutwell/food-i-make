import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  image: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const CategoryCreateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateWithoutRecipesInput>;
export const CategoryCreateWithoutRecipesInputObjectZodSchema = makeSchema();
