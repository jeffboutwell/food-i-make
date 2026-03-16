import { spawnSync } from "node:child_process";

const safeDatabaseUrl = process.env.SAFE_DATABASE_URL;
const currentDatabaseUrl = process.env.DATABASE_URL;
const nextArgs = process.argv.slice(2);

if (!safeDatabaseUrl) {
  console.error("SAFE_DATABASE_URL is required.");
  console.error(
    "Example: SAFE_DATABASE_URL='postgresql://...' pnpm run dev:safe",
  );
  process.exit(1);
}

if (currentDatabaseUrl && currentDatabaseUrl === safeDatabaseUrl) {
  console.error("SAFE_DATABASE_URL matches DATABASE_URL.");
  console.error("Refusing to run to protect your current database.");
  process.exit(1);
}

const safeEnv = {
  ...process.env,
  DATABASE_URL: safeDatabaseUrl,
};

const command = "pnpm";
const args = ["next", "dev", ...nextArgs];

console.log("Starting Next.js with SAFE_DATABASE_URL.");
console.log(`> ${command} ${args.join(" ")}`);

const result = spawnSync(command, args, {
  env: safeEnv,
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
