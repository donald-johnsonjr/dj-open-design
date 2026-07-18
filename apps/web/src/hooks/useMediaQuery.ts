// Reactive `matchMedia` hook. Returns whether the given media query currently
// matches, and re-renders when it changes. SSR-safe: it resolves to `false`
// during the server render / first paint and syncs to the real value in a
// layout effect, so it never reads `window` during module evaluation.
//
// The entry surfaces use this to switch the nav rail between the docked desktop
// column and the slide-in mobile drawer at the phone breakpoint, and to gate
// touch-specific close-on-select behavior. Keep the query strings aligned with
// the CSS breakpoints in styles/home/*.css (the phone tier is `max-width:560px`,
// the compact tier `max-width:900px`).

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const list = window.matchMedia(query);
    const sync = () => setMatches(list.matches);
    sync();
    // addEventListener('change') is the modern API; older Safari only has the
    // deprecated addListener. Support both without leaking a listener.
    if (typeof list.addEventListener === 'function') {
      list.addEventListener('change', sync);
      return () => list.removeEventListener('change', sync);
    }
    list.addListener(sync);
    return () => list.removeListener(sync);
  }, [query]);

  return matches;
}

// Shared phone breakpoint — matches the `max-width: 560px` CSS tier where the
// entry rail becomes a slide-in drawer.
export const MOBILE_QUERY = '(max-width: 560px)';
