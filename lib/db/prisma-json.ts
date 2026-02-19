/* eslint-disable @typescript-eslint/no-namespace */

// This file must be a module, so we include an empty export.
export {};

declare global {
  namespace PrismaJson {
    type Source = {
      name: string;
      url: string;
    };
  }
}
