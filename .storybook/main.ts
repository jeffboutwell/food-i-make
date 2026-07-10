import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "path";
import { fileURLToPath } from "url";

// Manually recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../lib/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    const prismaMockPath = path.resolve(__dirname, "./mocks/mock-prisma.ts");

    config.plugins = [
      ...(config.plugins ?? []),
      {
        name: "storybook-prisma-mock",
        enforce: "pre",
        resolveId(source) {
          if (
            source === "@prisma/client" ||
            source.startsWith("@prisma/client/") ||
            source.startsWith("@/app/generated/prisma") ||
            source.includes("/app/generated/prisma/") ||
            source.includes("app/generated/prisma/")
          ) {
            return prismaMockPath;
          }

          return null;
        },
      },
    ];

    config.define = {
      ...config.define,
      __dirname: JSON.stringify(""),
    };
    config.resolve = {
      ...config.resolve,
      // Note: Changing from an Object to an Array allows Vite to process RegEx rules
      alias: [
        ...(Array.isArray(config.resolve?.alias)
          ? config.resolve.alias
          : Object.entries(config.resolve?.alias || {}).map(
              ([find, replacement]) => ({ find, replacement }),
            )),
        {
          // This RegExp intercepts '@prisma/client' AND any sub-paths like '@prisma/client/runtime/client'
          find: /^@prisma\/client(\/.*)?$/,
          replacement: prismaMockPath,
        },
        {
          // Intercept project-local generated Prisma imports used by UI types/components.
          find: /^@\/app\/generated\/prisma(\/.*)?$/,
          replacement: prismaMockPath,
        },
        {
          // Catch non-alias import forms if they appear in stories or local modules.
          find: /^app\/generated\/prisma(\/.*)?$/,
          replacement: prismaMockPath,
        },
        {
          // Catch relative paths like '../../app/generated/prisma/client'.
          find: /app\/generated\/prisma(\/.*)?$/,
          replacement: prismaMockPath,
        },
      ],
    };
    return config;
  },
};
export default config;
