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

## 2026-09-14 — Config-driven landing pages per audience

**Decision:** One mixed home page plus three audience landings (freelance,
consulting, recruiters), each described by a `LandingConfig` (ordered
sections, featured projects, CTA, JSON-LD) and rendered by a registry of
shared server sections.

**Rationale:** Each audience gets its own H1, metadata and intros for SEO
while sharing design, logos and project cards without duplicated JSX.

## 2026-09-14 — French at the root with `as-needed` prefixes

**Decision:** `defaultLocale: "fr"`, `localePrefix: "as-needed"`, no locale
detection; English lives under `/en`. Old `/fr/...` URLs redirect with 301.
Generated `opengraph-image` routes are excluded from the middleware and from
the `/fr` redirect because Next.js emits them under their internal path.

**Rationale:** The main market is French; one crawlable URL per locale, as
recommended by Google, with reciprocal hreflang built from `getPathname`.

## 2026-09-14 — Typed project data without employment type or period

**Decision:** Projects are TypeScript files (`data/projects/<slug>.ts`)
satisfying `Project`, with `Localized<T>` fields and no `type`/`period`.

**Rationale:** Missing translations fail the build, and client, company or
personal projects share one schema, keeping the site free of CV details.

## 2026-09-14 — Strict anonymization of client work

**Decision:** No client, product, supplier, brand or country names; generic
wording for hardware; figures rounded down and never invented. Rules and the
verification greps are in [content strategy](topics/content-strategy.md).

**Rationale:** Client confidentiality and factual credibility of every claim.

## 2026-10-04 — One flat catalogue, no client taxonomy

**Decision:** `/projets` is a single grid of every project, sorted by `order`,
with the category filter on top. No family grouping, no sector chip, no client
name on a project, and no cross-links between projects: the ecosystem diagram
shows plain labels and the "related projects" block is gone.

**Rationale:** Supersedes the 2026-09-17 grouping. Splitting the catalogue by
intervention context advertised the client mix instead of the work, and
folding a program into one card made twelve applications look like a single
project. The page now answers one question only: what has he built? Clients
belong to the experience section, not to a case study.

## 2026-09-17 — Named organizations instead of an anonymous logo strip

**Decision:** `data/companies.ts` holds the organizations, their sector and
their official site; `CompanyExperience` renders them as cards where the name
is real text inside an external link, with a disclaimer about trademark
ownership. TotalEnergies and the Direction générale de l'Armement were added.

**Rationale:** The logo strip carried no text and no link, so it was invisible
to search engines and weak for assistive technologies. Named organizations
with sectors also show a range of contexts, which the site was missing.
Scope, since 2026-10-04: organizations are named **only** in this section.
Project pages name no client and carry no `sourceOrganization`.

## 2026-09-17 — No site-wide figures

**Decision:** The "key figures" section and `data/metrics.ts` are removed. The
hero proof line now carries qualitative statements (`landing.<id>.hero.proofs`).
Figures remain inside project case studies.

**Rationale:** Every aggregate figure came from the same client, which made a
single engagement look like the whole career. Inside a case study, a figure
has an explicit scope and stays credible.

## 2026-09-17 — One canonical page for the AI method

**Decision:** `/ingenierie-ia` (`/en/ai-engineering`) is the canonical page of
the agentic method: comparison table, six principles, nine-step workflow,
tools, team block and the answer to the "why not an AI/no-code builder"
objection. Landings keep a summary (`depth: "compact"` or `"team"`) and link
to it; the navigation entry became a page link.

**Rationale:** The full method was repeated on four landing pages, which is
duplicate content competing for the same queries. A summary plus a link keeps
the internal linking and gives the topic one indexable target. It also lets
small-business pages present AI briefly and defensively, while technical
audiences get the full depth.

## 2026-10-04 — Editorial density: half the words, same facts

**Decision:** Visible copy is capped: hero pitch one or two short sentences,
section intro one line, project `summary` 160 characters, `context` two
sentences, `solution` two paragraphs, `highlights` and `engineering` four
items of one sentence. The full AI method (comparison table, nine-step
workflow, tools) appears only on `/ingenierie-ia`; landings keep a summary.

**Rationale:** The site read as documentation, not as a showcase. Nobody
finishes a wall of text, so the pages that convert are the ones that get to
the point. Cutting is editing, never inventing: no figure was changed, only
removed with its sentence.

## 2026-10-06 — Reveal is a CSS animation on load, not a scroll trigger

**Decision:** `Reveal` is a server component that renders a `[data-reveal]`
div; `globals.css` plays `fadeInUp` on it at load, and disables it under
`prefers-reduced-motion`. No IntersectionObserver, no framer-motion, no client
JavaScript.

**Rationale:** Two successive viewport-margin fixes failed to make the
scroll-triggered version reliable. An IntersectionObserver reports the state
it sees when it starts observing and then only reacts to changes, and it
cannot run before hydration, so content already on screen could stay at
`opacity: 0` until the visitor scrolled — the bug Charles reported twice. A
CSS animation always runs to completion, with or without JavaScript, and the
component left the client bundle. The scroll-in effect is lost; reliability is
worth more than the effect.

Checked with CDP over 17 pages x 5 viewport sizes (390 to 2560 px wide), on a
direct load, through in-page navigation, back and reload, and with JavaScript
execution disabled: nothing on screen stays hidden.

## 2026-10-04 — Ship only the translations client components need

**Decision:** `src/i18n/client-messages.ts` lists the namespaces read by
client components (`navigation`, `projectsPage`, `contact`, `quote`) and the
locale layout passes only those to `NextIntlClientProvider`.

**Rationale:** The whole message catalogue was serialized into every page,
twice, for about 30 KB of HTML that no client component ever read. Adding a
`useTranslations` namespace to a client component now means adding it to that
list.
