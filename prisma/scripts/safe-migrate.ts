import { spawnSync } from "node:child_process";

const safeDatabaseUrl = process.env.SAFE_DATABASE_URL;
const currentDatabaseUrl = process.env.DATABASE_URL;
const migrationName = process.env.MIGRATION_NAME ?? "safe_migration";
const runSafeSeed = process.env.RUN_SAFE_SEED === "1";

if (!safeDatabaseUrl) {
  console.error("SAFE_DATABASE_URL is required.");
  console.error(
    "Example: SAFE_DATABASE_URL='postgresql://...' MIGRATION_NAME=cleanup_categories_only pnpm run migrate:safe",
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

const run = (command: string, args: string[]) => {
  console.log(`\n> ${command} ${args.join(" ")}`);

  const result = spawnSync(command, args, {
    env: safeEnv,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

console.log("Using SAFE_DATABASE_URL for all commands in this run.");
console.log(`Migration name: ${migrationName}`);

run("pnpm", [
  "prisma",
  "migrate",
  "dev",
  "--name",
  migrationName,
]);

run("pnpm", ["prisma", "generate"]);

if (runSafeSeed) {
  run("pnpm", ["run", "migrate:run"]);
}

console.log("\nSafe migration workflow completed successfully.");
