import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutUserInputObjectSchema as RecipeUpdateWithoutUserInputObjectSchema } from './RecipeUpdateWithoutUserInput.schema';
import { RecipeUncheckedUpdateWithoutUserInputObjectSchema as RecipeUncheckedUpdateWithoutUserInputObjectSchema } from './RecipeUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RecipeUpdateWithoutUserInputObjectSchema), z.lazy(() => RecipeUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const RecipeUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutUserInput>;
export const RecipeUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
