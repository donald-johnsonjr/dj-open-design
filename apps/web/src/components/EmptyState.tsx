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
  /**
   * Compact focal stage: drops the tall 440px min-height and shrinks the
   * mark, type and rhythm so the treatment fits a panel-internal empty or a
   * height-constrained modal (e.g. the Settings dialog) without a giant void.
   * The full-height default stays for first-session, full-page focal moments.
   */
  compact?: boolean;
  /**
   * Render the neural-mesh atmosphere behind the copy. Defaults to `true`.
   * Set `false` when the surrounding surface already supplies atmosphere
   * (e.g. an overlay gate with its own blurred backdrop) so the mesh does
   * not double up.
   */
  mesh?: boolean;
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
  compact = false,
  mesh = true,
  className,
  'data-testid': dataTestId,
}: EmptyStateProps) {
  return (
    <div
      className={[styles.root, compact ? styles.compact : null, className]
        .filter(Boolean)
        .join(' ')}
      data-testid={dataTestId}
    >
      {mesh ? <HeroMesh className={styles.mesh} /> : null}
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
