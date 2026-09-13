# Decisions

## 2026-09-14 — Use a repository-local Markdown wiki

**Decision:** Keep durable project context in the versioned `memory/` folder,
with `AGENTS.md` as the concise entry point.

**Rationale:** Small, indexed Markdown pages are readable by people and coding
agents, survive tool changes, and avoid overloading a single instruction file.

## 2026-09-14 — Prefer shared, composable code over duplication

**Decision:** Reuse existing components and extract stable repeated UI or logic
into focused shared modules.

**Rationale:** This keeps React and Next.js code consistent, maintainable, and
easier to evolve without parallel fixes. One-off behavior remains local to
avoid premature abstractions.
