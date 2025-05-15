"use client";
import React, { useMemo, useId, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import s from "../styles/RandomBlob.module.sass";

type RandomBlobProps = {
  size?: number;
  points?: number;
  variance?: number;
  tension?: number;
  fill?: string;
  children?: ReactNode;
};

// helper to build a random blob path
function generatePath(
  size: number,
  points: number,
  variance: number,
  tension: number
): string {
  const angleStep = (2 * Math.PI) / points;
  const coords: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const theta = i * angleStep + (Math.random() - 0.5) * angleStep * 0.2;
    const radius = (size / 2) * (1 - variance + Math.random() * variance);
    coords.push([
      Math.cos(theta) * radius + size / 2,
      Math.sin(theta) * radius + size / 2,
    ]);
  }
  // catmull-rom → bezier (same as before)
  const cr = [...coords];
  cr.unshift(coords[coords.length - 1]);
  cr.push(coords[0], coords[1]);

  let d = "";
  for (let i = 1; i < cr.length - 2; i++) {
    const [x0, y0] = cr[i - 1];
    const [x1, y1] = cr[i];
    const [x2, y2] = cr[i + 1];
    const [x3, y3] = cr[i + 2];
    const cp1x = x1 + ((x2 - x0) / 6) * tension;
    const cp1y = y1 + ((y2 - y0) / 6) * tension;
    const cp2x = x2 - ((x3 - x1) / 6) * tension;
    const cp2y = y2 - ((y3 - y1) / 6) * tension;
    if (i === 1) d += `M${x1},${y1}`;
    d += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
  }
  return d + "Z";
}

export default function RandomBlob({
  size = 200,
  points = 16,
  variance = 0.25,
  tension = 1,
  fill = "#59fd53",
  children,
}: RandomBlobProps) {
  const clipId = useId();
  const pathRef = useRef<SVGPathElement>(null);

  // initial shape
  const initialD = useMemo(
    () => generatePath(size, points, variance, tension),
    [size, points, variance, tension]
  );

  useEffect(() => {
    if (!pathRef.current) return;
    // animate between two random shapes forever
    const tween = gsap.to(pathRef.current, {
      attr: { d: generatePath(size, points, variance, tension) },
      duration: 4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => { tween.kill(); }
  }, [size, points, variance, tension]);

  return (
    <svg
      className={s.blob}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={initialD} />
        </clipPath>
      </defs>
      {/* draw and anim blob */}
      <path ref={pathRef} d={initialD} fill={fill} />
      {children && (
        <foreignObject
          x={0}
          y={0}
          width={size}
          height={size}
          clipPath={`url(#${clipId})`}
        >
          <div className={s.icon}>{children}</div>
        </foreignObject>
      )}
    </svg>
  );
}
