import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeCreateManyUserInputObjectSchema as RecipeCreateManyUserInputObjectSchema } from './RecipeCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => RecipeCreateManyUserInputObjectSchema), z.lazy(() => RecipeCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const RecipeCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.RecipeCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateManyUserInputEnvelope>;
export const RecipeCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
