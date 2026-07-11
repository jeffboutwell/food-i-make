import * as z from 'zod';

export const RecipeScalarFieldEnumSchema = z.enum(['id', 'cookTime', 'description', 'directions', 'images', 'name', 'notes', 'prepTime', 'servings', 'slug', 'source', 'sections', 'authorId'])

export type RecipeScalarFieldEnum = z.infer<typeof RecipeScalarFieldEnumSchema>;