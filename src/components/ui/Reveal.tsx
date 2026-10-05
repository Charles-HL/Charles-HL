import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
}

/**
 * Fades content in on load, through the CSS animation attached to
 * `[data-reveal]` in `globals.css`.
 *
 * Deliberately not scroll-triggered, and deliberately not a client component.
 * An IntersectionObserver reports the state it sees when it starts observing
 * and then only reacts to changes, and it cannot run before hydration: both
 * left content that was already on screen invisible until the visitor
 * scrolled. A CSS animation always completes, with or without JavaScript.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  return (
    <div
      data-reveal=""
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
