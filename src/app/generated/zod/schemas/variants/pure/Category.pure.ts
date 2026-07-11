import * as z from 'zod';
// prettier-ignore
export const CategoryModelSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    recipes: z.array(z.unknown()),
    image: z.unknown().nullable()
}).strict();

export type CategoryPureType = z.infer<typeof CategoryModelSchema>;
