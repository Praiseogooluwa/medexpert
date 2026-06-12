export function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <div
      className="rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-md shadow-purple-900/30"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="7" y="1" width="4" height="16" rx="1.5" fill="white" />
        <rect x="1" y="7" width="16" height="4" rx="1.5" fill="white" />
      </svg>
    </div>
  );
}
