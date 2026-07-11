import * as z from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  authId: z.string(),
  name: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  email: z.string(),
  image: z.string().nullish(),
});

export type UserType = z.infer<typeof UserSchema>;
