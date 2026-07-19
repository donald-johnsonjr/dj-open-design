# Kinected Design — conversion foundation

This is the working charter for turning this repository (formerly **Open Design**)
into **Kinected Design** — a fully-branded design product for **Kinected Solutions**
(kinected.io), built and maintained to gold-tier ("A+++") engineering and design
standards.

> Status: **Phase 0 — foundation.** Brand values below are a *proposal awaiting
> sign-off*. No destructive renames or product-chrome brand changes have been applied
> yet.

## Why

Kinected Solutions is an AI-powered digital-transformation and advisory practice for
purpose-driven organizations. This product gives Kinected a design tool that is (a)
fully its own brand, (b) engineered to a standard worth putting the Kinected name on,
and (c) staffed by specialist Claude sub-agents so quality is enforced by default, not
by memory.

## Two brand layers (know which you're touching)

1. **Product chrome** — the app's own look. Theme tokens live in
   `apps/web/src/styles/tokens.css`; wordmark/logo/tagline live in web components
   (`HomeHero.tsx`, sign-in, browser `<title>`); app identity lives in `package.json`
   product names, Electron bundle names, and the favicon.
2. **Design-system catalog** — `design-systems/<brand>/`, the brands the *tool applies
   to generated output*. A `design-systems/kinected/` brand lets the product emit
   Kinected-branded artifacts. Reference brands: `design-systems/apple/`,
   `design-systems/linear-app/`.

## Engineering standards (A+++)

Enforced, not aspirational. Full detail in `.claude/agents/kinected-principal-engineer.md`.
Headlines:

- `pnpm guard` + `pnpm typecheck` stay green; tests are package-scoped. (No ESLint/
  Prettier — a custom `scripts/guard.ts` harness + `tsc` is the gate.)
- TypeScript-first; residual-JS is allowlisted only.
- DRY / reuse-first; shared `@open-design/components` primitives over one-offs.
- Design tokens + colocated CSS Modules over hardcoded/inline styles (`style-policy` guard).
- Path aliases (`@/*`, `@open-design/*`) and app boundaries respected; `packages/contracts`
  stays pure TS.
- Every user-facing capability reachable via **web UI and `od` CLI**, same `/api/*` + DTO.
- Commits carry no co-author trailers.

## Sub-agent roster (`.claude/agents/`)

| Agent | Role |
| --- | --- |
| `kinected-principal-engineer` | Principal full-stack engineer — owns codebase health, DRY, tokens, shared components, green gates. |
| `kinected-design-engineer` | Principal designer + brand/UX + design engineer — Linear/Apple-grade craft, brand identity, design-system tokens. |

## Kinected brand — Proposal v0 (awaiting approval)

See `.claude/agents/kinected-design-engineer.md` for the full proposal. In short:
name **Kinected Design**; primary **"Kinected Cobalt" `#2F6BFF`** (replacing Open
Design's terracotta) with warm "Ember" `#F0603A` as a sparing counter-accent; neutral
grotesk type; minimal monoline connection logo mark. All provisional — redline freely.

## Phased roadmap

- **Phase 0 — Foundation (in progress):** these docs + the two sub-agents. ✅ files created.
- **Phase 1 — Product chrome rebrand:** swap wordmark, tagline, logo, and `--accent`/type
  tokens in `apps/web`; verify with a Playwright screenshot. *Non-destructive, reversible.*
- **Phase 2 — `design-systems/kinected/`:** author a full Kinected brand (manifest +
  DESIGN.md + tokens.css) so the tool emits on-brand output; guard-validated.
- **Phase 3 — Identity sweep:** rename remaining "Open Design" strings across package
  identity, Electron bundle names, favicon, and docs (uses the full inventory).
- **Phase 4 — Capability parity + polish:** confirm UI/CLI dual-track holds; craft pass
  on key surfaces (home hero, onboarding, empty states).

## Open decisions (change any by saying so in chat)

1. **Product name** — default **"Kinected Design"** (vs. "Kinected Studio" / "Kinected").
2. **Brand source** — default: design agent *proposes* identity for approval (vs. you
   provide exact hex/fonts/logo, or extract from kinected.io CSS).
3. **First-pass scope** — default: foundation-first (vs. include the visible chrome
   rebrand now, vs. full identity sweep).

## Running it locally (verified)

Requires **Node 24** (the repo hard-gates on it). In this environment Node 24 is at
`/opt/node24`. Web-only run avoids the Electron desktop path:

```bash
export PATH="/opt/node24/bin:$PATH"
export ELECTRON_SKIP_BINARY_DOWNLOAD=1   # Electron's binary download is proxy-blocked; not needed for web
pnpm install
pnpm tools-dev start web --daemon-port 7456 --web-port 7573 --json
# UI: http://127.0.0.1:7573/   (daemon /api on :7456)
pnpm tools-dev stop web
```

Screenshots are captured with the pre-installed Chromium via Playwright
(`executablePath: /opt/pw-browsers/chromium-1194/chrome-linux/chrome`, `--no-sandbox`).
