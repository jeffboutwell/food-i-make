import * as z from 'zod';
export const RecipeDeleteResultSchema = z.nullable(z.object({
  id: z.number().int(),
  cookTime: z.number().int().optional(),
  description: z.string(),
  directions: z.array(z.string()),
  images: z.array(z.unknown()),
  name: z.string(),
  notes: z.string().optional(),
  prepTime: z.number().int(),
  servings: z.string(),
  slug: z.string(),
  source: z.unknown(),
  categories: z.array(z.unknown()),
  sections: z.array(z.unknown()),
  user: z.unknown().optional(),
  authorId: z.number().int().optional()
}));