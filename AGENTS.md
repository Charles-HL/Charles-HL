# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 portfolio built with TypeScript, Tailwind CSS, and
`next-intl`. Application routes live in `src/app/`; localized pages are under
`src/app/[locale]/`, and API handlers are in `src/app/api/`. Reusable UI lives
in `src/components/`, shared helpers in `src/lib/`, and locale routing/request
configuration in `src/i18n/`. Keep content data in `data/`, translations in
`messages/`, and static files (including images and `robots.txt`) in `public/`.

## Build, Test, and Development Commands

Load the user's zsh configuration before every Node command so the intended
nvm-managed Node version is active:

```sh
source ~/.zshrc && npm install       # install locked dependencies
source ~/.zshrc && npm run dev       # local Turbopack development server
source ~/.zshrc && npm run build     # production build and type validation
source ~/.zshrc && npm run start     # serve the production build
source ~/.zshrc && npm run lint      # run the configured Next/ESLint checks
```

## Coding Style & Naming Conventions

Use strict TypeScript and the `@/*` alias for imports rooted at `src/`. Match
the existing two-space indentation, double quotes, and semicolon style. Name
React components with `PascalCase` (`ProjectCard.tsx`); use lower camel case
for helpers and configuration modules (`validation-messages.ts`, `seo.ts`).
Follow App Router conventions exactly: route files are `page.tsx`, `layout.tsx`,
or `route.ts`, and dynamic segments use brackets, such as `[slug]`.

## Architecture & Reuse

Treat DRY as a core requirement. Before adding code, look for an existing
component, utility, hook, type, or style that already solves the problem.
When the same UI, behavior, data transformation, or configuration is needed in
more than one place, extract it into a focused shared module instead of
copying it. Prefer composable components with explicit typed props, keeping
feature-specific composition close to the route that owns it. Avoid both
copy-paste implementations and oversized "god" components: share stable
behavior, but do not introduce an abstraction for a single one-off use.

## LLM Wiki

`memory/` is the versioned, tool-neutral knowledge base for humans and coding
agents. At the start of a task, read `README.md`, `memory/INDEX.md`, and
`memory/STATE.md`; then read only the topic pages relevant to the task.

After each meaningful, verified change, update this wiki in the same patch:

- `memory/STATE.md` for the active situation, completed work, next action, and blockers;
- `memory/DECISIONS.md` for a durable technical decision and its rationale;
- `memory/topics/<topic>.md` only when stable knowledge needs more space;
- `memory/INDEX.md` whenever a page is added, renamed, or retired.

Keep pages concise, factual, and internally linked. Correct stale information
instead of appending conflicting histories. Never record secrets, tokens,
passwords, personal data, or raw production data.
