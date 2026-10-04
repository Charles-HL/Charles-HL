# Content Strategy

## Positioning

Two equal pillars: an expert full stack software engineer (architecture,
backend, frontend, security, DevOps, integrations, product vision) and an
architect who orchestrates AI agents under engineering control — never
"vibe coding". Central message: *"Ingénieur d'abord. L'IA exécute ; je
conçois, je décide, je relis et je prouve."* It appears on all four landings
(AI section motto).

## Audiences and SEO intents

| Page | FR / EN path | Intent |
|---|---|---|
| Home | `/`, `/en` | Charles HL, full stack & AI engineer, Toulouse |
| Freelance | `/developpeur-freelance`, `/en/freelance-developer` | freelance developer Toulouse, custom business software, e-commerce |
| Consulting | `/consultant-full-stack`, `/en/full-stack-consultant` | senior full stack consultant, tech lead, agentic engineering |
| Recruiters | `/recruteurs`, `/en/recruiters` | lead developer, software architect, agentic AI engineer |
| AI method | `/ingenierie-ia`, `/en/ai-engineering` | agentic engineering, AI-assisted development, vibe coding alternative |
| Projects | `/projets/[slug]`, `/en/projects/[slug]` | project title and key technologies |

Every landing has its own H1, title (≤ 60 chars), description (140–160 chars)
and section intros in `messages/*.json` under `landing.<id>`. Shared blocks
(companies, cards, AI method) live under `sections.*`.

The AI method has one canonical page (`/ingenierie-ia`). Landings only carry a
summary of it and link there, so the same content is never indexed twice.
Anchors (`#expertise`, `#ia`) stay for in-page navigation, never as a second
copy of a page that exists on its own.

## Editorial rules

1. No CV: no timeline, dates, employment type on projects, no résumé download
   ("CV sur demande" on the recruiters page only). No job titles either:
   seniority is shown through responsibilities ("je porte l'architecture, les
   conventions et la revue de code d'une équipe"), never through a label.
2. Organizations are named in one place only: the experience section
   (`data/companies.ts` — TotalEnergies, Direction générale de l'Armement,
   Thales, Airbus, Thales Alenia Space, ANITI, Sopra Steria, FPT Software),
   with their sector and a link to their official site. No mission details.
3. Projects name no client, show no sector and no client type: a case study
   describes the work, not who paid for it. Allowed context: "une PME de
   distribution et de services", "un grand groupe industriel". For the large
   group case study, the replaced vendor, internal system names, business
   vocabulary, data volumes, countries and security classification must never
   appear.
4. No site-wide figures, and no links between projects. Aggregated counts and
   cross-references both made the site read as a single-client portfolio;
   figures live inside a case study, where their scope is explicit.
5. Facts only, rounded down; never claim tests where there are none (ERP,
   workshop apps); the POS module is an open-source module taken over,
   migrated and extended; no "PWA".
6. Confident, concrete tone; each expertise claim backed by a figure,
   mechanism or project. French typography uses non-breaking spaces before
   `: ; ? !`.
7. Density caps, enforced when writing copy: hero pitch one or two short
   sentences; section intro one line; project `summary` 160 characters,
   `context` two sentences, `role` one sentence, `solution` two paragraphs,
   `highlights` and `engineering` four items of one sentence each.

Verification (must return nothing):

```sh
grep -riE "forestar|reparobot|@forestar|\.be\b|belg|valkenpower|pressol|granit|navblue|adagos" messages data src
grep -rniE "\btalus\b|exploration archives|\btusi\b|datagate|myseismic|projetsthales|p(é|e)taoctet|petabyte" messages data src
```

## Framing AI for non-technical clients

Large groups and recruiters know what agentic engineering costs and buys. A
small business may hear "AI" and conclude either that the work is trivial (why
not do it themselves with an AI app builder) or that the code is not owned by
anyone. So, on the home and freelance pages:

- engineering outcomes lead, AI is presented as *how I work*, never as the
  offer;
- the AI section is a short summary, placed after the process, and says
  explicitly that AI does not design and decides nothing;
- the objection is answered head-on, in the freelance FAQ and in the `noCode`
  block of `/ingenierie-ia`: prototype vs. production, integrations, data
  migration, GDPR, ownership of standard code that any developer can pick up.

## Adding a project

1. Create `data/projects/<french-slug>.ts` exporting an object that
   `satisfies Project` (FR and EN for every localized field; `metrics` may be
   empty and is then hidden; add `cover` only when an image exists in
   `public/projects/<slug>/`).
2. Register it in `data/projects/index.ts`; set `order`, `featured`,
   `categories`, `icon` (extend `ProjectIcon` and `project-icons.ts` if needed)
   and `related` slugs (unknown slugs fail the build).
3. To feature it on a landing, edit `featuredProjects` in
   `src/content/landings.ts`.
4. Run both anonymization greps, `npm run lint` and `npm run build`.
