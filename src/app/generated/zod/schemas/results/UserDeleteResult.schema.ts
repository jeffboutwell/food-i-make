import * as z from 'zod';
export const UserDeleteResultSchema = z.nullable(z.object({
  id: z.number().int(),
  authId: z.string(),
  name: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string(),
  image: z.string().optional(),
  recipes: z.array(z.unknown())
}));