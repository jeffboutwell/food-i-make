export const PrismaClientKnownRequestError = class extends Error {};
export const PrismaClientValidationError = class extends Error {};

// The default mock database engine client
export class PrismaClient {
  constructor() {}
  // Add common database properties your UI components consume
  user = { findUnique: async () => null, findMany: async () => [] };
  recipe = { findUnique: async () => null, findMany: async () => [] };
}
