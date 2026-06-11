'use client';

interface DSADonutProps {
  solved: number;
  total: number;
  segments: { label: string; value: number; color: string }[];
}

export default function DSADonut({ solved, total, segments }: DSADonutProps) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const sum = segments.reduce((a, s) => a + s.value, 0) || 1;

  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" className="h-36 w-36" role="img" aria-label={`${solved} problems solved`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgb(var(--color-surface-2))" strokeWidth="12" />
      {segments.map((s) => {
        const frac = s.value / sum;
        const dash = frac * c;
        const seg = (
          <circle
            key={s.label}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 70 70)"
          />
        );
        offset += dash;
        return seg;
      })}
      <text x="70" y="66" textAnchor="middle" className="fill-fg font-serif text-2xl font-medium">
        {solved}
      </text>
      <text x="70" y="86" textAnchor="middle" className="fill-muted text-[10px]">
        /{total} solved
      </text>
    </svg>
  );
}
