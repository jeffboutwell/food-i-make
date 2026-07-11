import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './objects/RecipeOrderByWithRelationInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';
import { RecipeScalarFieldEnumSchema } from './enums/RecipeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RecipeSelect> = z.object({
    id: z.boolean().optional(),
    cookTime: z.boolean().optional(),
    description: z.boolean().optional(),
    directions: z.boolean().optional(),
    images: z.boolean().optional(),
    name: z.boolean().optional(),
    notes: z.boolean().optional(),
    prepTime: z.boolean().optional(),
    servings: z.boolean().optional(),
    slug: z.boolean().optional(),
    source: z.boolean().optional(),
    categories: z.boolean().optional(),
    sections: z.boolean().optional(),
    user: z.boolean().optional(),
    authorId: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RecipeSelect>;

export const RecipeFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    cookTime: z.boolean().optional(),
    description: z.boolean().optional(),
    directions: z.boolean().optional(),
    images: z.boolean().optional(),
    name: z.boolean().optional(),
    notes: z.boolean().optional(),
    prepTime: z.boolean().optional(),
    servings: z.boolean().optional(),
    slug: z.boolean().optional(),
    source: z.boolean().optional(),
    categories: z.boolean().optional(),
    sections: z.boolean().optional(),
    user: z.boolean().optional(),
    authorId: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const RecipeFindFirstOrThrowSchema: z.ZodType<Prisma.RecipeFindFirstOrThrowArgs> = z.object({ select: RecipeFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RecipeIncludeObjectSchema.optional()), orderBy: z.union([RecipeOrderByWithRelationInputObjectSchema, RecipeOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecipeWhereInputObjectSchema.optional(), cursor: RecipeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RecipeScalarFieldEnumSchema, RecipeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RecipeFindFirstOrThrowArgs>;

export const RecipeFindFirstOrThrowZodSchema = z.object({ select: RecipeFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RecipeIncludeObjectSchema.optional()), orderBy: z.union([RecipeOrderByWithRelationInputObjectSchema, RecipeOrderByWithRelationInputObjectSchema.array()]).optional(), where: RecipeWhereInputObjectSchema.optional(), cursor: RecipeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RecipeScalarFieldEnumSchema, RecipeScalarFieldEnumSchema.array()]).optional() }).strict();