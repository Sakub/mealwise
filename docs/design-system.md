# Mealwise Design System

This document is source-of-truth context for visual direction, tokens, typography, spacing, component patterns, and mockup design constraints.

---

## Visual Direction

- Mealwise should feel fresh, calm, food-focused, soft, tactile, and premium enough for daily use.
- Use warm off-white / deep green surfaces with fresh green actions and small warm food accents.
- Mealwise uses a light theme for now.
- The app should feel like an AI meal planner, not food delivery, checkout, marketplace, or generic admin software.
- Green-led is correct; monochrome green is not.
- Avoid neon fitness-app colors, flat gray dashboards, cart/checkout visual language, and too much pure white on mobile.

---

## Color Palette

Use these canonical light-theme tokens for future app work. Mockups may use smaller local aliases if they map clearly to these roles.

| Token | Hex | Usage |
|---|---:|---|
| `--color-bg` | `#EEF2EC` | App outside/background tint |
| `--color-surface` | `#FFFDF8` | Main phone/app surface |
| `--color-surface-soft` | `#F7F5EF` | Secondary panels, inactive chips |
| `--color-card` | `#F8F5EE` | Meal cards |
| `--color-card-raised` | `#FFFDF8` | Raised cards, sheets, modals |
| `--color-primary` | `#0F8F57` | Main action green |
| `--color-primary-strong` | `#063B2E` | Dark green bars, active nav, strong contrast |
| `--color-primary-soft` | `#DDF2E7` | Selected chip backgrounds, subtle highlights |
| `--color-accent-warm` | `#F4A62A` | Calories, warmth, occasional food accent |
| `--color-accent-red` | `#D94A3A` | Warnings, disliked ingredient markers |
| `--color-danger-soft` | `#FFF6F4` | Soft destructive action backgrounds |
| `--color-danger-border` | `#F1D6D1` | Destructive action borders |
| `--color-accent-mint` | `#6ED3A5` | Success, freshness, positive nutrition cues |
| `--color-text` | `#171C19` | Primary text |
| `--color-text-muted` | `#686F6A` | Secondary text |
| `--color-text-soft` | `#929991` | Placeholder text, metadata |
| `--color-text-on-primary` | `#FFFFFF` | Text on green buttons |
| `--color-border` | `#E7E2D8` | Card borders, separators |

---

## Typography

| Role | Font / style | Usage |
|---|---|---|
| Headings | Plus Jakarta Sans, medium with bold emphasis | Onboarding and mobile app headings. |
| Body/UI | Plus Jakarta Sans or system sans | Mobile UI text, labels, controls. |
| Optional editorial accent | Newsreader | Only if a future screen intentionally needs a warmer editorial note. |

Do not use viewport-scaled font sizes. Keep letter spacing at `0` or modest positive values for labels.

---

## Radius / Layout Tokens

| Token | Value | Usage |
|---|---:|---|
| `--radius-xs` | `8px` | Small chips, compact badges |
| `--radius-sm` | `14px` | Inputs, small buttons |
| `--radius-md` | `20px` | Meal cards, prompt panels |
| `--radius-lg` | `28px` | Bottom sheets, large panels |
| `--radius-xl` | `36px` | App shell / hero mobile surface |
| `--radius-pill` | `999px` | Pills, primary buttons, avatar buttons |

Use generous mobile padding and stable fixed-format controls. Check 390px-wide mobile layouts first.

---

## Shadows

Use shadows sparingly. The app should feel soft and layered, not floaty.

| Token | Value | Usage |
|---|---|---|
| `--shadow-soft` | `0 12px 30px rgba(20, 33, 26, 0.08)` | Cards |
| `--shadow-panel` | `0 18px 45px rgba(20, 33, 26, 0.12)` | Sheets and major panels |

---

## Component Patterns

- Primary buttons: green, high contrast, at least 48px tall on mobile.
- Chips: soft inactive state; selected state uses primary green with white text.
- Meal cards: card backgrounds, generous radii, structured nutrition metadata, no price-style typography.
- Bottom navigation: deep green or warm light surface depending on screen; active state must be obvious.
- Prompt input: rounded composer with compact green send action.
- Forms: use segmented controls for mutually exclusive options, chips for multi-select preferences, steppers/sliders/inputs for numeric targets.
- Icons: use icons for clarity, especially actions and nav; do not overdecorate.

Visual ratio for most screens:

```text
70% warm off-white / deep green surfaces
20% fresh green actions and active states
10% warm food accents and semantic colors
```

---

## Avoid Generic Model Output

- Do not repeat the same visual pattern across adjacent screens unless it is an intentional system pattern.
- Do not default to generic cards, icon circles, pill badges, gradients, glow dots, decorative blobs, or template-like filler.
- Prefer project-specific hierarchy, copy, data, and layout.
- Do not make the UI look like food delivery, ecommerce, or a calorie tracker clone.
