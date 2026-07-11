import * as z from 'zod';
// prettier-ignore
export const RecipeModelSchema = z.object({
    id: z.number().int(),
    cookTime: z.number().int().nullable(),
    description: z.string(),
    directions: z.array(z.string()),
    images: z.array(z.unknown()),
    name: z.string(),
    notes: z.string().nullable(),
    prepTime: z.number().int(),
    servings: z.string(),
    slug: z.string(),
    source: z.unknown(),
    categories: z.array(z.unknown()),
    sections: z.array(z.unknown()),
    user: z.unknown().nullable(),
    authorId: z.number().int().nullable()
}).strict();

export type RecipePureType = z.infer<typeof RecipeModelSchema>;
