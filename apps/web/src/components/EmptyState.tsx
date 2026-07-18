import type { ReactNode } from 'react';
import { HeroMesh } from './HeroMesh';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  /** Uppercase tracked-mono eyebrow above the headline. */
  eyebrow?: ReactNode;
  /** Didone headline — the leading, non-accented portion. */
  title: ReactNode;
  /** The single swash-italic violet accent word. */
  accent?: ReactNode;
  /** Trailing text after the accent word (e.g. a period). */
  trailing?: ReactNode;
  /** Supporting sentence. */
  body?: ReactNode;
  /** Primary action(s) — typically one gradient-pill CTA. */
  action?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * The Kinected in-style empty state: the neural connection mark seated on a
 * subtle mesh atmosphere, a Didone headline with a swash-italic violet accent,
 * and a single gradient-pill CTA. No spot illustration — restraint over noise.
 * Reusable across the entry tabs.
 */
export function EmptyState({
  eyebrow,
  title,
  accent,
  trailing,
  body,
  action,
  className,
  'data-testid': dataTestId,
}: EmptyStateProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-testid={dataTestId}
    >
      <HeroMesh className={styles.mesh} />
      <div className={styles.stage}>
        <span className={`${styles.mark} od-brand-glyph`} aria-hidden="true" />
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <p className={styles.title}>
          {title}
          {accent ? (
            <>
              {' '}
              <em className={styles.accent}>{accent}</em>
            </>
          ) : null}
          {trailing}
        </p>
        {body ? <p className={styles.body}>{body}</p> : null}
        {action ? <div className={styles.actions}>{action}</div> : null}
      </div>
    </div>
  );
}
