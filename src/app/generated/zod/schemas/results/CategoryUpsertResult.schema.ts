import * as z from 'zod';
export const CategoryUpsertResultSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  recipes: z.array(z.unknown()),
  image: z.unknown().optional()
});