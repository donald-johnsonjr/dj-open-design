// Signature neural-mesh / constellation motif — echoes the Kinected logo's
// mesh head. Rendered as a single crisp inline SVG so it stays GPU-cheap (one
// compositor layer, a slow transform drift) and tasteful. Node coordinates are
// hand-placed to read as an organic network rather than a grid; the CSS
// (`.od-hero-mesh` in styles/home/home-hero.css) masks it to a soft radial fade
// and disables the drift under prefers-reduced-motion. Purely decorative —
// aria-hidden, no interactivity. Shared by the Home hero and the sign-in view
// so the two entry surfaces carry the same brand atmosphere.

const HERO_MESH_NODES: Array<[number, number, number]> = [
  [140, 96, 2.4], [286, 60, 1.6], [430, 130, 2.8], [592, 74, 1.8],
  [742, 150, 2.2], [864, 96, 1.5], [96, 250, 1.8], [242, 214, 2.2],
  [398, 286, 1.6], [520, 224, 3], [676, 300, 2], [820, 246, 1.7],
  [180, 396, 2], [340, 430, 1.6], [486, 372, 2.4], [628, 438, 1.8],
  [772, 404, 2.2],
];
const HERO_MESH_LINKS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [0, 7], [1, 7],
  [2, 8], [2, 9], [3, 9], [4, 10], [5, 11], [6, 12], [7, 8], [8, 14],
  [9, 10], [9, 14], [10, 15], [11, 16], [12, 13], [13, 14], [14, 15],
  [15, 16], [7, 9], [10, 11],
];

interface Props {
  /** Optional modifier class (e.g. a surface-specific placement variant). */
  className?: string;
}

export function HeroMesh({ className }: Props) {
  return (
    <div className={`od-hero-mesh${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg
        className="od-hero-mesh__svg"
        viewBox="0 0 960 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        focusable="false"
      >
        <g className="od-hero-mesh__lines">
          {HERO_MESH_LINKS.map(([a, b], i) => {
            const from = HERO_MESH_NODES[a];
            const to = HERO_MESH_NODES[b];
            if (!from || !to) return null;
            return <line key={i} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />;
          })}
        </g>
        <g className="od-hero-mesh__nodes">
          {HERO_MESH_NODES.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </svg>
    </div>
  );
}
