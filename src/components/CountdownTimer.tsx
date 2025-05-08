// components/CountdownTimer.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import s from "../styles/CountdownTimer.module.sass";

type CountdownProps = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountdownTimer({ targetDate }: CountdownProps) {
  // track ssr vs client
  const [mounted, setMounted] = useState(false);

  // calc time left until target
  const calculate = useCallback((): TimeLeft => {
    const diff = new Date(targetDate).getTime() - Date.now();
    return {
      days: Math.max(Math.floor(diff / 86400000), 0), // ms per day
      hours: Math.max(Math.floor((diff % 86400000) / 3600000), 0), // ms per hr
      minutes: Math.max(Math.floor((diff % 3600000) / 60000), 0), // ms per min
      seconds: Math.max(Math.floor((diff % 60000) / 1000), 0), // ms per sec
    };
  }, [targetDate]);

  // live time state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate());

  // mark client-only
  useEffect(() => {
    setMounted(true);
  }, []);

  // start ticking after mount
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(id);
  }, [mounted, calculate]);

  // pad single digits
  const pad = (n: number) => String(n).padStart(2, "0");

  // render zeros until client hydration
  if (!mounted) {
    return (
      <div className={s.countdown}>
        <span className={s.segment}>00</span>:
        <span className={s.segment}>00</span>:
        <span className={s.segment}>00</span>:
        <span className={s.segment}>00</span>
      </div>
    );
  }

  return (
    <div className={s.countdown}>
      <span className={s.segment}>{pad(timeLeft.days)}</span>:
      <span className={s.segment}>{pad(timeLeft.hours)}</span>:
      <span className={s.segment}>{pad(timeLeft.minutes)}</span>:
      <span className={s.segment}>{pad(timeLeft.seconds)}</span>
    </div>
  );
}
