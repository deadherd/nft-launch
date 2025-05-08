// components/RandomBlob.tsx
"use client";
import React, { useMemo, useId } from "react";
import type { ReactNode } from "react";
import s from "../styles/RandomBlob.module.sass";

type RandomBlobProps = {
  size?: number;
  points?: number;
  variance?: number;
  tension?: number;
  fill?: string;
  children?: ReactNode;
};

// convert Catmull-Rom points to a smooth bezier path
function catmullRom2bezier(
  points: [number, number][],
  tension: number
): string {
  const cr = [...points];
  cr.unshift(points[points.length - 1]);
  cr.push(points[0], points[1]);

  let d = "";
  for (let i = 1; i < cr.length - 2; i++) {
    const p0 = cr[i - 1];
    const p1 = cr[i];
    const p2 = cr[i + 1];
    const p3 = cr[i + 2];
    const cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    const cp1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;
    const cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    const cp2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;
    if (i === 1) d += `M${p1[0]},${p1[1]}`;
    d += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }
  return d;
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
  const pathData = useMemo(() => {
    const angleStep = (2 * Math.PI) / points;
    const coords: [number, number][] = [];
    for (let i = 0; i < points; i++) {
      const theta = i * angleStep + (Math.random() - 0.5) * angleStep * 0.2;
      const radius = (size / 2) * (1 - variance + Math.random() * variance);
      const x = Math.cos(theta) * radius + size / 2;
      const y = Math.sin(theta) * radius + size / 2;
      coords.push([x, y]);
    }
    const d = catmullRom2bezier(coords, tension);
    return d + "Z";
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
          <path d={pathData} />
        </clipPath>
      </defs>
      {/* draw blob fill */}
      <path d={pathData} fill={fill} />
      {/* render children inside a foreignObject for HTML or SVG */}
      {children && (
        <foreignObject
          x={0}
          y={0}
          width={size}
          height={size}
          clipPath={`url(#${clipId})`}
        >
          <div className={s.blob}>
            {children}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}