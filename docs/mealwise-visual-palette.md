# Mealwise Visual Palette

This palette is based on the overall vibe of `design-idea-1`: soft food-app warmth, rounded mobile surfaces, deep green accents, creamy cards, and a polished but calm interface. The content should still feel like an AI meal planner, not a food delivery app.

## Design Direction

Mealwise should feel:

- fresh, calm, and food-focused,
- soft and tactile, with generous radii,
- premium enough for daily use,
- green-led, but not monochrome,
- friendly without becoming childish.

Avoid:

- cart / checkout styling,
- heavy marketplace visuals,
- neon fitness-app colors,
- flat gray admin-dashboard styling,
- too much pure white on mobile.

---

## Light Mode

### Core Colors

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
| `--color-accent-mint` | `#6ED3A5` | Success, freshness, positive nutrition cues |

### Text Colors

| Token | Hex | Usage |
|---|---:|---|
| `--color-text` | `#171C19` | Primary text |
| `--color-text-muted` | `#686F6A` | Secondary text |
| `--color-text-soft` | `#929991` | Placeholder text, metadata |
| `--color-text-on-primary` | `#FFFFFF` | Text on green buttons |
| `--color-border` | `#E7E2D8` | Card borders, separators |

### Light Mode CSS Variables

```css
:root {
  --color-bg: #eef2ec;
  --color-surface: #fffdf8;
  --color-surface-soft: #f7f5ef;
  --color-card: #f8f5ee;
  --color-card-raised: #fffdf8;

  --color-primary: #0f8f57;
  --color-primary-strong: #063b2e;
  --color-primary-soft: #ddf2e7;

  --color-accent-warm: #f4a62a;
  --color-accent-red: #d94a3a;
  --color-accent-mint: #6ed3a5;

  --color-text: #171c19;
  --color-text-muted: #686f6a;
  --color-text-soft: #929991;
  --color-text-on-primary: #ffffff;
  --color-border: #e7e2d8;
}
```

---

## Dark Mode

Dark mode should preserve the same soft food-app character, not turn into a generic black dashboard. Use deep green-black surfaces with warm off-white text and slightly brighter greens for active elements.

### Core Colors

| Token | Hex | Usage |
|---|---:|---|
| `--color-bg` | `#07130F` | App outside/background |
| `--color-surface` | `#0D1E18` | Main app surface |
| `--color-surface-soft` | `#132920` | Secondary panels, inactive chips |
| `--color-card` | `#173126` | Meal cards |
| `--color-card-raised` | `#1C3A2D` | Raised cards, sheets, modals |
| `--color-primary` | `#23B873` | Main action green |
| `--color-primary-strong` | `#062D24` | Deep bottom bars / nav |
| `--color-primary-soft` | `#194C38` | Selected chip backgrounds |
| `--color-accent-warm` | `#F5B84D` | Calories, warmth, occasional food accent |
| `--color-accent-red` | `#F06B5D` | Warnings, disliked ingredient markers |
| `--color-accent-mint` | `#7BE0B1` | Success, freshness, positive nutrition cues |

### Text Colors

| Token | Hex | Usage |
|---|---:|---|
| `--color-text` | `#F7F3EA` | Primary text |
| `--color-text-muted` | `#BBC7BE` | Secondary text |
| `--color-text-soft` | `#7F9188` | Placeholder text, metadata |
| `--color-text-on-primary` | `#FFFFFF` | Text on green buttons |
| `--color-border` | `#284439` | Card borders, separators |

### Dark Mode CSS Variables

```css
[data-theme="dark"] {
  --color-bg: #07130f;
  --color-surface: #0d1e18;
  --color-surface-soft: #132920;
  --color-card: #173126;
  --color-card-raised: #1c3a2d;

  --color-primary: #23b873;
  --color-primary-strong: #062d24;
  --color-primary-soft: #194c38;

  --color-accent-warm: #f5b84d;
  --color-accent-red: #f06b5d;
  --color-accent-mint: #7be0b1;

  --color-text: #f7f3ea;
  --color-text-muted: #bbc7be;
  --color-text-soft: #7f9188;
  --color-text-on-primary: #ffffff;
  --color-border: #284439;
}
```

---

## Radius Tokens

The design should use large, soft radii like design-idea-1, but controls still need stable geometry.

| Token | Value | Usage |
|---|---:|---|
| `--radius-xs` | `8px` | Small chips, compact badges |
| `--radius-sm` | `14px` | Inputs, small buttons |
| `--radius-md` | `20px` | Meal cards, prompt panels |
| `--radius-lg` | `28px` | Bottom sheets, large panels |
| `--radius-xl` | `36px` | App shell / hero mobile surface |
| `--radius-pill` | `999px` | Pills, primary buttons, avatar buttons |

```css
:root {
  --radius-xs: 8px;
  --radius-sm: 14px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --radius-xl: 36px;
  --radius-pill: 999px;
}
```

---

## Shadows

Use shadows sparingly. The app should feel soft and layered, not floaty.

| Token | Value | Usage |
|---|---|---|
| `--shadow-soft` | `0 12px 30px rgba(20, 33, 26, 0.08)` | Cards in light mode |
| `--shadow-panel` | `0 18px 45px rgba(20, 33, 26, 0.12)` | Sheets and major panels |
| `--shadow-dark-soft` | `0 16px 36px rgba(0, 0, 0, 0.32)` | Cards in dark mode |
| `--shadow-dark-panel` | `0 22px 50px rgba(0, 0, 0, 0.42)` | Sheets and major panels in dark mode |

---

## Component Notes

### Primary Buttons

- Use `--color-primary`.
- Shape: `--radius-pill`.
- Text: `--color-text-on-primary`.
- Minimum height: `48px` on mobile.

### Chips

- Default: `--color-surface-soft` with muted text.
- Selected: `--color-primary` with white text.
- Shape: `--radius-pill`.

### Meal Cards

- Background: `--color-card`.
- Radius: `--radius-lg` for image-led cards, `--radius-md` for denser cards.
- Use food imagery generously, but do not make cards look like shop products.
- Avoid price-style typography.

### Bottom Navigation

- Background: `--color-primary-strong`.
- Active item: `--color-primary` or white icon inside a green circular button.
- Inactive items: muted warm gray / green-gray.

### Prompt Input

- Background: `--color-card-raised`.
- Radius: `--radius-pill` for a single-line prompt.
- Radius: `--radius-md` for a larger composer.
- Primary action should be an icon button or compact green submit button.

---

## Recommended Visual Ratio

For most screens:

```text
70% warm off-white / deep green surfaces
20% fresh green actions and active states
10% warm food accents and semantic colors
```

This keeps the design close to the reference image while avoiding a one-color green UI.
