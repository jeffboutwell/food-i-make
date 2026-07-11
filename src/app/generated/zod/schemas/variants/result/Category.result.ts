import * as z from 'zod';
// prettier-ignore
export const CategoryResultSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    recipes: z.array(z.unknown()),
    image: z.unknown().nullable()
}).strict();

export type CategoryResultType = z.infer<typeof CategoryResultSchema>;
