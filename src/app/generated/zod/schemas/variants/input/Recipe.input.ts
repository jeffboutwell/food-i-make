import * as z from 'zod';
// prettier-ignore
export const RecipeInputSchema = z.object({
    id: z.number().int(),
    cookTime: z.number().int().optional().nullable(),
    description: z.string(),
    directions: z.array(z.string()),
    images: z.array(z.unknown()),
    name: z.string(),
    notes: z.string().optional().nullable(),
    prepTime: z.number().int(),
    servings: z.string(),
    slug: z.string(),
    source: z.unknown(),
    categories: z.array(z.unknown()),
    sections: z.array(z.unknown()),
    user: z.unknown().optional().nullable(),
    authorId: z.number().int().optional().nullable()
}).strict();

export type RecipeInputType = z.infer<typeof RecipeInputSchema>;
