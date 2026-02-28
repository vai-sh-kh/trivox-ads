/**
 * Born & Bred–style swoosh: white square on left → curved upward shape tapering to point on right.
 */
export function HeroSwoosh({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Left block + curved swoosh tapering to point on right */}
      <path
        d="M0 18 L0 82 L80 82 L80 50 C 220 5 380 25 400 50 C 380 75 220 95 80 50 Z"
        fill="white"
      />
    </svg>
  );
}
