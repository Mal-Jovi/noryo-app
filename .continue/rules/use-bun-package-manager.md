---
globs: "**/*"
description: Enforces the use of Bun instead of NPM/Yarn/PNPM for package
  management and script execution.
alwaysApply: true
---

This project exclusively uses Bun as its package manager and runtime. Never suggest or execute commands using npm, yarn, or pnpm. Always use 'bun' or 'bunx' (e.g., 'bun run build', 'bun install', 'bunx prisma').