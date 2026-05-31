# AGENTS.md - Mealwise

Read this file before touching any project file. This file is the source-of-truth index for agent sessions and points to the detailed product, design, and implementation references in `docs/`.

Keep this file durable, terse, imperative, and actionable. Update it in the same session when project phase, scope, design rules, architecture, conventions, commands, or review scope change.

When editing this file or linked source-of-truth docs:

- Write future-facing current truth.
- Do not use changelog or session-note language.
- Keep historical wording only when future agents need it to act correctly.
- Keep repository-state tables focused on each path's current purpose.

---

## First Actions

1. Read this file before editing.
2. Run `git status --short` and avoid reverting user work.
3. Identify whether the task is mockup work, product/design planning, implementation work, or review.
4. Read the task-specific references listed below.
5. Update this file or the linked docs before finishing when the task changes durable rules or decisions.

---

## Task Routing

| Task | Read |
|---|---|
| Mockups, standalone HTML, design exploration | This file, `docs/product.md`, `docs/design-system.md` |
| Product scope, roadmap, UX flows, copy direction | This file, `docs/product.md` |
| Real app implementation, architecture, auth, API, data model | This file, `docs/technical-plan.md` |
| Reviews during mockup phase | This file, `docs/product.md`, `docs/design-system.md` |

If a new task-specific context file becomes useful, add it to this table and keep this file as the routing index.

---

## Repository State

**Project phase:** mockup / product definition

| Path | Purpose |
|---|---|
| `AGENTS.md` | Agent routing, active rules, repository state, and review scope. |
| `docs/product.md` | Product positioning, scope, onboarding, planning UX, culinary assistant behavior, roadmap, and open product decisions. |
| `docs/design-system.md` | Visual direction, tokens, typography, layout, components, and mockup design constraints. |
| `docs/technical-plan.md` | Future implementation stack, auth/security, AI flow, API direction, and data-model direction. |
| `_mockups/mockup.html` | Active standalone onboarding mockup. Open directly in a browser. |
| `_ideas/` | Ignored visual references and historical input. Do not treat this folder as source of truth. |

No production framework exists. Current work is standalone HTML mockup work plus product and technical planning for a later PWA implementation.

---

## Product Summary

Mealwise is an AI meal planner with preference memory and meal history.

The product model is:

```text
chat as the decision interface
+
MealPlan as a data object
+
meal cards as the main output
+
user preferences as a persistent profile
```

Target flow:

```text
text -> structured plan -> editable cards -> save -> history/calendar/export
```

Mealwise is not a generic chatbot UI, calorie tracker clone, recipe database, food delivery UI, or meal-box service.

Core product details live in `docs/product.md`.

---

## Active Mockup Rules

- Mockups live in `_mockups/`.
- Keep `_mockups/mockup.html` as the active onboarding mockup unless the user asks for variants or renaming.
- Use standalone `.html` files that open directly in a browser.
- Keep HTML, CSS, and JS in the same file using `<style>` and `<script>`.
- Use vanilla JS only.
- Do not use React, Vue, Angular, Svelte, Babel, JSX, TypeScript build steps, npm packages, or framework CDNs in mockups unless the user explicitly asks.
- Use JS only for UI interactions: navigation, simple state, chips, segmented controls, modals/sheets, accordions, carousels, and preview states.
- Do not add real authentication, API calls, database logic, data fetching, payment flows, analytics, file uploads, backend integration, or persistent production behavior to mockups.
- LocalStorage is acceptable only for lightweight mockup convenience. Do not imply it is production storage.
- Use realistic mock data and Mealwise-specific copy. Do not use lorem ipsum.
- Do not change client-provided copy without explicit user request.

### Mockup Verification

- Primary viewport: mobile/iPhone around 390px wide.
- Check no horizontal scroll, clean headline wrapping, no layout overflow, correct accent colors, readable contrast, and preserved copy.
- During mockup phase, do not start Chromium, Playwright, browser screenshots, or similar automated viewport testing unless the user explicitly asks.
- Manual or user-confirmed visual checks are the default.

---

## Design Summary

Mealwise should feel fresh, calm, food-focused, soft, tactile, and premium enough for daily use.

Use warm off-white / deep green surfaces with fresh green actions and small warm food accents. Green-led is correct; monochrome green is not.

Avoid neon fitness-app colors, flat gray dashboards, cart/checkout visual language, generic SaaS layouts, food delivery framing, and too much pure white on mobile.

Canonical design tokens and component rules live in `docs/design-system.md`.

---

## Implementation Summary

Production app work has not started.

Planned stack:

| Area | Choice |
|---|---|
| Frontend | Angular |
| Mobile/PWA | Angular PWA, installable on iPhone |
| Backend | Nest.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Email magic code, JWT access token, opaque refresh token |
| Refresh token storage | HttpOnly Secure SameSite cookie, hash in DB |
| Mail provider | Resend or Brevo |
| Deployment | VPS, Docker Compose, Caddy reverse proxy |

Model API keys must live only on the backend. The frontend must never receive an OpenAI or model-provider token.

Full implementation direction lives in `docs/technical-plan.md`.

---

## Review Scope

This project is in the mockup / product-definition phase.

Reviews should focus on:

- consistency with this file and linked docs,
- product correctness,
- mobile layout quality,
- design-system consistency,
- copy clarity,
- mockup simplicity,
- avoiding premature production complexity.

Out of scope during this phase unless the user asks:

- production hardening of mockups,
- CI/CD,
- SEO,
- automated browser testing,
- performance budgets,
- broad framework scaffolding,
- backend implementation.

Always flag real risks:

- hardcoded secrets,
- untrusted external scripts,
- live payment/auth/data submission introduced accidentally,
- data loss or destructive behavior,
- security/privacy risks in real implementation code.

Update this section when the project phase changes.

---

## Do Not Do

- Do not introduce production framework structure during mockup work.
- Do not make API calls or fetch external data from mockup JS.
- Do not add real auth, backend logic, analytics, or production persistence to mockups.
- Do not store access tokens in localStorage in the future real app.
- Do not expose model API keys to frontend code.
- Do not run a custom mail server for the MVP.
- Do not add debug artifacts such as `console.log`, temporary UI labels, or unused test controls before finishing.
- Do not commit, deploy, delete unrelated work, or run destructive commands unless explicitly requested.

---

## Setup / Commands

No production setup exists.

For current mockups:

- Open `_mockups/mockup.html` directly in a browser.
- Do not start a dev server unless the user asks.
- Do not run automated browser tests during mockup phase unless the user asks.

Add future implementation commands here when the Angular/Nest project is scaffolded.
