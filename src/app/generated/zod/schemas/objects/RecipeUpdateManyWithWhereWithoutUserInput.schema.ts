import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './RecipeUpdateManyMutationInput.schema';
import { RecipeUncheckedUpdateManyWithoutUserInputObjectSchema as RecipeUncheckedUpdateManyWithoutUserInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RecipeUpdateManyMutationInputObjectSchema), z.lazy(() => RecipeUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const RecipeUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutUserInput>;
export const RecipeUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
