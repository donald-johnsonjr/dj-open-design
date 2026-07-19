# Anti-AI-slop rules

Concrete, checkable rules that distinguish "designed by a human who has
shipped product" from "default LLM output." This file is a rubric you
**self-audit against before you output**, not an essay to read once.

Several rules below are auto-enforced by the daemon's `lint-artifact`
linter — failing an enforced rule is not a style preference, it is a
regression. The rest are guidance for agents and reviewers and are
flagged inline as "(guidance, not auto-checked)" so the contract with the
linter stays honest.

> Adapted from [refero_skill](https://github.com/referodesign/refero_skill)
> (MIT), tightened to match Open Design's lint surface.

## The seven cardinal sins

These are the patterns the linter blocks at P0 (must-fix):

1. **Default Tailwind indigo as accent** — exactly `#6366f1`, `#4f46e5`,
   `#4338ca`, `#3730a3`, `#8b5cf6`, `#7c3aed`, `#a855f7`. The active
   `DESIGN.md` provides `--accent`; use it. Indigo is the textbook AI
   tell. (The daemon's `lint-artifact` flags any of these as a solid
   accent; keep this list in sync with `AI_DEFAULT_INDIGO` in
   `apps/daemon/src/lint-artifact.ts`.)
2. **Two-stop "trust" gradient on the hero** — purple→blue, blue→cyan,
   indigo→pink. A flat surface + intentional type beats this every
   time.
3. **Emoji as feature icons** — `✨`, `🚀`, `🎯`, `⚡`, `🔥`, `💡`
   inside `<h*>`, `<button>`, `<li>`, or `class*="icon"`. Use
   1.6–1.8px-stroke monoline SVG with `currentColor`.
4. **Sans-serif on display text when the seed binds a serif** — h1/h2
   must use `var(--font-display)`, not a hardcoded Inter / Roboto /
   `system-ui`.
5. **Rounded card with a colored left-border accent** — the canonical
   "AI dashboard tile" shape. Drop either the radius or the left
   border.
6. **Invented metrics** — "10× faster", "99.9% uptime", "3× more
   productive". Either pull from a real source or use a labelled
   placeholder.
7. **Filler copy** — `lorem ipsum`, `feature one / two / three`,
   `placeholder text`, `sample content`. An empty section is a design
   problem to solve with composition, not by inventing words.

## Soft tells (P1 — should fix)

- **Standard "Hero → Features → Pricing → FAQ → CTA" sequence with no
  variation** *(guidance, not auto-checked)*. This is the AI-template
  skeleton; introduce at least one unconventional section (testimonial
  wall as full-bleed quote, pricing as comparison-against-status-quo,
  an inline mini-product-demo).
- **External placeholder image CDNs** (`unsplash.com`, `placehold.co`,
  `placekitten.com`, `picsum.photos`). Fragile and obvious. Use the
  shipped `.ph-img` placeholder class.
- **More than ~12 raw hex values outside `:root`.** Tokens were not
  honoured.
- **`var(--accent)` used 6+ times in the rendered body.** Cap at 2
  visible uses per screen.
- **ALL CAPS without positive tracking** — auto-checked; see
  `typography.md` for the `0.06em` floor.

## Polish tells (P2 — nice to fix)

- **Sections without `data-od-id`** — comment mode can't target them.
- **Decorative blob / wave SVG backgrounds** *(guidance, not
  auto-checked)* — meaningless geometry.
- **Perfect symmetric layout with no visual tension** *(guidance, not
  auto-checked)* — alternating density (one tight section, one
  breathing section) reads as intentional.

## The extended slop-tell catalog (guidance, not auto-checked)

The seven cardinal sins are the ones the linter can see. These are the
rest of the tells a principal designer catches by eye. If any is true of
your output, it reads as AI-generated — fix it before shipping.

**Color & surface**

- More than **one** accent hue competing for attention. Three "brand"
  colors fighting is the loudest tell after indigo. One accent, period;
  semantic colors (success/warn/danger) don't count as accents.
- **Glassmorphism by default** — frosted `backdrop-filter: blur()` cards
  stacked on a busy background because it "looks modern." Use it only
  when there is real depth to communicate, never as the base surface.
- **Drop-shadow on everything** — every card, button, and input wearing
  the same `0 4px 12px rgba(0,0,0,.1)`. Elevation is hierarchy; if it's
  everywhere it means nothing. Prefer hairline borders; reserve shadow
  for the one layer that truly floats (menu, popover, dragged item).
- **Neon-on-dark "dashboard" cliché** — saturated cyan/magenta/lime data
  viz on near-black. Muted, spaced categorical colors read as considered.
- Gradients used to **decorate empty space** rather than to separate two
  real hierarchies.

**Layout & composition**

- **Center-everything** — every section `text-align: center`, max-width
  narrow, stacked. Real product UI earns a left edge and an alignment
  grid; center alignment is for short hero statements, not body content.
- **The hero + exactly three feature cards** in a perfectly even row,
  each with an icon-on-top / heading / one-line-body. The most-generated
  block on the internet. Break the count, the symmetry, or the rhythm.
- **Off-scale spacing** — `13px`, `17px`, `23px` gaps chosen ad hoc.
  Every gap must come from one spacing scale (see the positive directives
  below).
- **Equal visual weight on everything** — no single clear entry point.
  A view should have one thing your eye lands on first.

**Type & content**

- **Fake dashboards with nonsense numbers** — "$47,382 ▲ 12.5%",
  "1,247 active users", sparklines of random noise. Numbers must be
  plausible and internally consistent, or be honestly labelled as sample
  data (e.g. a "Demo data" chip).
- **Stock-photo mush** — generic smiling-team / abstract-tech-swirl
  imagery that says nothing. If you can't source a real, specific image,
  use a structured placeholder, not decorative filler.
- **Icons mixed from different families** — a Lucide outline icon next to
  a Heroicons solid next to an emoji. Pick one family, one stroke weight,
  one style (all outline or all solid).
- **Body copy that describes the feature in marketing-ese** — "Seamlessly
  streamline your workflow with powerful, intuitive tools." Say the
  specific thing the product does, in the brand's voice.
- **Unreadable low-contrast text** — grey-on-grey, thin weight on tint.
  Runs the contrast gates in `color.md`; below AA is a defect, not a mood.

## Positive directives — what to do instead

Don't just avoid the tells; commit to the craft. Before writing CSS, decide:

- **One accent, used twice.** Pick the single highest-signal action per
  view for `var(--accent)`. Everything else is the neutral ramp.
- **A real type hierarchy.** One multiplicative scale (1.2 or 1.25),
  6–8 sizes max, tight negative tracking on display, generous leading on
  body. See `typography.md`. Levels must feel *authored*, not defaulted.
- **A spacing system.** One scale — e.g. `4 · 8 · 12 · 16 · 24 · 32 · 48
  · 64 · 96` — and every margin, gap, and pad snaps to it. No off-scale
  one-offs.
- **Generous restraint.** Whitespace is a material. When unsure, remove
  a border, a shadow, or a color rather than add one.
- **Real, plausible content.** Specific labels, brief-derived headlines,
  microcopy in the brand's voice. A button that says what it does beats
  "Get started."
- **Considered empty and loading states.** Design the zero-data and
  in-flight views on purpose — see `state-coverage.md`. A blank div is an
  unfinished screen.
- **AA contrast as a gate, not a goal.** Run the pairs in `color.md`.
- **Purposeful motion.** Reuse the repo's ease/duration contract; motion
  is choreography, not confetti. See `animation-discipline.md`.
- **Alignment and optical balance.** A grid the eye can feel; optical
  (not mathematical) centering for icons and glyphs.

## Final self-audit — verify BEFORE you output

Walk this checklist against the artifact you are about to ship. Every
line must be "yes." If one is "no," fix it, then re-check — don't ship on
a "mostly."

1. **Accent** — exactly one accent hue, used at most twice on the screen?
   No indigo default (`#6366f1` et al.) unless the `DESIGN.md` declared it?
2. **No trust gradient** — hero is a flat surface or single-token color,
   not a two-stop purple/blue/cyan wash?
3. **Icons** — one family, one stroke weight, monoline SVG with
   `currentColor`? Zero emoji standing in for UI icons?
4. **Type** — display uses `var(--font-display)` with negative tracking;
   ALL CAPS has ≥`0.06em`; ≤8 sizes from one scale; body 50–75ch?
5. **Spacing** — every gap comes from one scale; no `13/17/23px` one-offs?
6. **Layout** — a clear single entry point; not center-everything; not
   the hero + 3-even-cards cliché? At least one section breaks the
   template rhythm?
7. **Content** — every word is real and specific to the brief? No lorem,
   no "feature one," no invented metrics, no marketing-ese?
8. **Numbers** — any figure is plausible and consistent, or labelled as
   sample data?
9. **Contrast** — body ≥4.5:1, large text/UI ≥3:1? Verified, not assumed?
10. **Elevation** — shadows reserved for what truly floats; the rest use
    hairline borders? No glassmorphism-by-default?
11. **States** — empty, loading, and error states designed, not blank?
12. **Motion** — every transition uses the ease/duration contract and
    serves a purpose?
13. **Soul** — could someone outside the project identify which product
    this is from a screenshot? (See below.)

## How to add soul without breaking the rules

Aim for **~80% proven patterns + ~20% distinctive choice**. The 20%
should live in:

- One bold visual move — a typography choice, a single color decision,
  an unexpected proportion.
- Voice and microcopy — a button that says "Start tracking" beats one
  that says "Get started".
- One micro-interaction the user will remember — a button press that
  moves 2px, a number that counts up.
- One detail that could only have been put there by someone who used
  the product (a subtle kbd shortcut hint, a status badge with
  product-specific phrasing).

If a reviewer screenshots the artifact and someone outside the project
can identify which product it's from — you have soul. If not, you
shipped a template.
