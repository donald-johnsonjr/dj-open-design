import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  /** Uppercase tracked-mono eyebrow above the title (e.g. "DESIGN SYSTEMS / 152 PRESETS"). */
  eyebrow?: ReactNode;
  /** Didone display title. The leading, non-accented portion of the headline. */
  title: ReactNode;
  /** The single word set in swash-italic violet accent (the Kinected signature move). */
  accent?: ReactNode;
  /** Trailing text after the accent word (e.g. a period). */
  trailing?: ReactNode;
  /** Supporting sentence beneath the title. */
  subtitle?: ReactNode;
  /** Right-aligned actions (e.g. a gradient-pill CTA). Wraps below the title on mobile. */
  actions?: ReactNode;
  /** Level of the heading element — defaults to h1. */
  as?: 'h1' | 'h2';
  className?: string;
}

/**
 * The Kinected editorial masthead — a shared page header primitive: a tracked
 * mono eyebrow, a high-contrast Didone title with one swash-italic violet accent
 * word, a calm subtitle, and a right-aligned actions slot. Adopted by the Design
 * systems surface and trivially reusable by the other entry tabs.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  trailing,
  subtitle,
  actions,
  as = 'h1',
  className,
}: PageHeaderProps) {
  const Heading = as;
  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')}>
      <div className={styles.lead}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading className={styles.title}>
          {title}
          {accent ? (
            <>
              {' '}
              <em className={styles.accent}>{accent}</em>
            </>
          ) : null}
          {trailing}
        </Heading>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
