# Mealwise Technical Plan

This document is source-of-truth context for future implementation architecture, auth/security, AI flow, API direction, and data-model direction.

---

## Planned Stack

| Area | Choice |
|---|---|
| Frontend | Angular |
| Mobile/PWA | Angular PWA, installable on iPhone |
| Backend | Nest.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Email magic code, JWT access token, opaque refresh token |
| Refresh token storage | HttpOnly Secure SameSite cookie, hash in DB |
| Styling | SCSS with custom Mealwise design tokens |
| Mail provider | Undecided |
| Deployment | VPS, Docker Compose |
| Backups | `pg_dump` |

Preferred hosting layout:

```text
https://food.example.com        -> Angular PWA
https://food.example.com/api    -> Nest.js API
```

Keep frontend and backend on the same origin when possible to simplify cookies, CORS, and security.

---

## Architecture Direction

Mealwise should eventually use:

```text
Angular PWA
  -> Nest.js API
  -> PostgreSQL through Prisma
  -> model API from backend only
```

Model API keys must live only on the backend. The frontend must never receive an OpenAI or model-provider token.

---

## AI Planning Flow

```text
1. User enters a prompt.
2. Backend fetches the user's profile.
3. Backend sends prompt + profile + current plan/history to the model.
4. Model returns structured output JSON.
5. Backend validates the result.
6. Backend saves the plan or a draft.
7. Frontend renders the plan as cards.
8. User revises through chat or buttons.
9. Plan is saved to history / calendar.
```

Backend prompt for revisions must preserve unchanged meals:

```text
Revise the existing meal plan. Preserve unchanged meals unless the user asks otherwise.
```

The model should return structured JSON, not loose markdown.

Expected shape:

```json
{
  "title": "Asian cheat day",
  "dateRangeStart": "2026-06-03",
  "dateRangeEnd": "2026-06-03",
  "assumptions": [
    "A day without calorie tracking",
    "Asian cuisine with a Korea/Japan/China mix",
    "Avoiding olives, tofu, and offal"
  ],
  "days": [
    {
      "date": "2026-06-03",
      "label": "Today",
      "title": "Asian day plan",
      "summary": {
        "kcal": 2350,
        "protein": 124,
        "fat": 85,
        "carbs": 258
      },
      "meals": [
        {
          "type": "breakfast",
          "title": "Kimchi fried rice with egg",
          "description": "Fried rice with kimchi, egg, and scallions.",
          "kcal": 650,
          "protein": 24,
          "fat": 25,
          "carbs": 78
        }
      ]
    }
  ],
  "summary": {
    "kcal": 2350,
    "protein": 124,
    "fat": 85,
    "carbs": 258
  },
  "preferenceCandidates": [],
  "followUpQuestion": null
}
```

Single-day plans still use `days` with one entry. Multi-day plans add one entry per planned day and preserve the same meal shape inside each day.

---

## Conversation / Plan Distinction

Chat and MealPlan are not the same thing.

- Conversation stores messages and flow.
- MealPlan stores the current structured plan.
- MealPlanDay stores one planned day inside a multi-day plan.
- Meal stores one meal inside a plan day.

One conversation can have one or many plans. A plan can be a draft, saved plan, dated plan, or reusable template.

Future data models should anticipate dates:

- `MealPlan.date`,
- `MealPlan.dateRangeStart`,
- `MealPlan.dateRangeEnd`,
- `MealPlanDay.date`,
- `MealPlanDay.label`,
- `MealPlanDay.sortOrder`,
- `Meal.plannedForDate`,
- `Meal.mealType`.

---

## Auth / Security

Use:

```text
Email magic code
+
Access JWT
+
Refresh token in an HttpOnly Secure SameSite cookie
```

At the start:

- only allowlisted emails,
- no public registration.

Do not build Apple Sign In, Google Sign In, or email/password auth in v0.

### Token Rules

Access token:

- JWT,
- TTL 10-15 minutes,
- kept only in Angular application memory,
- sent as `Authorization: Bearer <token>`,
- contains minimal claims only.

Refresh token:

- opaque random token, not JWT,
- at least 32 bytes of entropy,
- TTL about 30 days,
- stored in an HttpOnly Secure SameSite cookie,
- stored in DB only as a hash,
- rotated on every refresh,
- revocable,
- logout-all supported.

Do not put preferences, meal history, large data, or unnecessary dynamic roles in JWT claims.

### Cookie Configuration

Production:

```ts
{
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/api/auth/refresh',
  maxAge: 1000 * 60 * 60 * 24 * 30
}
```

Local development:

```ts
{
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  path: '/api/auth/refresh',
  maxAge: 1000 * 60 * 60 * 24 * 30
}
```

If logout also needs the cookie, consider `Path=/api/auth` or a separate clearing strategy.

### Magic Code Rules

- 6-digit code.
- TTL: 10 minutes.
- Store only code hash.
- Maximum 5 attempts per code.
- Rate limit `request-code`, for example 3 sends / 15 minutes / email.
- Rate limit per IP.
- Return neutral responses to avoid account enumeration.

### Angular Auth Rules

- Access token only in application memory, for example signal or BehaviorSubject in `AuthService`.
- Avoid localStorage for access token.
- Refresh token is unavailable to Angular.
- On app startup after reload, call `POST /auth/refresh`.
- HTTP interceptor adds bearer access token.
- On `401`, try refresh, store new access token in memory, and retry original request.
- Queue refresh requests so multiple parallel `401` responses do not trigger multiple refresh calls.

### Frontend Security

- No inline scripts in production implementation.
- Add CSP later.
- Watch for XSS.
- Never expose model-provider API keys to the frontend.

---

## API Endpoints

### Auth

```text
POST /auth/request-code
POST /auth/verify-code
POST /auth/refresh
POST /auth/logout
POST /auth/logout-all
GET  /auth/me
```

### Preferences

```text
GET    /preferences
POST   /preferences
PATCH  /preferences/:id
DELETE /preferences/:id
```

Example disliked ingredient:

```json
{
  "type": "disliked",
  "name": "celery",
  "severity": "dislike",
  "notes": "Do not suggest it as a main ingredient."
}
```

### Meals

```text
GET    /meals
POST   /meals
GET    /meals/:id
PATCH  /meals/:id
DELETE /meals/:id
```

Example:

```json
{
  "date": "2026-05-21",
  "mealType": "lunch",
  "title": "Chicken pesto pasta",
  "kcal": 720,
  "protein": 45,
  "fat": 25,
  "carbs": 78,
  "notes": "The portion is filling; use less pesto next time.",
  "ingredientsJson": [
    { "name": "pasta", "amount": 100, "unit": "g" },
    { "name": "chicken breast", "amount": 180, "unit": "g" }
  ]
}
```

### ChatGPT / Assistant Context

```text
GET /context
```

Returns markdown with current preference context for ChatGPT or another assistant. `/context` should be generated from the app database, not manually maintained markdown.

---

## Data Model Direction

Use Prisma unless this decision is explicitly revisited.

### Core Models

`User`

- `id`
- `email`
- `displayName`
- timestamps
- relations to identities, sessions, login codes, preferences, meals

`AuthIdentity`

- separates user account from login provider,
- today: `email_magic_code`,
- later: `apple`, `google`, `passkey`,
- unique by provider and provider user ID.

`LoginCode`

- email,
- code hash,
- attempts,
- expiry,
- consumed timestamp,
- optional user relation.

`Session`

- user ID,
- refresh token hash,
- user agent,
- IP hash,
- expiry,
- revoked timestamp,
- rotated timestamp.

`FoodPreference`

- user ID,
- type,
- name,
- severity,
- notes,
- timestamps.

Preference `type` examples:

```text
disliked
liked
limit
rule
cuisine
```

Preference `severity` examples:

```text
avoid
dislike
limit
```

`MealPlan`

- user ID,
- title,
- prompt text,
- status: draft, saved, archived,
- date or date range,
- assumptions JSON,
- summary kcal and macros,
- preference candidates JSON,
- timestamps.

`MealPlanDay`

- meal plan ID,
- date,
- label,
- title,
- sort order,
- summary kcal and macros,
- timestamps.

Generated plans should use one `MealPlanDay` for single-day plans and multiple `MealPlanDay` records for multi-day plans.

`MealEntry`

- user ID,
- optional meal plan day ID,
- date,
- meal type,
- title,
- ingredients JSON,
- kcal,
- protein,
- fat,
- carbs,
- notes,
- timestamps.

Meal type values:

```text
breakfast
lunch
snack
dinner
```

---

## Mail Provider

Magic-code login requires email sending.

Do not run a custom mail server in the MVP. Avoid Mailu, mailcow, Postal, custom Postfix, and managing IP reputation.

Use an API provider. The specific provider is undecided.
