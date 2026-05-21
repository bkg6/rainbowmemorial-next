# Rainbow Memorial — Design System

Source-of-truth reference for designers, engineers, and agents working on
the product. Every value here is extracted from the codebase. File paths
are cited inline. When a section is empty, it says so — nothing is
invented.

Repo root for all paths below: `pawsmemorial-next/` (the Next.js 14 App
Router project that ships to production).

---

## 1. Product context

Rainbow Memorial is a Next.js 14 product at `rainbow.memorial`. A
grieving US pet owner uploads one photo, enters a name and a date, and
gets a rendered tribute image they can post to Instagram Stories — plus
a permanent memorial page at `/m/[slug]` with a guestbook and candle
counter. Single payment of $24.99, no subscription, no account.

The emotional register is **wounded counselor** — the voice of Marty
Tousley (40 years writing about pet loss), not a brand. The product must
never feel **corporate, performative, or dark-pattern**. No urgency, no
social-proof counters, no exit popups, no "fur baby" cuteness, no
purple. The defining test: would a person who lost their dog this
morning feel like the page is *with* them, or *selling at* them?

---

## 2. Color system

### 2.1 Token definitions

All CSS variables are defined in [`app/globals.css`](app/globals.css)
under `:root`. They are exposed to Tailwind via the `colors` block in
[`tailwind.config.ts`](tailwind.config.ts).

#### Surfaces

| CSS variable | Hex | Tailwind class | Role |
|---|---|---|---|
| `--color-background` | `#FAF6EF` | `bg-background` | Soft Cream — default page background |
| `--color-background-alt` | `#F4EEE4` | `bg-background-alt` | Warm Sand — alternating sections, bottom-CTA strip |
| `--color-surface` | `#FFFFFF` | `bg-surface` | Cards, inputs, the memorial render frame |

#### Text

| CSS variable | Hex | Tailwind class | Role |
|---|---|---|---|
| `--color-text-primary` | `#2A1F18` | `text-text-primary` | Deep Cocoa — body text, headlines |
| `--color-text-secondary` | `#7A6A5C` | `text-text-secondary` | Warm Stone — supporting copy, labels |
| `--color-text-tertiary` | `#A89B8B` | `text-text-tertiary` | Light Stone — captions, placeholders, eyebrow labels |

#### Accents

| CSS variable | Hex | Tailwind class | Role |
|---|---|---|---|
| `--color-accent-primary` | `#C97B63` | `text-accent-primary` / `bg-accent-primary` | Warm Terracotta — primary CTA, links, focus border |
| `--color-accent-primary-hover` | `#B86850` | `hover:bg-accent-primary-hover` | Primary button hover |
| `--color-accent-primary-light` | `#FAE8E1` | `bg-accent-primary-light` | Secondary button hover bg |
| `--color-accent-secondary` | `#9DB89F` | `bg-accent-secondary` | Meadow Sage — defined but no current usage found in pages read |
| `--color-accent-secondary-light` | `#EAF1EB` | `bg-accent-secondary-light` | Same — defined, no usage found |
| `--color-accent-warmth` | `#D4A574` | `text-accent-warmth` | Honey Gold — used sparingly: featured-card border, upload icon |
| `--color-accent-warmth-light` | `#FBF2E5` | `bg-accent-warmth-light` | Featured Card background tint |
| `--color-accent-soft` | `#E8C4B8` | `bg-accent-soft` | Faded Petal — sleeping cat illustration fill |

#### Structural

| CSS variable | Hex | Tailwind class | Role |
|---|---|---|---|
| `--color-border` | `#EDE3D5` | `border-border` | Default 1px / 1.5px border |
| `--color-border-focus` | `#C97B63` | `focus:border-border-focus` | Input focus ring (same as accent-primary by design) |
| `--color-error` | `#C8786E` | `text-error` | Muted terracotta — error labels only |
| `--color-error-light` | `#FCE9E5` | `bg-error-light` | Defined, no current usage found in pages read |

### 2.2 Usage rules

**Primary CTA**
- Filled button: `bg-[--color-accent-primary]` + `text-white`
- Hover: `bg-[--color-accent-primary-hover]`
- Disabled: `bg-[#E4B5A5]` (hardcoded — see anti-patterns)
- Example: [`components/ui/button.tsx:17`](components/ui/button.tsx)

**Secondary CTA**
- Outline: `border-[1.5px] border-[--color-accent-primary]` + `text-[--color-accent-primary]`
- Hover: `bg-[--color-accent-primary-light]`

**Body text**
- Primary `#2A1F18` for headlines and the main message of any block
- Secondary `#7A6A5C` for supporting prose
- Tertiary `#A89B8B` for eyebrow labels (`Memorials`, `Born`, `Died`),
  microcopy, placeholders, counter text

**Backgrounds**
- Page default: `--color-background`
- Section alternation: switch to `--color-background-alt` to separate
  bottom-CTA strips or sign-off sections from primary content
- The dark-finale CTA block on the homepage uses `#2A1F18` (text-primary
  hex used as a background) — see
  [`app/page.tsx:337`](app/page.tsx). This is the only place a dark
  background appears.

**Links inside long-form prose** (Rainbow Bridge articles)
- `color: var(--color-accent-primary)` + `underline underline-offset-4 hover:no-underline`
- Example: [`app/rainbow-bridge/page.tsx:371`](app/rainbow-bridge/page.tsx)

### 2.3 Hardcoded grey values

These appear inline in components and are **not** part of the token
system. Documented because they exist; treat them as candidates for
cleanup, not as new tokens to repeat.

| Hex | Where | Likely intent |
|---|---|---|
| `#2A2A2A` | Paw print logo color in nav & memorial header — [`app/page.tsx:183`](app/page.tsx), [`app/m/[slug]/memorial-client.tsx:211`](app/m/[slug]/memorial-client.tsx), phone frame on email mockup — [`app/page.tsx:116`](app/page.tsx) | Near-black for icon contrast |
| `#5A5A5A` | Hero product preview card dates — [`app/homepage-hero.tsx:71`](app/homepage-hero.tsx) | Mid-grey for date subtitle |
| `#888888` | Hero preview tribute italic, "Free preview — no signup needed" microcopy — [`app/homepage-hero.tsx:36`](app/homepage-hero.tsx), checkout footnote — [`app/create/page.tsx:986`](app/create/page.tsx) | Quiet grey for footnote |
| `#E4B5A5` | Disabled primary button background — [`components/ui/button.tsx:17`](components/ui/button.tsx) | Washed-out terracotta |
| `#D4C9BD` | Classic-template ornamental rules & paper border — [`app/create/page.tsx:172`](app/create/page.tsx), hero preview divider — [`app/homepage-hero.tsx:56`](app/homepage-hero.tsx) | Warm grey-tan |
| `#7A2A1F` | Checkout error text foreground — [`app/create/page.tsx:978`](app/create/page.tsx) | Deeper terracotta for error contrast |
| `#FFA500`, `#FFD700` | Candle flame fill — [`components/illustrations/Candle.tsx:35`](components/illustrations/Candle.tsx) | Flame orange & yellow |
| `#FBF6EC`, `#F4ECDC`, `#FAF3E5` | Classic-template paper gradient — [`app/create/page.tsx:155`](app/create/page.tsx) | Render-only paper tones |

### 2.4 Forbidden combinations

- No high-contrast aggressive palettes. The whole system is muted on
  cream — never introduce saturated reds, blues, or greens.
- **No purple anywhere.** Not as a tint, not as a gradient stop.
- No black-on-white. Body text is `#2A1F18` on `#FAF6EF` by design — a
  warm cocoa on cream, never pure black on pure white.
- No "alert" colors. Errors use muted terracotta `#C8786E`, never red.

---

## 3. Typography

### 3.1 Fonts loaded

Loaded via Google Fonts `@import` in
[`app/globals.css:1`](app/globals.css) (not via `next/font` — the import
URL pulls all four families in one request).

| Family | CSS var | Tailwind | Role | Weights/styles loaded |
|---|---|---|---|---|
| Cormorant Garamond | `--font-display` | `font-display` | Display, headlines, tribute italics, memorial typography | 300–700, italic 300–700 |
| DM Sans | `--font-body` | `font-body` | UI, body, labels, buttons | 100–1000 + italic |
| Lora | `--font-document` | `font-document` | Reserved — defined but no usage found in pages read | 400–700 + italic |
| Caveat | `--font-handwriting` | `font-handwriting` | Reserved — defined but no usage found in pages read | 400–700 |

Note: `font-document` and `font-handwriting` are wired through Tailwind
and `globals.css` but I found no live use in the pages I read
(`/`, `/create`, `/m/[slug]`, `/rainbow-bridge`, the hero, the FAQ, the
three UI components). If they're not used by anything else, they are
candidates for removal.

### 3.2 Base type scale

Defined in [`app/globals.css`](app/globals.css) `@layer base`. These
apply when you write a plain `<h1>`, `<h2>`, `<h3>`, `<p>`, or `<label>`
with no overrides:

| Element | Family | Size | Weight | Line-height | Letter-spacing | Other |
|---|---|---|---|---|---|---|
| `body` | `--font-body` (DM Sans) | inherits | 400 | 1.65 | — | bg `--color-background`, color `--color-text-primary` |
| `h1` | `--font-display` (Cormorant Garamond) | 44px | 400 | 1.1 | -0.02em | — |
| `h2` | `--font-display` | 32px | 400 | 1.1 | -0.02em | — |
| `h3` | `--font-body` (DM Sans) | 22px | 600 | 1.4 | — | — |
| `p` | `--font-body` | 16px | 400 | 1.65 | — | — |
| `label` | `--font-body` | 12px | 500 | 1.4 | 0.06em | UPPERCASE, color `--color-text-secondary` |

### 3.3 Display headlines (in-place overrides)

Across pages, h1/h2 sizes are frequently overridden inline. They cluster
into three patterns:

**Hero h1 — homepage**
- 44px mobile → 72px md
- `fontFamily: var(--font-display)`, `fontWeight: 400`,
  `lineHeight: 1.05`, `letterSpacing: -0.02em`
- Example: [`app/homepage-hero.tsx:15`](app/homepage-hero.tsx)

**Memorial hero h1**
- `clamp(36px, 8vw, 48px)`, weight 400, line-height 1.1, letter-spacing
  -0.02em, display serif
- [`app/m/[slug]/memorial-client.tsx:251`](app/m/[slug]/memorial-client.tsx)

**Section h2 — homepage & dark finale**
- 32px standard
- 36px → 52px in the dark finale CTA block
- All Cormorant Garamond, weight 400, line-height ~1.1–1.2,
  letter-spacing -0.02em
- Examples: [`app/page.tsx:236`](app/page.tsx),
  [`app/page.tsx:342`](app/page.tsx)

**Memorial bottom-CTA h2**
- `clamp(24px, 5vw, 30px)`, weight 400, letter-spacing -0.01em
- [`app/m/[slug]/memorial-client.tsx:568`](app/m/[slug]/memorial-client.tsx)

### 3.4 Body & supporting copy

| Pattern | Size | Family | Color | Notes |
|---|---|---|---|---|
| Hero subhead | 19px | DM Sans | text-secondary | line-height relaxed (~1.65) |
| Section body | 16–17px | DM Sans | text-secondary | line-height 1.7 or 1.8 for "feels like prose, not ad copy" |
| Tribute line | clamp 18–22px italic | Cormorant Garamond | text-primary | wrap in `&ldquo;…&rdquo;` |
| Dates under name | 18px | Cormorant Garamond | text-secondary | uses em-dash `—` between years |
| Born/Died facts row label | 10px | DM Sans | text-tertiary | UPPERCASE, letter-spacing 0.12em |
| Eyebrow label above sections (`Memorials`, `Questions`) | 11–13px | DM Sans | text-tertiary | UPPERCASE, letter-spacing 0.06–0.18em |
| FAQ question | 18px | DM Sans, weight 500 | text-primary | hover: text-accent-primary |
| FAQ answer | 16px | DM Sans | text-secondary | leading-relaxed |
| Step number (How It Works) | 36px | Cormorant Garamond | text-border `#EDE3D5` | very pale — number is decorative scaffolding |
| Footer copy | 11–14px | DM Sans | text-secondary / text-tertiary | — |

### 3.5 Italic & roman usage

Italics are emotional, not stylistic decoration. Use only for:

- **Tribute lines** on memorial cards and pages — always wrapped in
  curly quotes `&ldquo;…&rdquo;`. Display serif, italic.
  Example: [`app/m/[slug]/memorial-client.tsx:402`](app/m/[slug]/memorial-client.tsx)
- **Editorial emphasis** inside long-form Rainbow Bridge prose
  (specific words like *texture*, *disenfranchised grief*).
  Example: [`app/rainbow-bridge/page.tsx:285`](app/rainbow-bridge/page.tsx)
- **Memorial-page eyebrow lines** and empty-state copy ("No memories
  yet. Yours could be the first.")
- **Sign-off / authorship blocks** at the end of editorial pages
  ([`app/rainbow-bridge/page.tsx:437`](app/rainbow-bridge/page.tsx))

Never italicize a CTA, button, or label. Never italicize a price.

### 3.6 Long-form article styles (`.rb-article`)

The `/rainbow-bridge/*` pages opt out of the product type scale and into
a longer editorial scale by wrapping the article in `<article
class="rb-article">`. Defined in [`app/globals.css:99`](app/globals.css):

| Element | Mobile | ≥ md (768px) | Family |
|---|---|---|---|
| `.rb-article p` | 17px / lh 1.65 | 19px | display serif (Cormorant Garamond) |
| `.rb-article p strong` | weight 600 | — | — |
| `.rb-article h1` | 36px / lh 1.15 / ls -0.01em | 44px | inherits display |
| `.rb-article h2` | 24px / lh 1.25 / weight 500 / ls -0.005em | 28px | inherits display |
| `.rb-article footer p` | 15px / lh 1.6 | 16px | display serif, color text-secondary |

Why this exists: product UI is DM Sans 16px (correct for forms and
buttons). Editorial reading wants larger, slower serif type. The wrapper
class restores that without touching anything else on the site.

---

## 4. Spacing scale

The project uses Tailwind's default spacing scale (no custom additions
in `tailwind.config.ts`). The subset that appears in real use:

### 4.1 Spacing values in use

Inferred from grepping the pages and components read. Most-used first:

| Class | Value | Common uses |
|---|---|---|
| `gap-1` | 4px | tight name+date stacks |
| `gap-2` | 8px | label + icon, inline pairs |
| `gap-3` | 12px | form rows, button stacks |
| `gap-4` | 16px | form field stacks |
| `space-y-3 / gap-5` | 12 / 20px | nested content blocks |
| `space-y-6 / gap-6` | 24px | section paragraphs |
| `gap-8` | 32px | column gaps inside grids |
| `space-y-10` | 40px | memorial facts cluster spacing |
| `gap-12` | 48px | major hero/grid column gaps |
| `gap-16` | 64px | desktop hero column gap |
| `py-[48px]` | — | footer vertical padding |
| `py-[60px]` / `py-[80px]` / `py-[100px]` / `py-[120px]` | — | section vertical rhythm (homepage uses 60/80/100/120 in escalating intensity) |

### 4.2 Section vertical rhythm (homepage)

Memorize this pattern — sections on `/` follow a deliberate cadence:

| Section | Top | Bottom |
|---|---|---|
| Hero | `pt-32` (128px) | `pb-[120px]` |
| Gallery | `pt-[60px]` | `pb-[80px]` |
| How it works | `py-[80px]` | — |
| Anniversary | `py-[80px]` | — |
| Rainbow Bridge story | `py-[80px]` | — |
| FAQ | `py-[120px]` | — |
| Dark finale CTA | `py-[100px]` | — |
| Footer | `py-[48px]` | — |

### 4.3 Card padding

- Card component: `p-6 md:p-8` (24px / 32px) —
  [`components/ui/card.tsx:13`](components/ui/card.tsx)
- Memory card on memorial page: `px-5 py-4` (20px / 16px)
- Guestbook compose box: `p-5 md:p-6`
- Crop modal: `p-5`

### 4.4 Min-heights for tap targets

- Primary CTA buttons: `min-h-[52px]` default, `min-h-[56px]` for hero
  primary CTA
- Secondary buttons inside forms: `min-h-[44px]` to `min-h-[48px]`
- Nav button on header: `min-h-[44px]`

Mobile minimum tap target is **44×44 px** by site convention. Never go
below.

---

## 5. Layout

### 5.1 Page-level max-widths

Each page archetype defines its own outer max-width. They are
intentionally different — do not consolidate without checking the
emotional weight of the page first.

| Page | Outer wrap | Content column |
|---|---|---|
| `/` (homepage) | `max-w-[1180px]` | varies per section (920, 640, 720) |
| `/create` | `max-w-[1400px]` header / `max-w-[1300px]` body state-1 / `max-w-[1400px]` state-2 | grid columns |
| `/m/[slug]` | `max-w-[1080px]` header / `max-w-[680px]` hero & tabs / `max-w-[600px]` tab content / `max-w-[560px]` bottom CTA | — |
| `/rainbow-bridge` and children | none on `<main>`; `maxWidth: 680` on the article | — |
| `/success` | inherits from client; `max-w-[400px]` for 404-ish "we couldn't find that" state | — |

The 680px content column is the editorial standard — derived from
comfortable reading line length at 17–19px serif type.

### 5.2 Breakpoints

The project uses **only Tailwind's default breakpoints** — no custom
breakpoints in `tailwind.config.ts`.

| Prefix | Min width | Common use |
|---|---|---|
| `sm:` | 640px | 2-col gallery grid |
| `md:` | 768px | hero stacks become side-by-side; section padding grows; article font sizes step up |
| `lg:` | 1024px | `/create` switches from vertical-stack to 2-col desktop layout |

Mobile-first is enforced. Default styles target mobile; `md:` and `lg:`
add layout complexity. **Do not** write `max-md:` or desktop-first
overrides.

### 5.3 Grid patterns

**Memorial gallery (homepage)** —
[`app/page.tsx:224`](app/page.tsx):
```
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 max-w-[920px] mx-auto
```

**How It Works** — 3-column on md+:
```
grid md:grid-cols-3 gap-10
```

**Hero (homepage)** — asymmetric 55/45 split:
```
grid md:grid-cols-[55fr_45fr] gap-16 items-center
```

**Anniversary** — text + phone mockup, text left:
```
grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center
```

**Rainbow Bridge story (homepage section)** — 1.2/1 split:
```
grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center
```

**Create State-1** — form left, preview right, sticky:
```
grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start
```
The preview side uses `lg:sticky lg:top-8 lg:self-start` to stay visible
while the form scrolls.

**Create State-2 desktop** — narrow form, wide preview:
```
hidden lg:grid lg:grid-cols-[minmax(320px,1fr)_2fr] lg:gap-8 lg:h-full
```

### 5.4 Page chrome

There is **no global layout component** for header/footer. Each page
brings its own chrome:

- `/` — Fixed translucent nav (`fixed top-0` + `backdrop-blur-sm` +
  `bg-[rgba(250,246,239,0.95)]`); full footer with brand mark + links.
- `/create` — Border-bottom header with progress bar; no footer.
- `/m/[slug]` — Simple bordered header; minimal italic footer with
  three text links.
- `/rainbow-bridge/*` — No header, no footer — pure article. Page
  background pulled directly off the `--color-background` var on
  `<main>`.
- `/success` — Inherits from `success-client.tsx` (not read in detail
  here — see file for specifics).

The root layout at [`app/layout.tsx`](app/layout.tsx) only sets the
`<html>` lang, the title/description metadata, and applies
`className="antialiased"` to `<body>`. Nothing else.

---

## 6. Components

### 6.1 Button — `components/ui/button.tsx`

Four variants. Default is `primary`. All buttons are `rounded-full`,
font-body, weight 500, with `min-h-[52px]` baseline.

```tsx
<Button>Make their tribute</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">…</Button>
<Button variant="destructive">…</Button>
```

**Base classes** ([`components/ui/button.tsx:13`](components/ui/button.tsx)):
```
rounded-full px-8 py-4 min-h-[52px]
transition-[background-color] duration-[200ms] ease-out cursor-pointer
font-body text-[16px] font-medium leading-snug
```

**Variants:**

| Variant | Background | Text | Hover | Disabled |
|---|---|---|---|---|
| `primary` | `--color-accent-primary` | white | `--color-accent-primary-hover` + `active:scale-[0.98]` | `bg-[#E4B5A5]` text-white, no shadow |
| `secondary` | transparent | accent-primary | `bg-[--color-accent-primary-light]` | `opacity-50` |
| `ghost` | transparent | text-secondary | `bg-[rgba(42,31,24,0.04)]` | `opacity-50` |
| `destructive` | transparent | error | `bg-[rgba(200,120,110,0.04)]` | `opacity-50` |

Primary buttons carry a faint shadow: `shadow-[0_4px_12px_rgba(80,60,40,0.12)]`.

**When to use what**
- `primary` — exactly one per screen, on the action the page exists to
  enable (Make their tribute, Get full memorial, Submit memory).
- `secondary` — for paired sibling actions (Download free preview next
  to Get full memorial; Cancel next to Use this crop).
- `ghost` — found in component definition but I did not locate live
  usage in the pages I read. Reserved for "tertiary, escape-hatch" use.
- `destructive` — same. Reserved; not in any live page.

**When not to use**
- Never stack two `primary` buttons on the same screen. The hero in
  `/m/[slug]` has one `primary` ("Make one for your pet"); the
  guestbook has one `primary` ("Submit memory") + one `secondary`
  ("Light a candle"). Pattern: primary owns the page; secondary
  supports.
- Never wrap a `primary` button in any kind of pulsing, attention-
  grabbing animation. Buttons are still — the page invites action by
  position and clarity, not motion.

Padding overrides for context (commonly seen):
- Nav button on `/`: `px-6 py-3.5 min-h-[44px] text-[15px]`
- Final CTA on `/`: `min-h-[56px] px-10 text-[17px]`

### 6.2 Input — `components/ui/input.tsx`

The **bordered, white** input pattern. Used in `/create` State-1.

Structure ([`components/ui/input.tsx`](components/ui/input.tsx)):
```
<label class="text-xs font-medium tracking-[0.06em] uppercase
              text-[--color-text-secondary]">
  Their name
</label>
<input class="bg-white border-[1.5px] border-[--color-border]
              rounded-xl px-[18px] py-4 text-[16px]
              text-[--color-text-primary]
              placeholder:text-[--color-text-tertiary]
              focus:outline-none focus:border-[--color-border-focus]
              focus:ring-4 focus:ring-[rgba(123,154,171,0.15)]
              transition-all duration-[220ms]" />
```

Inconsistency to flag: the focus `ring-4` color is hardcoded as
`rgba(123,154,171,0.15)` — a leftover from a previous **dusk blue**
accent palette. The accent is now warm terracotta `#C97B63`. The ring
should be re-derived from terracotta (e.g.
`rgba(201,123,99,0.15)`) for visual consistency. Flagged for cleanup;
the doc records what's there, not what should be there.

Error state: when `error` prop is set, the border switches to
`--color-error` and a `<span class="text-sm text-[--color-error]">`
sibling appears below.

### 6.3 MinimalField — inline in `app/create/page.tsx`

The **borderless, underlined** input pattern. Used in `/create` State-2
where the form sits next to a large preview and the form should recede.

Defined at [`app/create/page.tsx:56`](app/create/page.tsx):
```
<label class="text-[10px] tracking-[0.08em] uppercase
              text-[--color-text-tertiary] mb-1 font-medium">
  Their name
</label>
<input class="flex-1 min-w-0 bg-transparent border-0
              border-b border-[--color-border] px-0 py-1.5
              text-[15px] text-[--color-text-primary]
              placeholder:text-[--color-text-tertiary]
              focus:outline-none focus:border-[--color-accent-primary]
              transition-colors duration-[200ms]" />
```

Both `Input` and `MinimalField` are correct in their respective
contexts. Do not consolidate them.

| If the input is | Use |
|---|---|
| A standalone form, mid-page, where the input *is* the focus | `Input` |
| Squeezed alongside a hero preview, where input chrome would compete | `MinimalField` |

### 6.4 Textarea (memorial guestbook)

No reusable component. Inline at
[`app/m/[slug]/memorial-client.tsx:462`](app/m/[slug]/memorial-client.tsx):
```
bg-[--color-background] border border-[--color-border] rounded-xl
px-4 py-3 text-[15px] text-[--color-text-primary]
placeholder:text-[--color-text-tertiary]
focus:outline-none focus:border-[--color-border-focus] resize-none
```
4 rows, max 200 chars, with a `{count}/200` counter directly below.

### 6.5 Card — `components/ui/card.tsx`

Two variants. `rounded-[20px]` shell, larger interior padding than
inputs.

**Standard:**
```
bg-[--color-surface] rounded-[20px] p-6 md:p-8 shadow-card
border border-[--color-border]
```

**Featured:**
```
bg-[--color-accent-warmth-light] rounded-[20px] p-6 md:p-8 shadow-card
border-2 border-[--color-accent-warmth]
```

I did not locate live use of the `Card` component in the pages I
read — each page tends to compose its own card-like containers inline
(memorial gallery cards, hero product card, memory cards, etc.). The
component exists as a primitive; verify before using for new work.

### 6.6 Memorial card (homepage gallery)

Inline in [`app/page.tsx:67`](app/page.tsx). The most prominent product
surface on the homepage. Whole card is a `<Link>` to `/m/[slug]`.

```
group block space-y-3
transition-transform duration-200 hover:-translate-y-0.5

  // image container
  relative aspect-[9/16] rounded-[10px] overflow-hidden bg-white
  border border-[--color-border] shadow-card
  group-hover:shadow-[0_12px_28px_rgba(80,60,40,0.12)]
  transition-shadow duration-200

  // text — centered, very small
  Cormorant Garamond 18px (name) / 13px text-tertiary (dates)
```

The hover lift is exactly **2px** (`-translate-y-0.5`). Anything more
feels frivolous; anything less is invisible.

### 6.7 Hero product preview card (homepage)

Static fake of a memorial card, sized like a phone-frame product. Inline
at [`app/homepage-hero.tsx:43`](app/homepage-hero.tsx):

- White card, `rounded-xl`, `shadow-memorial`
- 9:16 aspect, ~300–320px wide
- Photo zone occupies 65% (flex-[65]), text zone 35% (flex-[35]),
  divided by a 1px `#D4C9BD` rule
- Name in Cormorant Garamond 28px / 1.2, dates 16px `#5A5A5A`, tribute
  italic 14px `#888888`

### 6.8 Anniversary email mockup (phone frame)

Inline at [`app/page.tsx:112`](app/page.tsx). Visual scaffold to show
the user what the anniversary email will look like.

- Outer phone frame: `rounded-[36px] bg-[#2A2A2A] p-[6px]`
- Inner screen: `rounded-[30px] bg-white overflow-hidden`
- Faux status bar: `9:41` and battery glyph in 10px
- Email header: row of avatar + sender + timestamp
- Mini render: 9:16 aspect, real `/samples/memorial-charlie.png`
- Faux "Download" button: full-width pill in accent-primary

Use this as a reference pattern any time you want to show the user
what they will *receive*, not what they will *do*.

### 6.9 Header / site nav

**Homepage** ([`app/page.tsx:177`](app/page.tsx)):
```
fixed top-0 left-0 right-0 z-50
border-b border-[--color-border] backdrop-blur-sm
backgroundColor: rgba(250,246,239,0.95)
max-w-[1180px] mx-auto px-6 md:px-10 py-5
flex items-center justify-between
```
Left: `<PawPrint size={22} className="text-[#2A2A2A]" />` +
`rainbow.memorial` wordmark (DM Sans, weight 600, text-primary).
Right: `Make a tribute` primary CTA with reduced padding.

**Create page** ([`app/create/page.tsx:620`](app/create/page.tsx)):
```
border-b border-[--color-border] px-6 py-3 shrink-0
max-w-[1400px] mx-auto
```
Left: same wordmark. Right: `Step 1 of 2` text-secondary microcopy.
Below: 3px progress bar with `bg-[--color-border]` track, fills
`bg-[--color-accent-primary]` at 50% (no photo) or 85% (photo
uploaded), with a 500ms transition.

**Memorial page** ([`app/m/[slug]/memorial-client.tsx:207`](app/m/[slug]/memorial-client.tsx)):
```
px-6 py-5 border-b border-[--color-border]
max-w-[1080px] mx-auto
```
Brand mark only. No CTA.

There are **three header variants** intentionally — each page sets its
own emotional register. The homepage is selling. Create is operational.
Memorial is contemplative.

### 6.10 Footer

**Homepage footer** ([`app/page.tsx:366`](app/page.tsx)):
```
bg [--color-background-alt]  py-[48px] px-6
max-w-[1180px] mx-auto
flex flex-col md:flex-row items-center md:items-start justify-between gap-6
```
Brand stack (paw + wordmark + tagline) on the left; Contact / Privacy /
Terms text links on the right. Copyright in 11px text-tertiary
centered below.

**Memorial footer** ([`app/m/[slug]/memorial-client.tsx:611`](app/m/[slug]/memorial-client.tsx)):
```
px-6 py-8 border-t border-[--color-border]
max-w-[680px] mx-auto text-center space-y-2
```
"Created via rainbow.memorial" in italic display serif, then three
inline text links separated by `·` middots.

**Rainbow Bridge footer** is inside the article — an `<hr>` followed by
an italic sign-off block with author attribution and source citations.
Pattern: [`app/rainbow-bridge/page.tsx:432`](app/rainbow-bridge/page.tsx).

### 6.11 Crop modal — `/create`

Defined inline at [`app/create/page.tsx:655`](app/create/page.tsx).

```
// overlay
fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4

// dialog
bg-white rounded-2xl w-full max-w-[520px] p-5 shadow-xl

// title
"Crop their photo" — Cormorant Garamond 18px, weight 400, mb-3

// cropper area
relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden

// react-easy-crop config
aspect={1}  cropShape="round"  showGrid={false}

// zoom slider
input type="range" min={1} max={3} step={0.1}

// buttons
flex gap-2 justify-end
[Cancel] secondary  +  [Use this crop] primary
```

**Aspect is locked to 1:1, round shape, no grid.** This is the contract
for the entire photo pipeline (see §10).

### 6.12 Tab navigation — memorial page

```
nav border-b border-[--color-border]
max-w-[680px] mx-auto px-6 flex gap-8
role="tablist"

each tab button:
  relative py-4 text-[14px] tracking-wide transition-colors
  fontFamily: var(--font-body), fontWeight: 500
  inactive: color text-tertiary
  active:   color text-primary, plus underline span:
            absolute left-0 right-0 -bottom-px h-[2px]
            backgroundColor: var(--color-accent-primary)
```

Two tabs: `Memorial` and `Guestbook`. Switch is animated by
framer-motion `<AnimatePresence mode="wait">` with a 200ms
opacity+y-4 fade.

### 6.13 Bottom-CTA section pattern

A consistent end-of-page convention to soften the close-out. Used in
the dark finale on `/` and the warm-sand block on `/m/[slug]`.

| Element | Style |
|---|---|
| Wrapper | `py-14 md:py-20` or `py-[100px]`, full-width band, soft-tone background |
| Container | `max-w-[560px]` or `max-w-[640px]` `mx-auto text-center space-y-5` |
| Heading | Cormorant Garamond 24–52px, weight 400, ls -0.01em — emotionally framed ("When you're ready, we're here.") |
| Body | Cormorant Garamond 17px, text-secondary, line-height 1.6 |
| CTA | One primary button, `min-h-[48px]` to `min-h-[56px]` |
| Microcopy | One 11–14px line below the button in text-tertiary, never red, never bolded |

Never put more than one CTA in this block.

### 6.14 FAQ — `app/homepage-faq.tsx`

Accordion. State held in component (`useState<number | null>`). Each
item:

```
border-b border-[--color-border]

button (full-width):
  w-full text-left py-6
  flex items-start justify-between gap-4 group

  question span:
    text-[18px] DM Sans weight 500 text-primary
    group-hover:text-[--color-accent-primary] transition-colors

  ChevronDown icon:
    text-[--color-text-secondary] size 18
    rotate-180 when open, transition 220ms

answer (when open):
  text-[16px] text-secondary leading-relaxed pb-6
```

The whole FAQ block sits in a `max-w-[720px]` container. Eyebrow
"Questions" above. Heading "A few things people ask." in Cormorant
Garamond, weight 400.

### 6.15 Memory card (guestbook)

```
bg-white rounded-xl border border-[--color-border] px-5 py-4

  header row:
    flex items-baseline justify-between gap-3 mb-1
    name: 10px uppercase, letter-spacing 0.12em, text-tertiary
    time: 11px text-tertiary (`timeAgo()` helper)

  message body:
    Cormorant Garamond 15px text-primary leading-relaxed
```

Inline at [`app/m/[slug]/memorial-client.tsx:508`](app/m/[slug]/memorial-client.tsx).
Visitor messages display in display serif on purpose — they read as
written sentiment, not posts.

### 6.16 Candle counter

A small unit on the Guestbook tab —
[`app/m/[slug]/memorial-client.tsx:429`](app/m/[slug]/memorial-client.tsx):
```
flex items-center justify-center gap-2

  CandleIcon size={16} className="text-[--color-accent-primary]"
  text: Cormorant Garamond 17px text-secondary
  "{n} candle(s) lit"
```

Tapping `Light a candle` animates a scale pulse `[1, 1.06, 1]` over
400ms. Rate-limited by IP server-side — failures are silent (don't
punish the user).

### 6.17 Format toggle (`/create` State-2)

Pill segmented control for `story` ↔ `square`:
```
flex gap-1 bg-[--color-background-alt] p-1 rounded-full
border border-[--color-border] w-fit

each button:
  px-4 py-1.5 rounded-full text-[12px] font-medium
  duration-[200ms]
  active:   bg-[--color-accent-primary] text-white
  inactive: bg-transparent text-secondary hover:text-primary
```

### 6.18 Template picker (`/create` State-2)

Horizontal scroll on mobile, equal-width on desktop. Each tile is a
9:16 thumbnail with a label.

```
selected tile:
  ring-2 ring-[--color-accent-primary]
  ring-offset-2 ring-offset-[--color-background]
  scale-[1.04]

unselected:
  ring-1 ring-[--color-border]
  opacity-75 hover:opacity-100
```

Label below in 10px, weight 500 when selected, text-tertiary when not.

---

## 7. Voice & tone

The codebase doesn't ship a voice guide as code; the persona reference
the prompt cites (`/mnt/user-data/outputs/02_persona_voice_guide.md`)
does not exist on this machine. The voice rules below are derived from
**actual copy** in [`app/rainbow-bridge/page.tsx`](app/rainbow-bridge/page.tsx),
[`app/page.tsx`](app/page.tsx), and [`app/homepage-faq.tsx`](app/homepage-faq.tsx).

### 7.1 Voice in one line

**Wounded counselor.** Marty Tousley reading to a person at 11pm on the
day their dog died. Not a brand. Not a product. A person who has been
through it.

### 7.2 Banned words

- *transformative*
- *journey*
- *embark*
- *fur baby*
- *furever / forever home / paw-some / pup-tastic / any cute compound*
- *celebrate their life* (it's a memorial; we honor, we remember)
- *unleash, unlock, empower*
- *seamless, frictionless, intuitive*
- *we believe…* (no manifesto language)
- *amazing, beautiful tribute, magical* (when used by us — customers
  can say whatever they want)
- *just $24.99* — the price is stated plainly without "just"

### 7.3 Preferred sentence shape

- Short. 8–18 words is the working range.
- Concrete nouns over abstract ones. "Their face inside a Rainbow
  Bridge tribute" not "a beautiful experience that captures memories".
- One idea per sentence. If you need a comma to staple two ideas
  together, split them.
- Plain verbs. *upload, share, watch, make, send*. Not *leverage,
  facilitate, enable*.

### 7.4 Forbidden patterns

- **Anaphora laddering** — three sentences starting with the same word
  ("You will. You will. You will."). Strike on sight.
- **Triple-negative staccato** — "No subscription. No renewal. No
  signup." is fine *once*, sparingly. Stacking multiple such triplets
  in a page is forbidden.
- **Dramatic single-word fragments** at section openings — "Grief.
  Loss. Memory." Strike.
- **Rhetorical triplets** — "For the wagging tails, for the warm naps,
  for the early mornings." Banned. Two beats max if you must.
- **"We" marketing language** — "We believe pets deserve…", "Our
  mission is…", "We're here for you." The voice is *from a person*,
  signed (where appropriate) Hannah Wright. No corporate "we".
- **Hedging filler** — *truly, simply, just, really, very, basically*.
  Cut them all.
- **Em-dash overuse** — em-dashes are fine; one per paragraph max.
- **Question-then-answer scaffolding** in body prose — "What is grief?
  Grief is…" Don't.

### 7.5 Tone calibrators

When in doubt, ask: would Hannah Wright write this sentence to one
person, in a quiet room, by hand? If the answer is "no, this sounds
like an email from a SaaS company", rewrite.

A working sample of the right voice is in
[`app/rainbow-bridge/page.tsx:78`](app/rainbow-bridge/page.tsx) — read
the first six paragraphs of the article. That is the register.

---

## 8. SBA-40 / dark-pattern rules

The codebase doesn't enforce these in code, but the existing pages obey
them. The referenced file
(`/mnt/user-data/outputs/06_sba40_rules_for_grief.md`) does not exist
on this machine; the list below codifies the rules visible in current
product behavior.

### 8.1 Never deploy

- **Countdowns / scarcity timers** — no "offer ends in 03:42:11".
- **Social proof counters that imply pressure** — "12 people made a
  memorial in the last hour" is forbidden. The candle counter is fine
  because it is *for the pet*, not *for the funnel*.
- **Fake or anonymized testimonials.** If a testimonial is used, it
  cites a real person and (ideally) the slug of the memorial they
  made.
- **Exit-intent popups.** Never.
- **Loss-aversion framing** — "Don't lose your photos forever" type
  copy. Banned.
- **Confirmshaming** — "No thanks, I don't care about my pet" decline
  options. Banned.
- **Drip-trial mechanics** — no time-locking the memorial behind a
  signup gate to harvest emails.
- **Pre-checked upsell boxes** — never.
- **Follow / subscribe / "stay updated" buttons** — never. Email is
  for anniversary tribute delivery, not for newsletter cadence.

### 8.2 Allowed gently — maximum two per page

These are mild SBA-40 levers acceptable in a grief context:

- **Endowment** — showing the user a free, watermarked preview they
  already partly own before checkout. (`Download free preview` button
  on `/create`.)
- **Anchoring** — "$24.99 once. No subscription." anchored against the
  ongoing-cost shape of competitors. Stated once, not repeated.
- **Framing** — naming the same fact in human terms. "Ninety seconds.
  A lifetime of love." is framing the duration, not pressure.
- **Authority via citation** — quoting Marty Tousley, Edna
  Clyne-Rekhy, Paul Koudounaris, *National Geographic*. Naming sources
  is allowed and welcome. Implying authority without a source is not.
- **IKEA effect** — letting the user craft their tribute (template
  pick, photo crop, tribute line) increases ownership *because they
  built it*. This is intrinsic to the product, not a pattern overlay.

### 8.3 Share & follow rules

- **Share** button is allowed on `/m/[slug]` — implemented at
  [`app/m/[slug]/memorial-client.tsx:177`](app/m/[slug]/memorial-client.tsx).
  Uses `navigator.share` when available, falls back to copy-to-clipboard
  with a "Link copied" toast. The user shares *to family*, not to a
  social platform we own.
- **Follow** button — never used. There is nothing to follow.

---

## 9. Iconography

### 9.1 Library

- **`lucide-react`** v1.14.0 (per [`package.json`](package.json)).
  Used for utility icons: `Upload`, `Download`, `ChevronDown`.
- **Custom inline SVGs** for the brand-relevant figures —
  [`PawPrint`](components/illustrations/PawPrint.tsx),
  [`Candle`](components/illustrations/Candle.tsx),
  [`SleepingCat`](components/illustrations/SleepingCat.tsx). A second
  `CandleIcon` is defined inline in
  [`memorial-client.tsx:40`](app/m/[slug]/memorial-client.tsx) — it's
  smaller and used in the guestbook toolbar.
- A `ShareIcon` SVG is defined inline in
  [`memorial-client.tsx:60`](app/m/[slug]/memorial-client.tsx).

### 9.2 Standard sizes

| Context | Size |
|---|---|
| Nav wordmark paw | 20–22px |
| Upload prompt paw (hero) | 32–48px |
| Empty-state paw (`/create` State-1 preview) | 48px |
| Final-CTA decorative paw (homepage) | 40px |
| Candle counter glyph | 16px |
| ChevronDown in FAQ | 18px |
| Share button glyph | 14px |
| Sleeping cat decorative motif | 64–80px |

### 9.3 Stroke / fill conventions

- `PawPrint`: stroke-only, `strokeWidth="1.5"`, `currentColor`. Inherits
  text color from the surrounding text.
- `SleepingCat`: stroke `1.8`, soft fill `rgba(232,196,184,0.15)` for
  a faint pink wash inside the contour.
- `Candle` (large, illustration): stroke `1.5`, body fill
  `rgba(250,246,239,0.8)` (the cream tint), flame in
  `#FFA500` / `#FFD700` with `opacity-0.6` / `opacity-0.4` when `lit`.
- `CandleIcon` (small, inline): solid fill `currentColor` at varying
  opacities (0.9 flame, 0.5 wax body).

All decorative SVGs use `currentColor` so they recolor via the parent's
`text-` Tailwind class.

---

## 10. Image & photo handling

### 10.1 Render output dimensions

From the renderer pipeline (zone math at
[`app/create/page.tsx:127`](app/create/page.tsx)):

- **Story format** — `1080 × 1920` (9:16). Default. Made exactly for
  Instagram Stories.
- **Square format** — `1080 × 1080` (1:1). Selected via the format
  pill toggle. Renderer math scales by `0.78` and shifts text up by
  `-6%` to recenter for the shorter canvas.

The preview in the UI matches the eventual render — same template PNG
in the background, same percentage-based positioning derived from the
template's `canvasWidth` / `canvasHeight` (1080×1920 source-of-truth).

### 10.2 Customer photo crop

After the user selects a photo, they pass through a forced crop step
([`app/create/page.tsx:655`](app/create/page.tsx)) using
`react-easy-crop` v5.5.7:

- **`aspect={1}`** — locked 1:1 square.
- **`cropShape="round"`** — circular preview, though the underlying
  crop is square.
- **`showGrid={false}`** — keep the moment quiet, no rule-of-thirds
  scaffolding.
- **Zoom range:** 1× to 3×, step 0.1.

The cropped pixel box is POSTed to `/api/upload` (multipart) along with
the original file. Server-side cropping uses **Sharp** v0.34.5 — see
the commit log entry "replace Cloudinary with Sharp + react-easy-crop
for owner-controlled photo cropping".

### 10.3 Storage / hosting

- **Cloudflare R2** for both originals and cropped versions.
- Public URLs derive from `R2_PUBLIC_URL`. Next.js `images.remotePatterns`
  in [`next.config.mjs:18`](next.config.mjs) admits the env-derived
  hostname plus a permissive `*.r2.dev` fallback and `images.unsplash.com`
  for the hero demo photo.

### 10.4 File constraints

Enforced client-side at [`app/create/page.tsx:469`](app/create/page.tsx):

- Max size: **10 MB**
- MIME: must start with `image/`. Practical formats per FAQ: JPEG,
  PNG, HEIC, WebP — see [`app/homepage-faq.tsx:17`](app/homepage-faq.tsx).

### 10.5 OG / share preview

Generated OG images target **1200 × 630** — see
[`app/m/[slug]/page.tsx:90`](app/m/[slug]/page.tsx). If `ogImageUrl`
isn't set on the pet record, falls back to `renderedImageUrl` (the
story-format render). Twitter card: `summary_large_image`.

### 10.6 Inline photo display

- Memorial card images on `/` and `/m/[slug]` use plain `<img>` with
  `loading="lazy"` and `object-cover`. We deliberately don't use
  `next/image` for these — the rendered PNGs are already perfectly
  sized.
- Crop preview photo in `/create` State-2: 56×56 circle with
  `border-2 border-[--color-border]`, hover border switches to
  accent-primary.

---

## 11. Animation & transitions

### 11.1 Libraries

- **`framer-motion`** v12.38.0 for page-state transitions and the
  `/create` state machine (State-1 ↔ State-2), the memorial tab switch,
  and the candle pulse animation.
- Tailwind transitions otherwise. CSS `transition-colors`,
  `transition-shadow`, `transition-transform`.

### 11.2 Standard durations

| Use | Duration | Easing |
|---|---|---|
| Hover color shift (links, buttons) | 200ms | `ease-out` |
| Hover transform (memorial card lift) | 200ms | default |
| FAQ chevron rotation | 220ms | default |
| Input focus transition | 220ms | `transition-all` |
| Tab content fade (framer) | 200ms | default |
| State-1 → State-2 transition | 400ms | `[0.0, 0.0, 0.2, 1.0]` (Material standard easing in) |
| Progress bar fill | 500ms | default |
| Candle pulse (scale 1 → 1.06 → 1) | 400ms | default |
| Preview pulse (during render) | 1600ms | `easeInOut`, infinite |
| Share toast appear / dismiss | instant; 2000ms hold |

### 11.3 Hover state conventions

- Color shift only on text links and buttons.
- **Subtle lift** — `-translate-y-0.5` (2px) — exclusively for the
  memorial gallery card. Pairs with a shadow upgrade from `shadow-card`
  to `shadow-[0_12px_28px_rgba(80,60,40,0.12)]`.
- **No scale up** on hover except for the template picker tile
  (`scale-[1.04]`) when *selected*, not when hovered.
- **No glow, no underline animation, no slide-in tooltips.**

### 11.4 Forbidden animations

- **No bouncing / spring physics anywhere.** This is a grief product.
- **No attention-grabbing pulses** on CTAs ("come click me"). The only
  pulse in the app is the candle counter feedback after the user
  actively lights one — a *response*, not a *prompt*.
- **No parallax** on scroll.
- **No cinematic page-load reveals** beyond opacity fade.
- **No looping background animations** (no gradient drifts, no
  "breathing" backgrounds).

### 11.5 Easing standard

The one explicit cubic-bezier in the code is
`[0.0, 0.0, 0.2, 1.0]` (Material Design "Standard Decelerate") on the
State-1 → State-2 transition in `/create`
([`app/create/page.tsx:1035`](app/create/page.tsx)). Everything else
relies on Tailwind / framer-motion defaults (`ease-out` for most
transitions, framer's spring/tween defaults for `animate` props).

---

## 12. Specific page patterns

### 12.1 Landing — `/` ([`app/page.tsx`](app/page.tsx))

**Sections, top to bottom:**
1. Fixed translucent nav (`max-w-[1180px]`)
2. Hero — split 55/45, headline + product card mock ([`homepage-hero.tsx`](app/homepage-hero.tsx))
3. Gallery — 3-col grid of real `/m/[slug]` memorials
4. How it works — 3 steps, big serif numerals as scaffolding
5. Anniversary — phone-frame email mockup, copy-left
6. Rainbow Bridge story — type-left, memorial card right
7. FAQ — 5 items, accordion ([`homepage-faq.tsx`](app/homepage-faq.tsx))
8. Dark finale CTA — full-width band on `#2A1F18`, large serif
   headline, single primary CTA
9. Footer on `--color-background-alt`

**Hero CTA:** `Make their tribute` — primary, `min-h-[56px]`, with the
13-px hairline microcopy `Free preview — no signup needed` below.

**Distinctness:** the only page with the fixed nav. The only page that
uses the dark finale block. Section padding escalates downward
(60 → 80 → 80 → 80 → 80 → 120 → 100), creating a slow exhale before
the final CTA.

### 12.2 Create — `/create` ([`app/create/page.tsx`](app/create/page.tsx))

**Two states:**

- **State-1 — Upload-first.** Two-column grid (`lg:grid-cols-[1fr_1.1fr]`).
  Left: heading + upload drop zone + 4 form inputs (`Input` component).
  Right: empty 9:16 placeholder card with PawPrint icon and the line
  "Upload a photo to see their tribute appear". Sticky on desktop.
- **State-2 — Editing.** Vertical stack on mobile (preview-first),
  2-column grid on lg+ (form left, preview right, equal heights). Form
  fields use `MinimalField` (borderless underline). Template picker
  scrolls horizontally on mobile, equal-width on desktop. Format toggle
  pill. Two stacked CTAs — primary `Get full memorial — $24.99`,
  secondary `Download free preview`.

**Header:** custom; includes a 3px progress bar that fills from 50% to
85% on photo upload.

**Crop modal:** see §6.11. Triggers between file pick and upload.

**Live render:** debounced 400ms POST to `/api/render` whenever any
input changes. The render result fades over the preview canvas.

**Distinctness:** the only page with `lg:h-screen lg:overflow-hidden` —
on desktop, no scroll. Everything fits in one viewport so the form and
preview track each other.

### 12.3 Memorial — `/m/[slug]` ([`app/m/[slug]/memorial-client.tsx`](app/m/[slug]/memorial-client.tsx))

**Sections:**
1. Bordered header (`max-w-[1080px]`, brand mark only)
2. Hero — rendered memorial image inside a `shadow-memorial`-cradled
   white card, name in clamped serif 36–48px, dates in display 18px
3. Share button (desktop: top-right of the hero block; mobile:
   centered below dates)
4. Tab nav — `Memorial` / `Guestbook` with 2px underline indicator
5. Tab content — depends on tab; both wrap in `max-w-[600px]`
6. Bottom-CTA strip on `--color-background-alt` (the "Lost your own
   pet?" softener)
7. Italic-display footer with three text links

**Distinctness:** the page belongs to *one pet*. Every hardcoded
text reference uses the dynamic `petName` ("Share a memory of
{petName}", "Memorial for {petName}"). The page never says "Rainbow
Memorial" in the body; the brand mark is just the wordmark in the
header and the small "Created via rainbow.memorial" in the footer.

### 12.4 Rainbow Bridge — `/rainbow-bridge` ([`app/rainbow-bridge/page.tsx`](app/rainbow-bridge/page.tsx))

**Layout:**
- `<main>` carries `var(--color-background)` background and sets the
  whole page font-family to display serif inline.
- `<article class="rb-article">` wraps everything in a 680px column
  with `px-6 py-16 md:py-24`.
- Sections separated by `mt-14 mb-6` headings and
  `space-y-6` paragraph groups.
- JSON-LD `Article` schema is rendered as a `<script
  type="application/ld+json">` directly before `<main>`.
- Footer: an `<hr>` rule with `borderColor: var(--color-border)`,
  then a `space-y-5 italic` block citing Marty Tousley, Wallace Sife,
  Lap of Love, Paul Koudounaris, *National Geographic*.

**Distinctness:** no header, no footer chrome, no CTA strip. The
article is the entire experience. The single in-article CTA link
(`Make a memorial for your pet →`) appears mid-flow under "Make a
small image" — never at the top, never repeated.

**Child pages:**
- `/rainbow-bridge/dogs`
- `/rainbow-bridge/short-version`
- `/rainbow-bridge/who-wrote-the-rainbow-bridge-poem`

Each follows the same `<article class="rb-article">` shell. Content
varies; chrome doesn't.

### 12.5 Success — `/success` ([`app/success/page.tsx`](app/success/page.tsx))

Three sub-states routed by query params:
- `?order_id&payment_id&signature` → `<SuccessVerifying>`
- `?slug=` but no render yet → `<SuccessPending>`
- `?slug=` with render ready → `<SuccessClient>`
- No params at all → redirect to `/`

The 404-ish "We couldn't find that tribute." state uses
`max-w-[400px]` + 28px display serif headline + text-secondary body.
I did not read `success-client.tsx`, `success-pending.tsx`,
`success-verifying.tsx` in detail — verify before extending those
patterns.

---

## 13. What NOT to do (anti-patterns)

The codebase enforces these by convention, not by lint. Treat them as
hard constraints.

- **No purple** — not as fill, not as gradient stop, not as accent.
- **No emoji in product UI.** The only emoji-like glyphs are the
  middot `·` separator in the memorial footer and the curly quotes
  `&ldquo;…&rdquo;` around tribute lines. No 🌈, no 🐾, no ❤️. If a
  customer writes one in their tribute line, that's their decision.
- **No "we" marketing language.** No "Our mission", no "Why we built
  this". The single first-person plural that's allowed is the
  Rainbow-Bridge footer signed *Hannah Wright, on behalf of Rainbow
  Memorial* — and it owes that to the editorial context.
- **No corporate stock photography.** Customer photos and the rendered
  templates are the only photographic content. The hero preview uses
  an Unsplash dog as a stand-in for "a customer's pet would appear
  here" — that is the boundary. No abstract people-in-offices stock
  shots ever.
- **No high-contrast aggressive CTAs.** No bright red, no flashy
  yellow. Primary is the muted terracotta, full stop.
- **No multiple primary CTAs on one screen.** One primary, optional
  secondary, no more.
- **No popups, modals, or banners that the user did not invite.** The
  only modal is the crop modal — triggered by file selection. The
  only banner is the share toast — triggered by tapping Share.
- **No countdowns, no scarcity, no fake activity counters.**
- **No social network logo soup.** No "Share to Twitter / Facebook /
  Pinterest" row. Share is OS-level via `navigator.share`, copy-link
  fallback only.
- **No "log in / sign up".** The product has no accounts.
- **No skeleton loaders that look like content.** The empty preview
  card uses an explicit PawPrint icon and the line "Upload a photo to
  see their tribute appear" — a stated emptiness, not a fake-shimmer.
- **No infinite scroll.** No autoplay carousels. No pagination
  controls ("1, 2, 3, …, 12") for the memorial gallery — it shows
  exactly the V1 set chosen by the seed script.
- **No newsletter footer signup.** The footer has Contact / Privacy /
  Terms and the brand mark. That is the whole footer.
- **No "as seen in" press logo row.**
- **No customer-count vanity metric** ("Trusted by 12,847 pet
  parents"). Banned.
- **No third-person mentions of the brand inside body copy.** Body
  copy speaks *as* a person, not *about* "Rainbow Memorial does X".

---

## 14. File & naming conventions

### 14.1 `app/` directory shape

```
app/
├── layout.tsx                root <html> shell, metadata only
├── globals.css               tokens, base type, .rb-article overrides
├── page.tsx                  homepage (Server Component)
├── homepage-hero.tsx         client island for hero
├── homepage-faq.tsx          client island for FAQ
├── robots.ts
├── sitemap.ts
├── fonts/                    (folder — not currently used)
├── create/
│   └── page.tsx              creator form, 2-state machine
├── m/
│   └── [slug]/
│       ├── page.tsx          server component, DB lookup + metadata
│       └── memorial-client.tsx
├── rainbow-bridge/
│   ├── page.tsx              main article
│   ├── dogs/page.tsx
│   ├── short-version/page.tsx
│   └── who-wrote-the-rainbow-bridge-poem/page.tsx
├── success/
│   ├── page.tsx              server router
│   ├── success-client.tsx
│   ├── success-pending.tsx
│   └── success-verifying.tsx
└── api/
    ├── candle/
    ├── checkout/
    ├── cron/
    ├── finalize/
    ├── health/
    ├── memory/
    ├── render/
    ├── upload/
    ├── verify-and-create/
    ├── warmup/
    └── webhook/
```

### 14.2 Component conventions

- UI primitives: `components/ui/<lowercase>.tsx` (button, input, card).
  PascalCase exports.
- Brand illustrations: `components/illustrations/<PascalCase>.tsx`.
- Page-specific islands sit next to their page (e.g.
  `app/page.tsx` + `app/homepage-hero.tsx` + `app/homepage-faq.tsx`).
  These are not promoted to `components/` until a second page needs
  them.
- Memorial page splits into `page.tsx` (server, DB + metadata) +
  `memorial-client.tsx` (client, interactive). Same pattern in
  `/success`.

### 14.3 URL conventions

- All URLs lowercase.
- Words separated by hyphens (`/rainbow-bridge`,
  `/who-wrote-the-rainbow-bridge-poem`).
- **No trailing slash.**
- Memorial slugs are `petname-bornYear-diedYear`
  (`charlie-2009-2024`). Once published, **never change** —
  external shares and the anniversary email reference these slugs.
- API routes mirror the resource: `/api/candle/[slug]`,
  `/api/memory/[slug]`.

### 14.4 Library / utility paths

- `lib/db.ts` — Neon serverless + Drizzle, lazy Proxy
- `lib/r2.ts` — Cloudflare R2 client
- `lib/render.tsx` — `@vercel/og` JSX renderer (note `.tsx`, not `.ts`)
- `lib/templates.ts` — template registry (canvas dims, zone
  coordinates, color overrides per template)
- `lib/stripe.ts`, `lib/razorpay.ts`, `lib/resend.ts` — lazy Proxies
- `lib/imageProcess.ts` — Sharp-based crop pipeline
- `lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`)

### 14.5 Tailwind composition

- `cn(...)` is the standard utility for combining classes. Always
  prefer it over string concatenation when there's any chance of
  conditional classes — `tailwind-merge` collapses duplicates
  intelligently (e.g. `cn("p-4", isLarge && "p-8")` resolves to `p-8`).
- Token-aware Tailwind classes (`text-text-primary`,
  `bg-background-alt`) are preferred over arbitrary brackets
  (`text-[--color-text-primary]`) — but both appear. Brackets are
  acceptable when paired with another arbitrary property nearby for
  visual symmetry. Either form is correct.

---

## Appendix A — Known inconsistencies (for cleanup, not for fixing here)

Recorded so future agents understand they're not bugs to fix while
doing unrelated work — but they exist and should be addressed in a
dedicated pass.

1. **Input focus ring is dusk-blue.** The `Input` component uses
   `focus:ring-[rgba(123,154,171,0.15)]` (dusk-blue tint left over from
   an earlier palette). Accent-primary is now terracotta `#C97B63`.
   The ring should derive from `rgba(201,123,99,0.15)`.
   File: [`components/ui/input.tsx:30`](components/ui/input.tsx).
2. **Lora and Caveat fonts are loaded but unused.** Imported via
   Google Fonts URL and exposed as Tailwind families, but no usage
   found in the pages I read. Candidates for removal from the import.
3. **Card component appears unused.** Each page composes card-like
   surfaces inline rather than importing `<Card>`. The component is
   either dead or kept as a future primitive — unclear.
4. **Button `ghost` and `destructive` variants appear unused** in the
   pages I read. Same question — kept as primitives or dead?
5. **Border radii vary** without an explicit token: `rounded-[20px]`
   (Card), `rounded-2xl` (16px — crop modal, memory card, compose box),
   `rounded-xl` (12px — Input, hero product card, memory card),
   `rounded-[10px]` (memorial card image, memorial hero render frame),
   `rounded-[8px]` (preview canvas), `rounded-[6px]` (template tile,
   email mini-render), `rounded-full` (buttons, format toggle, share
   button). No single ramp; each surface chose its own. There is one
   `--radius: 0.75rem` (12px) token in `globals.css` that maps to the
   default `borderRadius` in Tailwind config, but most components
   bypass it with arbitrary values.
6. **Hardcoded greys outside the token system** — see §2.3. `#5A5A5A`,
   `#888888`, `#2A2A2A` recur. Either promote to tokens or replace
   with `text-secondary` / `text-tertiary` / `text-primary` where the
   intent matches.
7. **Three header variants, three max-widths**
   (1180 / 1400 / 1080). Intentional per §5.4, but the visual
   difference between 1080 and 1180 is not deliberate — it might
   collapse to one number.
8. **`memory/MEMORY.md` recorded the old dusk-blue palette.** This
   doc supersedes that note.
9. **Two contact addresses appear in commits:** the user-facing one
   has been aligned to `hannah@rainbow.memorial` (per recent commit
   `362295b`), but verify any new code paths use the same address.

---

## Appendix B — Quick reference card

For agents who only need the cheat sheet:

```
BACKGROUND        #FAF6EF (cream)
ALT BACKGROUND    #F4EEE4 (warm sand)
SURFACE           #FFFFFF

TEXT PRIMARY      #2A1F18 (deep cocoa)
TEXT SECONDARY    #7A6A5C (warm stone)
TEXT TERTIARY     #A89B8B (light stone)

ACCENT            #C97B63 (warm terracotta)   <-- the one accent color
ACCENT HOVER      #B86850
ACCENT LIGHT      #FAE8E1

BORDER            #EDE3D5
ERROR             #C8786E (muted terracotta)

DISPLAY FONT      Cormorant Garamond (serif, weight 400, letter-spacing -0.02em)
BODY FONT         DM Sans (sans, weight 400/500/600)

H1 STANDARD       44px display / 1.1 / -0.02em
H1 HERO           44–72px clamp display
H2 STANDARD       32px display / 1.1 / -0.02em
BODY              16–17px DM Sans / 1.65
EDITORIAL BODY    17–19px display serif (.rb-article)

CTA               rounded-full, terracotta, white text, 52–56px tall, ONE per screen
INPUT (bordered)  white, 1.5px border, rounded-xl, 16px text, terracotta focus border
INPUT (underline) transparent, 1px bottom border, 15px text, terracotta focus border

CARD radii        10px (memorial), 16px (memory, modal), 20px (Card primitive)
SHADOWS           shadow-card | shadow-card-hover | shadow-memorial
ANIMATIONS        200ms color, 220ms ui, 400ms state change, 500ms progress
HOVER LIFT        -translate-y-0.5 (2px), shadow upgrade

EMOJI             never
PURPLE            never
"WE" LANGUAGE     never
COUNTDOWNS        never
FOLLOW BUTTON     never
SOCIAL PROOF      never
```

If you are an agent and you've read this far, you can build a Rainbow
Memorial page now. When in doubt, copy the rhythm of an existing page
— don't invent a new chrome.
