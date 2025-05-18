// components/LazySection.tsx
"use client";

import type { FC, ReactNode } from "react";
import { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
}

const LazySection: FC<LazySectionProps> = ({
  children,
  rootMargin = "200px",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
};

export default LazySection;
