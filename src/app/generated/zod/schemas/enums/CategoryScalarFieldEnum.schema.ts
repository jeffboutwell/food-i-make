import * as z from 'zod';

export const CategoryScalarFieldEnumSchema = z.enum(['id', 'name', 'slug', 'image'])

export type CategoryScalarFieldEnum = z.infer<typeof CategoryScalarFieldEnumSchema>;