"use client";

import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "trivoxads-stats-bottom-curve";
const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 120;

/** To customize the curve shape: set localStorage[STORAGE_KEY] = JSON.stringify([{x:0,y:118}, {x:300,y:80}, ...]) with x in 0–1200, y in 0–120. Then reload. */

/** Control points for the string-like line: x in [0, VIEWBOX_WIDTH], y in [0, VIEWBOX_HEIGHT] */
const DEFAULT_POINTS: { x: number; y: number }[] = [
  { x: 0, y: 118 },
  { x: 150, y: 105 },
  { x: 350, y: 75 },
  { x: 600, y: 58 },
  { x: 850, y: 75 },
  { x: 1050, y: 105 },
  { x: 1200, y: 118 },
];

/** Smooth string-like path through points using quadratic Bezier segments */
function smoothPathThroughPoints(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const cpx = (p0.x + p1.x) / 2;
    const cpy = (p0.y + p1.y) / 2;
    d += ` Q ${cpx},${cpy} ${p1.x},${p1.y}`;
  }
  return d;
}

export function StatsBottomCurve() {
  const [points, setPoints] =
    useState<{ x: number; y: number }[]>(DEFAULT_POINTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { x: number; y: number }[];
        if (Array.isArray(parsed) && parsed.length >= 2) {
          setPoints(parsed);
        }
      }
    } catch {
      // use default
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(points));
    } catch {
      // ignore
    }
  }, [mounted, points]);

  const linePath = useMemo(() => smoothPathThroughPoints(points), [points]);

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-24 md:h-28 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 w-full h-24 md:h-28"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="stats-bottom-accent"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#5D3FD3" />
            <stop offset="50%" stopColor="#7B4FDF" />
            <stop offset="100%" stopColor="#E0115F" />
          </linearGradient>
          <filter
            id="stats-curve-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="0.5"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Black section fill (fixed smooth curve) */}
        <path
          d="M0,0 L1200,0 L1200,120 Q900,60 600,60 Q300,60 0,120 Z"
          fill="black"
        />
        {/* String-like gradient line: shape from points, persisted in localStorage */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#stats-bottom-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-stats-curve-pulse"
          style={{ filter: "url(#stats-curve-glow)" }}
        />
      </svg>
    </div>
  );
}
