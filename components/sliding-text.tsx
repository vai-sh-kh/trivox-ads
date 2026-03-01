"use client";

interface SlidingTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Text that slides up on parent hover, revealing the same text from below.
 * Parent must have `group` class for the effect to work.
 */
export function SlidingText({ children, className = "" }: SlidingTextProps) {
  return (
    <span
      className={`inline-block overflow-hidden h-[1em] leading-none align-middle *:leading-none ${className}`}
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
        <span className="block">{children}</span>
        <span className="block">{children}</span>
      </span>
    </span>
  );
}
