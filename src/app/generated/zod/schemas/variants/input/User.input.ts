import * as z from 'zod';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.number().int(),
    authId: z.string(),
    name: z.string(),
    firstName: z.string().optional().nullable(),
    lastName: z.string().optional().nullable(),
    email: z.string(),
    image: z.string().optional().nullable(),
    recipes: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
