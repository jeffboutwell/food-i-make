/* eslint-disable @typescript-eslint/no-namespace */

// This file must be a module, so we include an empty export.
export {};

declare global {
  namespace PrismaJson {
    // Define a type for a user's profile information.
    type Ingredient = {
      id: string;
      name: string;
      amt: string;
      unit: string;
    };
    type IngredientSection = {
      id: string;
      name?: string;
      ingList: Ingredient[];
    };
    type Source = {
      name: string;
      url: string;
    };
  }
}
