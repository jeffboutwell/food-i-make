import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema'

const categoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CategoryScalarWhereInputObjectSchema), z.lazy(() => CategoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CategoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CategoryScalarWhereInputObjectSchema), z.lazy(() => CategoryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  image: z.lazy(() => JsonNullableFilterObjectSchema).optional()
}).strict();
export const CategoryScalarWhereInputObjectSchema: z.ZodType<Prisma.CategoryScalarWhereInput> = categoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.CategoryScalarWhereInput>;
export const CategoryScalarWhereInputObjectZodSchema = categoryscalarwhereinputSchema;
