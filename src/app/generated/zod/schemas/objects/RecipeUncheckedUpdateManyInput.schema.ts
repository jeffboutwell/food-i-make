import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { RecipeUpdatedirectionsInputObjectSchema as RecipeUpdatedirectionsInputObjectSchema } from './RecipeUpdatedirectionsInput.schema';
import { RecipeUpdateimagesInputObjectSchema as RecipeUpdateimagesInputObjectSchema } from './RecipeUpdateimagesInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { RecipeUpdatesectionsInputObjectSchema as RecipeUpdatesectionsInputObjectSchema } from './RecipeUpdatesectionsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  cookTime: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  directions: z.union([z.lazy(() => RecipeUpdatedirectionsInputObjectSchema), z.string().array()]).optional(),
  images: z.union([z.lazy(() => RecipeUpdateimagesInputObjectSchema), jsonSchema.array()]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  prepTime: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  servings: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  source: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  sections: z.union([z.lazy(() => RecipeUpdatesectionsInputObjectSchema), jsonSchema.array()]).optional(),
  authorId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable()
}).strict();
export const RecipeUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedUpdateManyInput>;
export const RecipeUncheckedUpdateManyInputObjectZodSchema = makeSchema();
