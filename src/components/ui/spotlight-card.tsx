"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * SpotlightCard — карточка з магнітним слідом курсора (Linear.app style).
 * При наведенні курсора на карточку, яскравий неоновий промінь слідує за мишею.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.12)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* Spotlight radial gradient that follows cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Border glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity * 0.6,
          boxShadow: `inset 0 0 0 1px rgba(99, 102, 241, 0.35)`,
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
