import * as z from 'zod';
export const CategoryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    slug: z.number(),
    recipes: z.number(),
    image: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    slug: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    slug: z.string().nullable()
  }).nullable().optional()});