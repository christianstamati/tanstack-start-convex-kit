# TanStack Start + Convex

Full-stack starter that pairs **TanStack Start** (React, file-based routing, SSR) with **Convex** (realtime database, server functions, scheduled jobs). UI uses **Tailwind CSS v4**, **shadcn/ui** (Base UI primitives), and **React 19**.

## Stack


| Layer                     | Tech                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App framework**         | [TanStack Start](https://tanstack.com/start) on [Vite](https://vitejs.dev/)                                                                                   |
| **Routing & SSR**         | [TanStack Router](https://tanstack.com/router)                                                                                                                |
| **Data & cache**          | [TanStack Query](https://tanstack.com/query) via `[@convex-dev/react-query](https://www.npmjs.com/package/@convex-dev/react-query)` for Convex-backed queries |
| **Forms**                 | [TanStack Form](https://tanstack.com/form)                                                                                                                    |
| **Backend**               | [Convex](https://convex.dev/) — queries, mutations, HTTP routes, schema in `convex/`                                                                          |
| **Auth**                  | [@convex-dev/auth](https://labs.convex.dev/auth) with Convex Auth configuration                                                                               |
| **Helpers**               | [convex-helpers](https://github.com/get-convex/convex-helpers)                                                                                                |
| **Deploy / server build** | [Nitro](https://nitro.unjs.io/) (Vite plugin)                                                                                                                 |
| **Styling**               | Tailwind CSS v4, [class-variance-authority](https://cva.style/), [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)                              |
| **Icons**                 | [Lucide React](https://lucide.dev/)                                                                                                                           |
| **Email (e.g. auth)**     | [Resend](https://resend.com/)                                                                                                                                 |
| **i18n**                  | [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) / [inlang](https://inlang.com/)                                                      |
| **Quality**               | TypeScript (strict), [Biome](https://biomejs.dev/), [Vitest](https://vitest.dev/) + Testing Library, [Husky](https://typicode.github.io/husky/)               |


Dev tooling also includes TanStack Router / React devtools where configured in Vite.

## Prerequisites

- [Bun](https://bun.sh/) (scripts use `bun`)
- A [Convex](https://dashboard.convex.dev/) project (link with `npx convex dev` or your team’s flow)

## Development

```bash
bun install
bun dev
```

This runs the frontend (Vite on port **3000**) and **Convex dev** together. Set environment variables Convex expects (see Convex dashboard and `convex/auth.config.ts` / related auth setup).

```bash
bun build      # production client/build
bun preview    # preview production build
bun test       # Vitest
bun lint       # Biome check
bun typecheck  # TypeScript
```

## Adding shadcn/ui components

```bash
npx shadcn@latest add button
```

Components land under `src/components/ui` (per project aliases).

## Using components

```tsx
import { Button } from "@/components/ui/button";
```

