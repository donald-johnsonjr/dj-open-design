# Design System for Kinected

> Category: Digital Transformation & Advisory
> Kinected Solutions (kinected.io) — AI-powered transformation for purpose-driven
> organizations. Cobalt signal, cool-neutral surfaces, grotesk display. Warm,
> precise, human, trustworthy.

## 1. Visual Theme & Atmosphere

Kinected reads like a modern product built by people who take care. The mood is
calm confidence: a cool, near-white canvas (`#FAFBFC`) that steps back so content
can lead, true-white panels that lift only where structure demands it, and a single
saturated blue that appears exactly where the eye should go next. The name is
*connected* plus *kinetic* — the design honors both. Connection shows up as clean
alignment, shared rhythm, and one accent that ties every screen together; kinesis
shows up in restraint elsewhere so the few moments that move actually feel alive.

Where a lot of "AI" products lean cold and synthetic, Kinected stays human. The
neutrals are cool but never clinical, the type is a friendly grotesk rather than a
hard geometric, and the warm Ember counter-accent (`#F0603A`) is held in reserve for
the rare human, kinetic moment — a highlight, a connection mark, a spark of
personality — never as a competing call to action. The result feels trustworthy the
way good infrastructure does: you stop noticing it and just build.

**Key characteristics:**
- Cool canvas (`#FAFBFC`) with true-white panels (`#FFFFFF`) — surfaces recede, content leads
- Kinected Cobalt (`#2F6BFF`) as the single product signal: one high-intent action per view
- Ember (`#F0603A`) as a sparing, design-system-only warm counterpoint — never a second CTA
- A four-step cool-neutral text ramp (`#14161B → #2B303B → #565D6B → #838A97`)
- Neutral grotesk display (Inter / General Sans) over a refined system body stack
- Linear-ish 8–12px radii and a disciplined 8px spacing rhythm
- Restraint over decoration: hierarchy from type scale and space, not borders and boxes

## 2. Color Palette & Roles

### Primary
- **Ink** (`#14161B`): Primary text and the darkest structural tone — a near-black with a faint cool cast, never pure black.
- **Kinected Cobalt** (`#2F6BFF`): The core brand signal. Primary CTAs, links, active states, focus rings. Reserved for the single highest-value action in a view.
- **Cobalt Deep** (`#2456DB` hover / `#1D46B8` active): Pressed and hovered states for cobalt surfaces — the accent gaining weight, not changing hue.

### Counter-accent (design-system only)
- **Ember** (`#F0603A`): A warm, kinetic counterpoint used sparingly for highlights, connection marks, and human moments. Exposed as the `--accent-warm` C-extension token. It is never a second call to action and never enters product chrome, where cobalt is the sole accent.

### Surface & Background
- **Canvas** (`#FAFBFC`): The primary page background — a cool near-white that lets panels and cobalt read cleanly.
- **Panel** (`#FFFFFF`): True-white surface for cards, modals, and elevated containers.
- **Surface Warm** (`#F4F6F8`): A subtle tertiary tier for inset wells, input tracks, and code blocks — quiet layering without a hard edge.

### Neutrals & Text
- **Ink** (`#14161B`): Primary text.
- **Slate** (`#2B303B`): Secondary text — dense body copy and sub-headings.
- **Muted** (`#565D6B`): Captions and secondary UI text — meets AA on canvas.
- **Meta** (`#838A97`): Metadata, timestamps, and placeholders.
- **Border** (`#E3E7EC`): Default border and card edge.
- **Border Soft** (`#EEF1F5`): Inner row separators that should recede.

### Semantic
- **Success** (`#12A150`): Confirmations and healthy status.
- **Warn** (`#E0A100`): Caution and needs-attention states.
- **Danger** (`#E5484D`): Destructive actions and errors.

### Gradient System
- Kinected is essentially gradient-free. Depth comes from the interplay of cool canvas, true-white panels, and one signal color — not from color washes. The only sanctioned gradient is a restrained cobalt → cobalt-at-80% on a single hero moment, used rarely.

## 3. Typography Rules

- **Display / headings:** `"Inter", "General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`, weight 600. A neutral grotesk that reads modern and product-native — no bundled font file required; it falls back to the platform UI face.
- **Body / UI:** `-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, Helvetica, Arial, sans-serif`, weight 400 — a refined system stack for crisp, familiar reading.
- **Mono:** `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` — used by `kbd`, code, and tabular metrics.
- **Scale (px):** 12 · 14 · 16 · 18 · 24 · 32 · 44 · 64.
- **Line-height:** 1.6 for body (generous, comfortable reading), 1.1 for display and headings (tight, engineered).
- **Letter-spacing:** `-0.02em` on display sizes for optical tightening. Body stays at the natural tracking.
- **Case:** Sentence case for headings by default; title case only for brand names. Uppercase reserved for the small cobalt eyebrow (`0.08em` tracking).

## 4. Component Stylings

- **Buttons:** 8px radius, 10px block padding, 16px inline padding, weight 600. Primary = cobalt fill with white label (`--accent-on`); hover deepens to `#2456DB`, active to `#1D46B8`. Secondary = 1px border on white, gaining a cobalt border and label on hover.
- **Cards:** White panel, 1px `--border`, 10px radius, 24px interior. Flat by default; the raised tier uses the soft two-layer `--elev-raised` shadow and a softened border.
- **Inputs:** 1px border, 8px radius, 10px vertical padding, `--meta` placeholder. Focus swaps the border to cobalt and adds the cobalt `--focus-ring`.
- **Links:** Cobalt, no underline at rest, underline on hover; keyboard focus shows the cobalt focus ring.
- **Badges:** Pill radius, cobalt-tinted fill for status; the Ember variant uses an `--accent-warm` tint strictly for kinetic/human labels.

## 5. Layout Principles

- 12-column grid, 1200px max content width, 32px desktop gutters.
- Section rhythm: 96px top+bottom on desktop, 64px tablet, 40px phone.
- Whitespace is the primary separator. Dividers appear only between unrelated top-level sections.
- Content is top-biased, never vertically centered in tall regions; a hero occupies 40–60vh.
- One accent moment per screen — pick the single action that matters most and let cobalt mark it.

## 6. Depth & Elevation

Two levels, both quiet:
- **Flat (0):** the default for cards and surfaces — structure from the 1px border alone.
- **Raised (1):** dropdowns, modals, and floating actions use `--elev-raised`, a soft two-layer shadow (`1px` contact + `10px/28px` ambient) mixed from Ink at high transparency so it stays cool and subtle.
- `--elev-ring` provides a 1px hairline ring for focus-adjacent framing. No neumorphism, no glassmorphism, no heavy drop shadows.

## 7. Motion & Interaction

- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` — the repo `--ease-out` contract. Built-in `ease` is too weak; `ease-in` is banned for UI because it feels sluggish.
- **Duration:** asymmetric — enter ~200ms (`--motion-base`), exit ~140ms (`--motion-fast`). Dismissal reads as decisive because the user already chose it.
- **Disclosure:** accordions animate `grid-template-rows: 0fr → 1fr` with an opacity fade; never animate from `transform: scale(0)` — start at `0.9` or higher.
- **Focus:** every interactive element shows the cobalt `--focus-ring` on `:focus-visible`; focus is never suppressed.

## 8. Do's and Don'ts

- ✅ Let whitespace and type scale carry hierarchy — subtract before you add.
- ✅ Reserve cobalt for the one highest-signal action per view.
- ✅ Use Ember sparingly, and only for human/kinetic highlights — never as a second button.
- ✅ Keep neutrals cool and consistent; use the four-step text ramp for hierarchy.
- ❌ No pure black text or pure-white page backgrounds.
- ❌ No gradients beyond a single restrained cobalt hero moment.
- ❌ No drop shadows on inputs; no more than three type sizes competing on one screen.
- ❌ Do not introduce hex values outside this palette — surface a warning and use the closest token.

## 9. Agent Prompt Guide

- When in doubt, subtract. Fewer boxes, less chrome, more space.
- Treat cobalt as a scarce resource: at most one hero accent and one CTA accent per screen.
- Ember (`--accent-warm`) is design-system-only and rare — a spark, not a system. If a layout needs two "important" colors, the hierarchy is wrong; fix the hierarchy instead.
- Voice for any generated copy: warm, precise, human, trustworthy — confident, not cold. Write real, specific microcopy; never lorem or generic filler.
- Honor the motion contract exactly: `--ease-standard`, asymmetric enter/exit, grid-row accordions.
- Do not invent hex values outside this palette. If the brief truly needs one, surface a warning comment in the artifact and fall back to the nearest existing token.
