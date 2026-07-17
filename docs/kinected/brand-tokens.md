# Kinected Design — brand token contract (v1)

Single source of truth for the Kinected identity. Both the **product chrome**
(`apps/web/src/styles/tokens.css` + wordmark/logo/copy) and the **design-system**
(`design-systems/kinected/`) implement THESE values. Implement them; make only the
fine craft calls noted as "designer's call". Keep WCAG AA. Screenshot to verify.

## Identity & copy

- **Product name / wordmark:** `Kinected Design`
- **Company:** Kinected Solutions (kinected.io) — AI-powered digital transformation &
  advisory for purpose-driven organizations.
- **Hero subtitle** (replaces "The open-source Claude Design alternative."):
  `One brand system, connected to everything you build.`
- **Sign-in heading:** `Sign in to Kinected Design`
- **Voice:** warm, precise, human, trustworthy. Confident, not cold.
- **Logo mark:** minimal monoline **connection mark** — 2–3 nodes joined by a kinetic
  stroke (Kinected = connected + kinetic). Must read at 16px (favicon). Replace the
  current compass glyph. Keep the rounded-square lockup or go markless — designer's call,
  but it must feel intentional and modern (Linear/Vercel-grade), not clip-art.

## Color — light

| Role | Token(s) | Value |
| --- | --- | --- |
| Primary accent — **Kinected Cobalt** | `--accent` | `#2F6BFF` |
| Accent strong / hover / active | `--accent-strong`, `--accent-hover` | `#2456DB` |
| Accent soft (tint border) | `--accent-soft` | `#CFE0FF` |
| Accent tint (faint fill) | `--accent-tint` | `#EEF4FF` |
| Canvas / app bg | `--bg`, `--bg-app` | `#FAFBFC` |
| Panel | `--bg-panel`, `--bg-elevated` | `#FFFFFF` |
| Subtle / muted fills | `--bg-subtle`, `--bg-muted` | `#F4F6F8`, `#EBEEF2` |
| Border / strong / soft | `--border`, `--border-strong`, `--border-soft` | `#E3E7EC`, `#CBD2DB`, `#EEF1F5` |
| Text / strong | `--text`, `--text-strong` | `#14161B`, `#0B0C0F` |
| Text muted / soft / faint | `--text-muted`, `--text-soft`, `--text-faint` | `#565D6B`, `#838A97`, `#AEB4BF` |
| Selected (distinct from accent) | `--selected` | `#7A5AF8` (violet — keeps "primary CTA vs selected" separable now that the accent is blue) |
| Selected soft | `--selected-soft` | `rgba(122, 90, 248, 0.16)` |

Keep the existing semantic pills (`--green/--blue/--purple/--red/--amber` families) —
retune only if one now clashes with cobalt (designer's call; `--blue` sitting next to a
cobalt accent is the one to watch).

## Color — dark (parity required)

| Role | Value |
| --- | --- |
| accent / strong / hover | `#5B87FF` / `#7BA0FF` / `#7BA0FF` |
| accent soft / tint | `#17233D` / `#111A2E` |
| bg / panel / subtle / muted / elevated | `#0E1013` / `#16181D` / `#1B1E24` / `#23272E` / `#1B1E24` |
| border / strong / soft | `#262A31` / `#3A3F48` / `#1E2229` |
| text / strong / muted / soft / faint | `#E7EAEF` / `#F5F7FA` / `#9BA2AE` / `#6C737F` / `#4A5058` |
| selected / soft | `#9277FF` / `rgba(146, 119, 255, 0.18)` |

## Counter-accent (design-system only)

- **Ember** `#F0603A` — a warm, kinetic human counterpoint. Use sparingly for highlights
  in `design-systems/kinected/` (a C-extension token there, e.g. `--accent-warm`). Do
  NOT introduce a second accent into product chrome; cobalt is the single product accent.

## Type

- **Body/UI:** keep the existing refined system sans stack.
- **Display/headline:** grotesk, not serif — `"Inter", "General Sans", -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif` (falls back to SF/system; no bundled font
  file required). Applying this to the hero headline is in scope but must be verified by
  screenshot; if it regresses, keep the current display face and flag it.
- **Mono:** `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`.

## Shape & motion (reuse repo contract — do not invent)

- Radii: existing scale (`--radius-xs 4 / -sm 6 / 8 / -md 10 / -lg 12 / -pill 999`).
- Motion: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; enter ~200ms, exit ~140ms.

## Guardrails

- `pnpm guard` + `pnpm typecheck` (or `pnpm --filter @open-design/web typecheck`) stay green.
- Tokens only — no hardcoded colors / inline styles; reuse `@open-design/components`.
- Dark-mode parity for every product-chrome color changed.
- Design-system tokens.css must declare the FULL schema — copy an existing passing
  brand's token KEY set and swap values; do not add/remove keys.
