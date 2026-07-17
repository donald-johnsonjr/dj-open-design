# Kinected Design — brand token contract (v2, from real brand)

Supersedes v1. v1 ("Kinected Cobalt" on white, grotesk) was a guess made before we
could see kinected.io and was **wrong**. This v2 is derived directly from the real
Kinected Solutions brand (logo + 6 site screenshots the founder provided). Both the
product chrome (`apps/web`) and the design-system (`design-systems/kinected/`) must be
rebuilt to THIS. Study the references before implementing:

- Logo: `/tmp/claude-0/-home-user-dj-open-design/b0786aeb-f6d2-59c9-b1ae-d62da204caee/scratchpad/kinected-logo.png`
- Site screenshots: `/root/.claude/uploads/b0786aeb-f6d2-59c9-b1ae-d62da204caee/ea60de83-1000047431.jpg`, `f3b129ce-1000047433.jpg`, `a2528afd-1000047435.jpg`, `9501d45c-1000047437.jpg`, `ac55854e-1000047439.jpg`, `4c70c60e-1000047441.jpg`

## The essence (what makes it feel like Kinected)

1. **Dark-first, editorial, premium.** Near-black navy canvas with a faint violet
   atmosphere. This is the DEFAULT theme — Kinected is a dark brand. (Ship a light theme
   too, but dark is the identity and the default.)
2. **High-contrast Didone serif display with swash-italic violet accent words.** The
   signature move: a headline in an elegant high-contrast serif where ONE word is set in
   *swash italic* in the violet accent ("amplify your *business*", "made *beautiful*",
   "premium barbering, *re-imagined*", "keeps the *why*").
3. **Uppercase tracked monospace labels** as eyebrows, section markers, numbers, and
   metadata ("TECHNOLOGY IN SERVICE OF THE WHY", "01 / 02 / 03", "CASE STUDY •",
   "KINECTED ORIGINAL"). Letter-spacing ~0.12–0.18em.
4. **Periwinkle→violet gradient** — on the logo and the signature **gradient pill CTA**
   (the "SEND MESSAGE →" button: a full gradient pill, white tracked label, arrow).
5. **Warm, purpose-driven voice.** "Technology in service of the why."

## Logo & wordmark

- **Use the REAL logo** (the head-profile + neural-mesh + orbital ring in a blue→violet
  gradient) from the path above — do NOT keep the invented node mark. Process it into:
  a favicon/app-icon (mark on a subtle dark rounded tile, like the site header), and an
  on-dark inline mark (transparent background — the provided PNG is on white, so key out
  the white or composite onto the dark tile; verify no white halo).
- **Wordmark lockup** (mirror the site): "**Kinected**" in the display serif, with
  "**DESIGN**" set beneath/beside it in tracked violet monospace (the site uses
  "Kinected / SOLUTIONS" — our product is "Kinected / DESIGN").

## Type (self-host — runtime network is blocked, no Google Fonts fetch)

Install via `@fontsource/*` from npm (registry.npmjs.org is allowlisted) or `next/font/local`:
- **Display serif** — `Playfair Display` (roman + italic; high-contrast Didone with swash
  italic — the closest free match to the site's serif). Token `--display`.
- **Body/UI sans** — `Inter` (clean neutral grotesk). Token `--sans` / `--font-body`.
- **Mono/labels** — `JetBrains Mono` (uppercase tracked labels). Token `--mono`.

## Color — DARK (default/primary; tune against the screenshots)

| Role | Token | Value |
| --- | --- | --- |
| Canvas (near-black navy) | `--bg`, `--bg-app` | `#0A0A12` |
| Subtle / muted surface | `--bg-subtle`, `--bg-muted` | `#101019`, `#161622` |
| Panel / elevated (cards) | `--bg-panel`, `--bg-elevated` | `#14141F` |
| Border / strong / soft | `--border`, `--border-strong`, `--border-soft` | `#242433`, `#37374D`, `#1A1A26` |
| Text / strong | `--text`, `--text-strong` | `#EDECF2`, `#FFFFFF` |
| Text muted / soft / faint | `--text-muted`, `--text-soft`, `--text-faint` | `#B7B6C6`, `#8A8A9C`, `#5A5A6C` |
| **Accent — Kinected Violet** | `--accent` | `#7B7CF5` |
| Accent strong / hover | `--accent-strong`, `--accent-hover` | `#6A6BEA` |
| Accent soft / tint (on dark) | `--accent-soft`, `--accent-tint` | `#1E1E3A`, `#15152B` |
| **Signature gradient** (CTA, accents) | `--accent-grad` | `linear-gradient(96deg, #3B4DE8 0%, #7C6BF0 55%, #9B7CF0 100%)` |
| Link | `--selected` | `#6C7CF5` |

- Faint hero atmosphere: a large, very low-opacity radial violet glow
  (`radial-gradient(... rgba(124,107,240,0.14), transparent 60%)`) behind the hero — never
  a flat block. Keep it subtle.

## Color — LIGHT (secondary theme; keep parity)

Cool near-white canvas `#FAFAFC` / panel `#FFFFFF`; text `#14141C`/muted `#565566`;
borders `#E5E5EE`/`#CFCFDD`; same violet accent `#5B5CE0` (slightly deepened for AA on
white); same gradient for CTAs.

## Signature component treatments

- **Primary CTA** = the gradient pill (`--accent-grad`, white text, subtle glow on hover).
  Apply to the hero "Send" action and primary buttons. Add a `primary` variant path in
  `@open-design/components` Button that uses the gradient (token-driven), rather than a
  one-off.
- **Eyebrow** = uppercase mono label in `--text-soft`, letter-spacing 0.16em, above hero
  and section headings.
- **Hero headline** = `--display` serif, with one word in swash *italic* + `--accent`
  color (e.g. "What will you design with your agent *today*?"). Verify by screenshot.
- **Quote/callout** = left violet bar + italic serif (see the case-study pull-quotes).

## Shape & motion (reuse repo contract)

Radii 8–14; the CTA pill is fully rounded. Motion `--ease-out: cubic-bezier(0.23,1,0.32,1)`,
enter ~200ms / exit ~140ms.

## Guardrails

- `pnpm guard` + `pnpm typecheck` (or `pnpm --filter @open-design/web typecheck`) stay green.
- Tokens only — no hardcoded colors / inline styles; reuse `@open-design/components`; add
  a token-driven gradient variant to `Button` rather than a one-off.
- Dark is default; keep light-theme parity for every changed color. WCAG AA on both.
- Design-system `tokens.css` must keep the FULL schema key-set (swap values only; the
  `--accent-warm` C-extension can hold a supporting hue).
- Fonts must be self-hosted (no runtime Google fetch).
