import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  // may not need to include all of these, but this is a good starting point for now
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/schemas/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
