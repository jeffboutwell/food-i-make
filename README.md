This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Prisma Safe Migration Workflow

Use this workflow when your current dev database has migration drift and you want to preserve it.

1. Create a separate empty PostgreSQL database and copy its URL.
2. Run migrations against that safe database only:

```bash
SAFE_DATABASE_URL="postgresql://..." MIGRATION_NAME="cleanup_categories_only" pnpm run migrate:safe
```

3. Optionally seed the safe database in the same run:

```bash
SAFE_DATABASE_URL="postgresql://..." MIGRATION_NAME="cleanup_categories_only" pnpm run migrate:safe:seed
```

Notes:

- The script refuses to run if SAFE_DATABASE_URL matches DATABASE_URL.
- This keeps your current drifted database untouched.

### Smoke Test App Against Safe DB

Run the app using SAFE_DATABASE_URL without changing your default DATABASE_URL:

```bash
SAFE_DATABASE_URL="postgresql://..." pnpm run dev:safe
```

To run on a specific port, pass the value after `--`:

```bash
SAFE_DATABASE_URL="postgresql://..." pnpm run dev:safe -- -p 3001
```
