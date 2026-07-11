import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutUserInputObjectSchema as RecipeUpdateWithoutUserInputObjectSchema } from './RecipeUpdateWithoutUserInput.schema';
import { RecipeUncheckedUpdateWithoutUserInputObjectSchema as RecipeUncheckedUpdateWithoutUserInputObjectSchema } from './RecipeUncheckedUpdateWithoutUserInput.schema';
import { RecipeCreateWithoutUserInputObjectSchema as RecipeCreateWithoutUserInputObjectSchema } from './RecipeCreateWithoutUserInput.schema';
import { RecipeUncheckedCreateWithoutUserInputObjectSchema as RecipeUncheckedCreateWithoutUserInputObjectSchema } from './RecipeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RecipeUpdateWithoutUserInputObjectSchema), z.lazy(() => RecipeUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => RecipeCreateWithoutUserInputObjectSchema), z.lazy(() => RecipeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const RecipeUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutUserInput>;
export const RecipeUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
