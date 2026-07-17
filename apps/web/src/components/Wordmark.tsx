import type { HTMLAttributes } from 'react';
import styles from './Wordmark.module.css';

export interface WordmarkProps extends HTMLAttributes<HTMLSpanElement> {
  /** Secondary tracked label under/after the serif name. Defaults to "DESIGN". */
  sub?: string;
  /** Stacked lockup (name over label, the site's Kinected/SOLUTIONS form) or a
   *  compact single-line form. */
  layout?: 'stack' | 'inline';
  /** Relative scale of the lockup. */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * The Kinected wordmark lockup — "Kinected" set in the Playfair display serif
 * with a tracked violet monospace label beneath it (mirrors the kinected.io
 * "Kinected / SOLUTIONS" mark; our product reads "Kinected / DESIGN"). The one
 * canonical place this typographic pairing lives so every surface renders it
 * identically.
 */
export function Wordmark({
  sub = 'DESIGN',
  layout = 'stack',
  size = 'md',
  className,
  ...rest
}: WordmarkProps) {
  return (
    <span
      className={[styles.wordmark, className].filter(Boolean).join(' ')}
      data-layout={layout}
      data-size={size}
      {...rest}
    >
      <span className={styles.name}>Kinected</span>
      <span className={styles.sub}>{sub}</span>
    </span>
  );
}
