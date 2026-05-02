export function SleepingCat({
  className = "",
  size = 80,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 30c-2 0-3 2-3 4s1 4 3 4c8 0 12 8 20 12 6 3 14 6 24 6s18-3 24-6c8-4 12-12 20-12 2 0 3-2 3-4s-1-4-3-4c-10 0-16 10-24 14-6 3-14 4-20 4s-14-1-20-4c-8-4-14-14-24-14z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(232,196,184,0.15)"
      />
      <circle cx="45" cy="28" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="75" cy="28" r="1.5" fill="currentColor" opacity="0.4" />
      <path
        d="M50 32c2-1 4-1 6 0M64 32c2-1 4-1 6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
