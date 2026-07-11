import * as z from 'zod';

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  image: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10").nullish(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
