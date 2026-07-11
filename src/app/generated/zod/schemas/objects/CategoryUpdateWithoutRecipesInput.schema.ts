import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  image: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const CategoryUpdateWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryUpdateWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateWithoutRecipesInput>;
export const CategoryUpdateWithoutRecipesInputObjectZodSchema = makeSchema();
