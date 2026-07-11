import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'authId', 'name', 'firstName', 'lastName', 'email', 'image'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;