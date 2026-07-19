import type { ReactNode } from 'react';
import styles from './SpecimenCard.module.css';

export interface SpecimenCardProps {
  /** System / brand name — set in the Didone display serif. */
  title: string;
  /** Tracked-mono meta label (e.g. a category or "HOUSE SYSTEM"). */
  meta?: ReactNode;
  /** One-line description. */
  summary?: ReactNode;
  /** Palette strip — up to ~6 hex/color values, rendered as a real swatch band. */
  swatches?: string[];
  /** Glyph shown as the type specimen (defaults to "Aa"). */
  specimen?: string;
  /** Small inline badge (e.g. a DEFAULT chip). */
  badge?: ReactNode;
  /** Extra chips / tags rendered below the swatches (feature layout). */
  tags?: ReactNode;
  /** 'tile' = compact vertical brand tile (grid reuse); 'feature' = wide masthead. */
  layout?: 'tile' | 'feature';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  'data-testid'?: string;
}

function SwatchBand({ swatches, layout }: { swatches: string[]; layout: 'tile' | 'feature' }) {
  return (
    <span className={styles.swatches} data-layout={layout} aria-hidden="true">
      {swatches.slice(0, 6).map((color, index) => (
        <span key={`${color}-${index}`} style={{ background: color }} />
      ))}
    </span>
  );
}

/**
 * SpecimenCard — the reusable Kinected "brand tile": a real palette band, a
 * Didone name, a type specimen, and optional meta / badge / tags. Promoted from
 * the Phase-2 specimen exploration so the home gallery and the project
 * brand-picker can share one primitive. Interactive when `onClick` is provided.
 */
export function SpecimenCard({
  title,
  meta,
  summary,
  swatches = [],
  specimen = 'Aa',
  badge,
  tags,
  layout = 'tile',
  selected = false,
  onClick,
  className,
  ariaLabel,
  'data-testid': dataTestId,
}: SpecimenCardProps) {
  const interactive = typeof onClick === 'function';
  const classes = [styles.card, styles[layout], selected ? styles.selected : null, className]
    .filter(Boolean)
    .join(' ');

  const body = (
    <>
      <span className={styles.stage} aria-hidden="true">
        {swatches.length > 0 ? <SwatchBand swatches={swatches} layout={layout} /> : null}
        <span className={styles.specimen}>{specimen}</span>
      </span>
      <span className={styles.body}>
        {meta || badge ? (
          <span className={styles.metaRow}>
            {meta ? <span className={styles.meta}>{meta}</span> : null}
            {badge ? <span className={styles.badgeSlot}>{badge}</span> : null}
          </span>
        ) : null}
        <span className={styles.title}>{title}</span>
        {summary ? <span className={styles.summary}>{summary}</span> : null}
        {tags ? <span className={styles.tags}>{tags}</span> : null}
      </span>
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={selected || undefined}
        aria-label={ariaLabel}
        data-testid={dataTestId}
      >
        {body}
      </button>
    );
  }
  return (
    <div className={classes} aria-label={ariaLabel} data-testid={dataTestId}>
      {body}
    </div>
  );
}
