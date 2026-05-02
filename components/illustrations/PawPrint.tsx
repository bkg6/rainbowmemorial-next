export function PawPrint({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central pad */}
      <ellipse cx="12" cy="15" rx="4.2" ry="3.4" stroke="currentColor" strokeWidth="1.5" />
      {/* Top-left toe */}
      <ellipse cx="7.2" cy="9.8" rx="1.7" ry="2.2" transform="rotate(-15 7.2 9.8)" stroke="currentColor" strokeWidth="1.5" />
      {/* Top-center-left toe */}
      <ellipse cx="10.2" cy="8.2" rx="1.7" ry="2.2" transform="rotate(-5 10.2 8.2)" stroke="currentColor" strokeWidth="1.5" />
      {/* Top-center-right toe */}
      <ellipse cx="13.8" cy="8.2" rx="1.7" ry="2.2" transform="rotate(5 13.8 8.2)" stroke="currentColor" strokeWidth="1.5" />
      {/* Top-right toe */}
      <ellipse cx="16.8" cy="9.8" rx="1.7" ry="2.2" transform="rotate(15 16.8 9.8)" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
