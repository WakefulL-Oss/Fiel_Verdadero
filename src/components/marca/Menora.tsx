const BRAZOS = "M50 33V73M40 33A10 10 0 0 0 60 33M30 33A20 20 0 0 0 70 33M20 33A30 30 0 0 0 80 33M36 76H64";
const LUCES = [20, 30, 40, 60, 70, 80];

export function Menora({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="15 14 70 66" aria-hidden className={className}>
      <path d={BRAZOS} fill="none" stroke="currentColor" strokeWidth={3.6} strokeLinecap="round" />
      {LUCES.map((cx) => (
        <circle key={cx} cx={cx} cy="26" r="2.6" fill="currentColor" />
      ))}
      <ellipse cx="50" cy="23" rx="3.6" ry="6.5" fill="var(--accent)" />
    </svg>
  );
}
