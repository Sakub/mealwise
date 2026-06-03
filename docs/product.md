# Mealwise Product Reference

This document is source-of-truth context for product scope, positioning, UX flows, culinary behavior, roadmap, and open product decisions.

---

## Overview

Mealwise is an AI meal planner with preference memory and meal history. Chat is the way users control the app, but the output should be structured meal plans, editable meal cards, persistent preferences, and history.

The product starts as a private PWA for 1-2 people and should be easy to access from a phone. It may later become a native mobile app and a broader product.

### Product / Business Context

- Project type: mobile-first PWA, currently in mockup phase.
- Target users: project owner first, optionally a partner / second person.
- Main outcome: natural-language meal planning that produces concrete structured plans and saves useful food context.
- Language: English UI/copy for now.
- Primary viewport: iPhone/mobile-first.

### Tone / Copy

- Direct, practical, calm, and food-focused.
- Friendly without becoming childish.
- Avoid generic SaaS copy, food delivery marketplace framing, and bro-fitness language.
- Prefer culinary clarity over pseudo-fitness claims.
- Do not imply mock data is live, connected, or production-backed.

---

## Product Positioning

Mealwise is not:

- a regular calorie tracker,
- a meal-box diet service,
- a recipe database,
- a Fitatu clone,
- a simple recipe list,
- ChatGPT inside a different UI.

Mealwise is:

- an AI meal planner with preference memory and meal history.

Core advantage:

- the user does not need to click through many filters,
- the user can say naturally what they want,
- the app translates the request into a concrete plan.

Do not create a pure ChatGPT clone. The target model is:

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

---

## Product Scope

### Mocked Work

| Item | Status | Notes |
|---|---|---|
| Onboarding | Mocked | Standalone vanilla HTML/CSS/JS in `_mockups/mockup.html`. |
| Home screen | Mocked inside onboarding flow | Includes natural-language prompt and quick actions. |
| Product context | Defined | Source-of-truth docs live in `AGENTS.md` and `docs/`. |
| Production app | Not started | Planned stack is Angular PWA + Nest.js API + PostgreSQL + Prisma. |

### MVP Scope

The MVP should include:

- AI meal planning inside the app,
- email magic-code login,
- email allowlist,
- disliked ingredients,
- liked cuisines / preferences,
- basic dietary goals,
- meal history,
- manual meal entry with kcal and macros,
- endpoint that generates current context for ChatGPT or another assistant,
- PWA that works comfortably on iPhone,
- deployment to a VPS.

AI is part of the MVP. MCP / ChatGPT integration is not part of the MVP, but backend-to-model communication is.

### Do Not Build In v0

Do not build these at the start:

- Apple Sign In,
- Google Sign In,
- native app,
- product scanning,
- meal photos,
- automatic AI calorie counting,
- advanced weekly planning,
- MCP,
- push notifications,
- payments,
- multi-tenancy,
- public registration.

### Planned Screens / Features

1. Onboarding: quick preference capture.
2. Home / new plan: prompt field and quick actions.
3. Structured generated meal plan: assumptions, meal cards, totals, revision actions.
4. Plan history: saved plans and meals.
5. Preferences: disliked ingredients, cuisines, dietary goals, cooking style, fitness substitution tolerance.
6. Profile/account: minimal private-app account controls.

### Product Rules

- Chat controls the app; structured meal plans are the output.
- If minor details are missing, make reasonable assumptions and let the user correct them.
- Ask clarifying questions only when missing information could send the plan in a clearly wrong direction.
- Do not regenerate the whole plan if the user asks to change one meal.
- Preserve unchanged meals during revisions unless the user asks otherwise.
- If the user explicitly says "I do not like X", save it as a preference candidate automatically.
- If the user says "X does not fit here", treat it as contextual and ask whether to remember it globally.
- Onboarding must be skippable or partially completable.
- The app should still work when profile data is sparse and refine preferences during later conversations.

---

## Onboarding Rules

Onboarding starts with private-app identity capture, then collects the data that most affects plan quality.

Identity capture:

- email address,
- mock magic-code step in mockups only, with no real email sending or verification,
- display name for greetings and profile summaries.

Preference capture should take about 30-60 seconds.

Collect:

- disliked ingredients, using chips/pills plus custom input,
- whether the user watches calories,
- daily kcal target if the user has a specific goal,
- cooking level,
- tolerance for fitness substitutions,
- eating style,
- additional notes for the agent.

Calorie options:

- specific goal,
- roughly,
- not really.

Cooking level options:

- simple recipes,
- normal cooking,
- ambitious cooking.

Fitness substitution tolerance:

- avoid weird substitutions,
- light optimizations are fine,
- strong fitness versions are fine.

Eating style examples:

- normal food,
- lightly fit,
- high protein,
- comfort food,
- quick meals,
- varied cuisine.

Additional notes examples:

- "I do not like overly sweet breakfasts."
- "On weekdays I prefer quick lunches."
- "I like Asian and Italian cuisine."
- "I do not want to eat chicken every day."

---

## Home / Planning UX

Home should encourage natural planning.

Default prompt direction:

```text
What do you want to eat today?
```

Quick actions:

- Plan today,
- Lunch idea,
- Something quick,
- Cheat day,
- Asian food,
- Something from what I have in the fridge.

In mockups, tapping a quick action or the prompt send button should move through a short planning state into a generated plan screen.

Generated-plan mockups should support a Today / 3-meal Asian plan and a 3-day / 3-meals-per-day plan. Multi-day plans use day-plan carousel tiles with badges and compact meal previews so one day's meals, totals, assumptions, revision chips, and follow-up input stay focused on mobile.

Generated meal cards should start collapsed, expand/collapse smoothly on tap, and show distinct details and ingredients sections. Ingredient lists should read like recipe quantities, not tags.

Generated plan screens should keep quick revision chips and the follow-up input visibly available near the bottom of the screen so the user understands they can keep refining the plan.

Submitting the follow-up input in mockups should show a short updating state, return to the plan, scroll toward the affected meal, and mark it with a small revised badge.

When a plan exists, Home should show a compact today's-plan module above quick actions. For multi-day plans, Home shows today's slice and opening the module returns to the full generated plan.

Primary navigation:

- Plans,
- History,
- Preferences,
- Profile.

Example user prompt:

```text
Give me 3 meals: breakfast, lunch, and dinner.
I feel like Asian food.
Today is a cheat day and I am not watching calories.
```

Expected app response should include:

- short interpretation of assumptions,
- meal cards,
- approximate kcal/macros when relevant,
- summary,
- edit and save options.

Example assumptions:

```text
I am assuming:
- Asian cuisine,
- 3 meals,
- no calorie target today,
- more taste than cutting,
- avoiding: olives, tofu, offal.
```

For cuisine ambiguity, prefer assuming and offering correction:

```text
I made a Korea/Japan/China mix. You can reply "more Korean", "not spicy", or "more street food".
```

---

## Culinary Assistant Behavior

The app should become a data source for a culinary and diet assistant that follows these rules:

- Daily intake for a light cut is around 2200 kcal per person when relevant.
- Most meals are prepared for 2 people unless stated otherwise.
- Meals are divided into breakfast, lunch, snack, and dinner.
- Calories do not need to be split perfectly between meals.
- A sensible daily total matters more.
- Macros are approximate.
- Prefer filling meals with more protein and a reasonable amount of fat.
- Use diverse cuisines: Polish, Italian, Asian, and others.
- Not every recipe should be explicitly fitness-oriented.
- Sometimes quick meals, sometimes more ambitious cooking.
- Assume the user knows how to cook.
- Known dislikes in seed context: olives, probably tofu, offal.
- New preferences should be added to the app as the source of truth.

Fitness version rules:

- Do not suggest extreme or artificial substitutes only to reduce calories.
- Substitutes should preserve a similar taste, texture, and culinary use.
- Prefer reasonable optimizations: less fat, lighter product, less oil, better proportions.
- Do not pretend that a completely different product is the same thing.
- Do not force pseudo-fitness versions of classic dishes if the result would be weak.
- If the classic version makes more culinary sense, say so directly.

Recipe response format, when needed:

- ingredient list with raw weights,
- short preparation steps,
- approximate kcal and macros per serving,
- useful modifications or additions if relevant.

---

## Roadmap

### v0 - Private PWA

- Angular PWA.
- Nest.js API.
- PostgreSQL.
- Prisma.
- Magic code.
- Email allowlist.
- JWT access token.
- HttpOnly refresh token.
- Preference list.
- Meal history.
- `/context` endpoint.
- VPS deployment.
- Database backups.

### v1 - More Convenient PWA

- Invite codes.
- User profiles.
- Calorie / macro goal editing.
- Meal-history filtering.
- Data export/import.
- Weekly dashboard.
- Simple calorie and protein chart.

### v2 - AI / Integrations

- Meal parser from text.
- Generate history entries from descriptions.
- Update preferences from conversations.
- ChatGPT / MCP-oriented endpoints.
- Possible tools: `get_food_preferences`, `add_disliked_ingredient`, `remove_disliked_ingredient`, `add_meal_entry`, `get_recent_meals`, `get_chatgpt_context`.

### v3 - Native App

- Same backend.
- Magic code still works.
- Refresh token in Keychain / Keystore.
- Optional Apple Sign In.
- Push notifications.
- App Store.
- Possible payments if the project grows.

---

## Key Decisions

1. Do not treat ChatGPT Projects or markdown files as automatically updated sources of truth.
2. The source of truth for real product data is the app database.
3. The source of truth for agent sessions is `AGENTS.md` plus linked docs in `docs/`.
4. PWA is the first client; native app can come later.
5. Auth starts with email magic code and allowlisted users.
6. Access token is a short-lived JWT.
7. Refresh token is opaque, HttpOnly-cookie stored, rotated, and hashed in the DB.
8. User account is separated from login method through `AuthIdentity`.
9. Frontend and backend should ideally be hosted under one origin.
10. `/context` generates current markdown for ChatGPT / AI assistant from DB state.
11. AI meal generation is core MVP functionality, not a later add-on.

---

## Open Decisions

- Angular Material or Tailwind or custom components?
- Resend or Brevo?
- Backend serves static Angular build, or Caddy serves frontend separately?
- Should meal history have change versioning?
- Are preferences global per user or shared by household / group?
- Should the second person have separate calorie goals and history?
- Should `/context` contain only preferences, or also recent meals and statistics?
- Exact production domain.
