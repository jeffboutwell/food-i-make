import * as z from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.number().int(),
    authId: z.string(),
    name: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string(),
    image: z.string().nullable(),
    recipes: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
