import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  image: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const CategoryUncheckedUpdateManyWithoutRecipesInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutRecipesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedUpdateManyWithoutRecipesInput>;
export const CategoryUncheckedUpdateManyWithoutRecipesInputObjectZodSchema = makeSchema();
