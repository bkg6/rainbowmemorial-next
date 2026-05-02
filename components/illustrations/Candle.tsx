export function Candle({
  className = "",
  size = 60,
  lit = false,
}: {
  className?: string;
  size?: number;
  lit?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 60 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="20"
        y="32"
        width="20"
        height="48"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="rgba(250,246,239,0.8)"
      />
      <line x1="30" y1="32" x2="30" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {lit && (
        <>
          <path
            d="M30 24c0-6 4-10 4-10s-2 4-1 7c1 2 3 2 3 5 0 3-3 5-6 5s-6-2-6-5c0-1 .5-1.5 1-2"
            fill="#FFA500"
            opacity="0.6"
            className="animate-pulse"
          />
          <ellipse cx="30" cy="20" rx="4" ry="6" fill="#FFD700" opacity="0.4" />
        </>
      )}
      <path d="M22 70h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M22 60h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}
