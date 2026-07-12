import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

function stripReactRules(configs) {
  return configs.map((config) => {
    if (!config || typeof config !== "object") {
      return config;
    }

    const nextConfig = { ...config };

    if (nextConfig.plugins && typeof nextConfig.plugins === "object") {
      const { react, ...pluginsWithoutReact } = nextConfig.plugins;
      void react;
      nextConfig.plugins = pluginsWithoutReact;
    }

    if (nextConfig.rules && typeof nextConfig.rules === "object") {
      nextConfig.rules = Object.fromEntries(
        Object.entries(nextConfig.rules).filter(
          ([ruleName]) => !ruleName.startsWith("react/"),
        ),
      );
    }

    return nextConfig;
  });
}

const eslintConfig = defineConfig([
  ...stripReactRules(nextVitals),
  ...stripReactRules(nextTs),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/app/generated/**",
    "storybook-static/**",
  ]),
]);

export default eslintConfig;
