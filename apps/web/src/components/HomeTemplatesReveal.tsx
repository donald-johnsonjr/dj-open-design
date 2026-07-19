// New-user reveal wrapper for the Home "Community" templates.
//
// When the user has no projects yet, the entry view keeps attention on the
// hero composer: the templates gallery is collapsed and a quiet hint pinned
// to the very bottom of the viewport reads "scroll up to explore more
// templates". An upward scroll gesture (two fingers pushing up, i.e. content
// scrolling up) OR clicking the hint smoothly expands the gallery into place.
// A collapse control lets the user fold it away again.
//
// When the user already has projects, this wrapper is a no-op pass-through —
// HomeView renders the gallery directly.

import { Button } from '@open-design/components';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';
import { useT } from '../i18n';

interface Props {
  /** Collapse + hint behavior is only engaged for brand-new users. */
  enabled: boolean;
  children: ReactNode;
}

export function HomeTemplatesReveal({ enabled, children }: Props) {
  const t = useT();
  const [revealed, setRevealed] = useState(false);

  // Reveal on an upward scroll gesture while still collapsed. "Scroll up"
  // means pushing two fingers up so the content scrolls upward and the lower
  // templates come into view — that's a positive wheel deltaY. We listen on
  // the window so the gesture is caught anywhere on the entry view, not just
  // over the (tiny, collapsed) wrapper.
  useEffect(() => {
    if (!enabled || revealed) return;
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) setRevealed(true);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [enabled, revealed]);

  // Reset back to collapsed if the user transitions back to a no-project
  // state (e.g. after deleting their last project) within the session.
  useEffect(() => {
    if (!enabled) setRevealed(false);
  }, [enabled]);

  // The bottom hint is fixed to the viewport, so on short laptop heights the
  // hero's own scenario/template cards can extend into its band and it would
  // print over their descriptions. Detect that overlap and fade the hint out
  // of the way (it stays keyboard-focusable — see the `.is-obscured` rule — so
  // a keyboard user can still Tab to it to reveal the gallery). On taller
  // viewports, where there's clear space below the cards, the hint shows
  // normally.
  const hintRef = useRef<HTMLButtonElement | null>(null);
  // Start obscured (faded out, see the `.is-obscured` rule) and only reveal the
  // hint once `measure()` has confirmed it clears the hero cards. The measure
  // runs in a rAF after mount, so a `false` initial would let the hint paint
  // over the scenario-card descriptions on the first frame — during the entry
  // animation, before the overlap check has run. Defaulting to obscured keeps
  // that first paint clean on every viewport; the effect below (which always
  // runs while the hint is mounted) then settles it to the real state.
  const [hintObscured, setHintObscured] = useState(true);
  useEffect(() => {
    if (!enabled || revealed) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const hint = hintRef.current;
      if (!hint) return;
      const hr = hint.getBoundingClientRect();
      const cards = document.querySelectorAll(
        '.home-hero__scenario-card, .home-hero__template-section, .home-hero__scenario-cards-wrap',
      );
      let obscured = false;
      for (const card of cards) {
        const cr = card.getBoundingClientRect();
        if (cr.height > 0 && cr.bottom > hr.top - 6 && cr.top < hr.bottom + 6) {
          obscured = true;
          break;
        }
      }
      setHintObscured(obscured);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    // The hero's scenario art loads async and changes card heights; observe the
    // hero so a late layout shift re-runs the overlap check.
    const hero = document.querySelector('.home-hero');
    const ro =
      hero && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(schedule)
        : null;
    if (hero && ro) ro.observe(hero);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
      ro?.disconnect();
    };
  }, [enabled, revealed]);

  // While collapsed the gallery is only height-clipped + aria-hidden, but its
  // buttons, tabs, and search input stay mounted and focusable. Mark the body
  // `inert` until revealed so a keyboard user can't Tab into the invisible
  // Community-template controls before reaching the visible bottom hint.
  const bodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return;
    if (revealed) {
      node.removeAttribute('inert');
    } else {
      node.setAttribute('inert', '');
    }
    // `enabled` is in the deps because the body only mounts once the wrapper is
    // engaged (projects load async); without it the effect wouldn't re-run to
    // set `inert` on the freshly-mounted body while `revealed` stays false.
  }, [revealed, enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className={`home-templates-reveal${revealed ? ' is-revealed' : ''}`}>
      <div
        ref={bodyRef}
        className="home-templates-reveal__body"
        aria-hidden={!revealed}
      >
        <div className="home-templates-reveal__inner">{children}</div>
      </div>

      {revealed ? (
        <Button
          variant="subtle"
          className="home-templates-reveal__collapse"
          onClick={() => setRevealed(false)}
        >
          <Icon name="chevron-down" size={16} />
          <span>{t('homeHero.templatesCollapse')}</span>
        </Button>
      ) : (
        <Button
          ref={hintRef}
          variant="ghost"
          className={`home-templates-reveal__hint${hintObscured ? ' is-obscured' : ''}`}
          onClick={() => setRevealed(true)}
          data-testid="home-templates-hint"
        >
          <span>{t('homeHero.templatesScrollHint')}</span>
          <Icon
            name="chevron-down"
            size={15}
            className="home-templates-reveal__hint-arrow"
          />
        </Button>
      )}
    </div>
  );
}
