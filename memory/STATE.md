# Current State

## Situation

The portfolio was rebuilt on 2026-09-14 from a CV-style site into an expertise
showcase with four landing pages (home, freelance, consulting, recruiters),
typed project case studies and French at the root. On 2026-10-04 the catalogue
went back to a single flat grid, every client reference left the project pages,
and the whole site was cut down editorially. See
[content strategy](topics/content-strategy.md) and [decisions](DECISIONS.md).

## Completed

- LLM wiki, agent entry points and DRY rules (`AGENTS.md`).
- Routing: `defaultLocale: "fr"`, `localePrefix: "as-needed"`, localized
  pathnames, 301 redirects from `/fr/...`, `/experience` and legacy project
  slugs (`next.config.ts`).
- Config-driven landings (`src/content/landings.ts`,
  `src/components/landing/LandingPage.tsx`) built from shared server sections
  in `src/components/sections/`.
- 16 bilingual project files in `data/projects/` (typed by
  `src/types/project.ts`), shown as one flat grid with a category filter
  (`?categorie=`). No families, no sector chips, no client names, no links
  between projects; the ecosystem diagram shows plain labels.
- `CompanyExperience`: the only place naming organizations — sector plus a
  link to the official site (`data/companies.ts`).
- `/ingenierie-ia` (`/en/ai-engineering`): canonical page of the AI method
  (comparison table, nine-step workflow, tools, the "why not an AI/no-code
  builder" answer). Landings keep a summary and link to it.
- Large-group case study `catalogue-donnees-techniques`: deliberately generic,
  no client, no business vocabulary, no data volume.
- Editorial pass: site copy and the 15 existing case studies cut by roughly a
  third, without changing a single figure that was kept.
- Copy pass of 2026-10-06: audience labels say the need, not the jargon
  ("Une mission à confier", no "ESN / grands comptes"; ESN only appears in
  the consulting meta description; recruiters eyebrow "Recrutement : lead
  developer et architecte"); the repeated project `role` sentence is shortened;
  FAQ, process, agentic and expertise copy
  tightened in FR and EN. Section rhythm: every section is `py-16 md:py-24`
  (hero included), blocks inside a section are spaced `10/14`, and the CTA
  band always takes the tone opposite to the section before it.
- `Reveal` is a pure CSS entrance animation (server component, no
  IntersectionObserver): content on screen can no longer stay hidden. The
  desktop navigation has a home link.
- Contact form with a validated "profile" field prefilled by `?profil=`; HTML
  escaping of emails (`src/lib/escape-html.ts`).
- Only the namespaces used by client components are sent to the browser
  (`src/i18n/client-messages.ts`): about 30 KB less HTML per page.
- SEO: per-page metadata with reciprocal hreflang and self canonical
  (`src/lib/seo.ts`), `opengraph-image` per segment, sitemap, robots, manifest
  icons, generated `llms.txt`. Titles ≤ 60 chars, descriptions 140–165.
- Verified on 2026-10-04: lint, `tsc --noEmit`, build (61 static pages), every
  route 200, no horizontal overflow at 400/768/1280 px in light and dark,
  nothing hidden on first paint, both anonymization greps empty, and
  Lighthouse mobile 100 in accessibility, SEO, best practices and agentic
  browsing on `/`, `/projets` and a project page.

- Security and SEO pass of 2026-10-06: mail routes hardened (see
  [decisions](DECISIONS.md)), new profile photo in `public/charles-hl-profile.jpg`
  (1024 px square JPEG, same path so the JSON-LD `image` is unchanged), and a
  rendered-HTML audit of the 50 sitemap URLs: title ≤ 60, description
  120–165, self canonical, 3 hreflang, one `h1` each.

## To validate with Charles

- "What I'm looking for" text (`landing.recruiters.seeking`): provisional.
- Consulting terms (`landing.consulting.terms`): neutral, no rate or date.
- Freelance FAQ answers (ownership of code, hosting, maintenance commitments).
- robots: AI search bots allowed; training bots (GPTBot, CCBot, anthropic-ai)
  still blocked — confirm.
- Naming TotalEnergies and the DGA in the experience section: confirm it is
  acceptable with his employer.
- Tech lead seniority is shown through responsibilities (architecture,
  conventions, code review of a team), never through a job title: Charles
  does not want "vice tech lead" written anywhere.
- Logos: Wikimedia Commons files plus the ANITI site PNG (cropped).

## Next Resumption

Get Charles's validation on the points above, then add real project covers
(`cover` field) when screenshots exist. Changes are committed and pushed to `master`.

## Blockers

None known.
