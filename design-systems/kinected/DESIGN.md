# Design System for Kinected

> Category: Digital Transformation & Advisory
> Kinected Solutions (kinected.io) — AI-powered transformation for purpose-driven
> organizations. Dark-first, editorial, premium: near-black navy canvas, high-contrast
> Didone serif with swash-italic violet accents, uppercase tracked mono labels, and a
> periwinkle→violet signature gradient. Technology in service of the why.

## 1. Visual Theme & Atmosphere

Kinected is a dark brand. The default canvas is a near-black navy (`#0A0A12`) carrying a
faint violet atmosphere — a large, very low-opacity radial glow behind the hero, never a
flat block. Against that quiet dark, the interface leads with type: an elegant, high-
contrast Didone serif for display, set large and confident, where a single word breaks
into *swash italic* in Kinected Violet. That one move — "amplify your *business*", "made
*beautiful*", "keeps the *why*" — is the signature of the whole system.

The mood is editorial and premium, closer to a considered print magazine than a typical
"AI" product. Where a lot of technology brands lean cold, synthetic, and grid-locked,
Kinected stays warm and human. Uppercase tracked monospace labels mark eyebrows, section
numbers, and metadata with quiet precision. Panels lift only barely off the canvas. The
name is *connected* plus *kinetic*: connection shows up as one accent tying every screen
together; kinesis shows up in the gradient CTA and the italic accent word — the few
moments that move. The result reads as trustworthy the way a well-made thing does — you
stop noticing the chrome and feel the care.

**Key characteristics:**
- Dark-first: near-black navy canvas (`#0A0A12`) with barely-lifted panels (`#14141F`)
- High-contrast Didone serif display (Playfair Display) — one accent word in swash *italic*
- Kinected Violet (`#7B7CF5`) as the single product signal: accent word, links, focus, CTA
- Periwinkle→violet signature gradient on the primary CTA pill (tracked white label + arrow)
- Uppercase tracked monospace labels (JetBrains Mono) for eyebrows, indices, and metadata
- A cool violet-tinted text ramp (`#EDECF2 → #B7B6C6 → #8A8A9C → #5A5A6C`)
- Restraint over decoration: hierarchy from serif scale, space, and one accent — not boxes

## 2. Color Palette & Roles

### Primary
- **Canvas** (`#0A0A12`): The near-black navy page background and the identity itself — a deep, cool base with a faint violet cast, never pure black.
- **Kinected Violet** (`#7B7CF5`): The core brand signal. The swash-italic accent word, links, active states, focus rings, and the label color for the gradient CTA. Reserved for the single highest-value moment in a view.
- **Violet Deep** (`#6A6BEA` hover / `#5B5CE0` active): Pressed and hovered states — the accent gaining weight, not changing hue.

### Signature Gradient
- **Periwinkle→Violet** (`linear-gradient(96deg, #3B4DE8 0%, #7C6BF0 55%, #9B7CF0 100%)`): The brand's kinetic gesture — a full gradient pill for the primary CTA ("SEND MESSAGE →") with a white tracked mono label and an arrow. Also the logo's gradient. It is the one place color is allowed to move; keep it to a single hero action per view. Not a schema token — it lives as a fixture/component literal so the token `:root` stays schema-clean.

### Counter-accent (design-system only)
- **Periwinkle-violet** (`#9B7CF0`): The warm, lighter end of the brand gradient, exposed as the `--accent-warm` C-extension. Used sparingly for kinetic, human moments (a "Kinetic" badge, a highlight). It is never a second call to action and never competes with the primary violet.

### Surface & Background
- **Canvas** (`#0A0A12`): The primary page background.
- **Panel** (`#14141F`): The elevated surface for cards, modals, and containers — lifted just enough to read as a plane.
- **Subtle** (`#101019`): A quieter tier for inset wells, input tracks, and code blocks — layering without a hard edge.

### Neutrals & Text
- **Text** (`#EDECF2`): Primary near-white text.
- **Body-2** (`#B7B6C6`): Secondary text — dense body copy and sub-headings.
- **Muted** (`#8A8A9C`): Captions and secondary UI text — meets AA on canvas.
- **Meta** (`#5A5A6C`): Metadata, timestamps, and placeholders.
- **Border** (`#242433`): Default border and card edge.
- **Border Soft** (`#1A1A26`): Inner separators that should recede.

### Semantic (tuned for dark)
- **Success** (`#3DD68C`): Confirmations and healthy status.
- **Warn** (`#E7B549`): Caution and needs-attention states.
- **Danger** (`#F2555A`): Destructive actions and errors.

## 3. Typography Rules

- **Display / headings:** `"Playfair Display", Georgia, "Times New Roman", serif`, weight ~500 — a high-contrast Didone serif that carries the editorial voice. Self-host via `@fontsource/playfair-display` (roman + italic) so no runtime font fetch is required.
- **Body / UI:** `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`, weight 400 — clean, neutral, and modern under the serif.
- **Mono / labels:** `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` — every uppercase tracked eyebrow, section index (`01 / 02`), badge, form label, and CTA label.
- **Scale (px):** 12 · 14 · 16 · 19 · 26 · 34 · 48 · 72. The hero uses the display XL (`72`) serif; editorial sizes breathe.
- **Line-height:** 1.6 for body (generous, comfortable reading), 1.05 for display and headings (tight, engineered).
- **Letter-spacing:** `-0.015em` on display sizes for gentle optical tightening — a high-contrast serif needs less than a grotesk. Mono labels track *open* at `0.10–0.16em`.
- **The signature move:** in a display headline, set exactly one word in swash *italic* + `--accent`. Never two; the accent word is a scalpel, not a highlighter.
- **Case:** Sentence case for serif headings; UPPERCASE reserved for mono eyebrows, indices, labels, and CTA text.

## 4. Component Stylings

- **Primary CTA (gradient pill):** fully rounded (`--radius-pill`), the periwinkle→violet gradient fill, a white uppercase tracked mono label (`--accent-on`), and a trailing arrow. A soft violet glow on hover (`filter: brightness(1.08)`); active dims slightly. This is the one place the gradient appears — the single hero action.
- **Secondary button:** transparent fill, 1px `--border`, gaining a violet border and label on hover.
- **Cards:** `--surface` panel, 1px `--border`, 10px radius, 24px interior. Flat by default; the raised tier uses the black-based two-layer `--elev-raised` shadow with a softened border.
- **Inputs:** `--surface-warm` well, 1px border, 8px radius, mono uppercase label above, `--meta` placeholder. Focus swaps the border to violet and adds the violet `--focus-ring`.
- **Eyebrow / index:** uppercase tracked mono — eyebrows in `--muted`, section indices (`01`) in `--accent`.
- **Pull-quote / callout:** left 2px violet bar + italic serif — the case-study voice.
- **Badges:** pill radius, violet-tinted fill and border for status; the `kinetic` variant uses `--accent-warm` strictly for human/kinetic labels.

## 5. Layout Principles

- 12-column grid, 1200px max content width, 32px desktop gutters.
- Section rhythm: 112px top+bottom on desktop, 72px tablet, 48px phone — editorial breathing room.
- Whitespace and the dark canvas are the primary separators. Dividers appear only between unrelated top-level sections.
- Content is top-biased, never vertically centered in tall regions; the hero occupies 50–70vh so the display serif can be large.
- One accent moment per screen — pick the single action that matters most and let violet (and, once, the gradient) mark it.

## 6. Depth & Elevation

Depth is quiet and lives in the dark:
- **Flat (0):** the default for cards — structure from the 1px `--border` against the canvas.
- **Raised (1):** dropdowns, modals, and the raised card tier use `--elev-raised`, a **black-based** two-layer shadow (`1px` contact + `20px/48px` ambient). On a dark theme, shadows are black — never a light glow keyed off the text color.
- **Atmosphere:** the hero's faint violet radial glow reads as depth without a shape. `--elev-ring` gives a 1px hairline for focus-adjacent framing. No neumorphism, no glassmorphism, no heavy shadows.

## 7. Motion & Interaction

- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` — the repo `--ease-out` contract. Built-in `ease` is too weak; `ease-in` is banned for UI because it feels sluggish.
- **Duration:** asymmetric — enter ~200ms (`--motion-base`), exit ~140ms (`--motion-fast`). Dismissal reads as decisive because the user already chose it.
- **Disclosure:** accordions animate `grid-template-rows: 0fr → 1fr` with an opacity fade; never animate from `transform: scale(0)` — start at `0.9` or higher.
- **Focus:** every interactive element shows the violet `--focus-ring` on `:focus-visible`; focus is never suppressed.

## 8. Do's and Don'ts

- ✅ Keep the canvas dark by default — dark is the identity, not a mode.
- ✅ Set exactly one word of a headline in swash *italic* + violet; let the serif and space carry the rest.
- ✅ Reserve the gradient pill for the single hero CTA per view.
- ✅ Use uppercase tracked mono for eyebrows, indices, labels, and CTAs.
- ✅ Use the periwinkle-violet `--accent-warm` sparingly, and only for kinetic/human moments.
- ❌ No pure-black canvas and no pure-white text — stay in the violet-tinted navy ramp.
- ❌ No grotesk display face and no cobalt-on-white; that was the wrong earlier guess.
- ❌ No light-glow shadows on dark; elevation shadows are black-based.
- ❌ Do not introduce hex values outside this palette — surface a warning and use the closest token.

## 9. Agent Prompt Guide

- Start dark. The default surface is `--bg` (`#0A0A12`); build up from the navy, don't invert to white.
- Treat violet as scarce: at most one accent word, one gradient CTA, and the focus/link states per screen.
- The signature is the *serif + one swash-italic violet word*. If a headline has no accent word, it isn't finished; if it has two, the hierarchy is wrong.
- The gradient (`linear-gradient(96deg, #3B4DE8, #7C6BF0, #9B7CF0)`) is the CTA pill and the logo — not a background wash. Keep it to one hero action.
- `--accent-warm` (`#9B7CF0`) is design-system-only and rare — a spark, not a system.
- Voice for any generated copy: warm, precise, human, purpose-driven — "technology in service of the why." Write real, specific microcopy; never lorem or generic filler.
- Honor the motion contract exactly: `--ease-standard`, asymmetric enter/exit, grid-row accordions.
- Do not invent hex values outside this palette. If the brief truly needs one, surface a warning comment in the artifact and fall back to the nearest existing token.
