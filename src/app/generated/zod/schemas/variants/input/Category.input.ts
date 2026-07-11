import * as z from 'zod';
// prettier-ignore
export const CategoryInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    recipes: z.array(z.unknown()),
    image: z.unknown().optional().nullable()
}).strict();

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;
