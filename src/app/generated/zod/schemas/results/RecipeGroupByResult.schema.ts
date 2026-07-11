import * as z from 'zod';
export const RecipeGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  cookTime: z.number().int(),
  description: z.string(),
  directions: z.array(z.string()),
  images: z.array(z.unknown()),
  name: z.string(),
  notes: z.string(),
  prepTime: z.number().int(),
  servings: z.string(),
  slug: z.string(),
  source: z.unknown(),
  sections: z.array(z.unknown()),
  authorId: z.number().int(),
  _count: z.object({
    id: z.number(),
    cookTime: z.number(),
    description: z.number(),
    directions: z.number(),
    images: z.number(),
    name: z.number(),
    notes: z.number(),
    prepTime: z.number(),
    servings: z.number(),
    slug: z.number(),
    source: z.number(),
    categories: z.number(),
    sections: z.number(),
    user: z.number(),
    authorId: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    cookTime: z.number().nullable(),
    prepTime: z.number().nullable(),
    authorId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    cookTime: z.number().nullable(),
    prepTime: z.number().nullable(),
    authorId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    cookTime: z.number().int().nullable(),
    description: z.string().nullable(),
    directions: z.array(z.string()).nullable(),
    name: z.string().nullable(),
    notes: z.string().nullable(),
    prepTime: z.number().int().nullable(),
    servings: z.string().nullable(),
    slug: z.string().nullable(),
    authorId: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    cookTime: z.number().int().nullable(),
    description: z.string().nullable(),
    directions: z.array(z.string()).nullable(),
    name: z.string().nullable(),
    notes: z.string().nullable(),
    prepTime: z.number().int().nullable(),
    servings: z.string().nullable(),
    slug: z.string().nullable(),
    authorId: z.number().int().nullable()
  }).nullable().optional()
}));