"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MarqueeProps {
  items: ReactNode[];
  direction?: "left" | "right";
  speedSeconds?: number;
  className?: string;
}

export default function Marquee({
  items,
  direction = "left",
  speedSeconds = 40,
  className = "",
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      if (direction === "right") {
        gsap.set(track, { xPercent: -50 });
      }

      tweenRef.current = gsap.to(track, {
        xPercent: direction === "left" ? -50 : 0,
        duration: speedSeconds,
        ease: "none",
        repeat: -1,
      });
    }, rootRef);

    return () => {
      ctx.revert();
      tweenRef.current = null;
    };
  }, [direction, speedSeconds]);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      tweenRef.current.timeScale(0);
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.timeScale(1);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex w-max">
        {/* Primary set */}
        <div className="flex shrink-0">
          {items.map((item, i) => (
            <span key={i} className="flex items-center">
              {item}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="flex items-center">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
