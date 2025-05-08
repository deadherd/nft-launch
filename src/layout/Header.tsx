// components/Header.tsx
"use client";

import type { FC } from "react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoSvg from "@/components/svg/LogoSvg";
import ClawBarsSvg from "@/components/svg/ClawBarsSvg";
import dynamic from "next/dynamic";
import Menu from "../layout/Menu";
import s from "../styles/Header.module.sass";

gsap.registerPlugin(ScrollTrigger);

const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

const Header: FC = () => {
  const greenRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // init audio once on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  useEffect(() => {
    const el = greenRef.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 0 });
    ScrollTrigger.create({
      start: 100,
      onEnter: () => gsap.to(el, { autoAlpha: 1, duration: 0.3 }),
      onLeaveBack: () => gsap.to(el, { autoAlpha: 0, duration: 0.3 }),
    });
  }, []);

  useEffect(() => {
    // toggle body cls
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // click handler = toggle + play
  const handleToggle = () => {
    const willOpen = !menuOpen;
    setMenuOpen(willOpen);
    if (willOpen && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // swallow any play() rejections
      });
    }
  };

  const clawColor = menuOpen ? "#0a0a0a" : "#fff";

  return (
    <>
      <header className={s.header} id="top">
        <span className={s.tagline}>
          <CountdownTimer targetDate="2025-05-12T00:00:00Z" />
        </span>
        <div className={s.logo}>
          <LogoSvg />
        </div>
        <span className={s.menu}>
          <button
            className={s.openMenu}
            onClick={handleToggle}
            aria-label="toggle menu"
          >
            <ClawBarsSvg color={clawColor} />
          </button>
          <Image
            src="/assets/images/menu-pipe.png"
            alt="MFR Pipe"
            width={124}
            height={232}
            className={s.pipe}
          />
          <Image
            src="/assets/images/pour.svg"
            alt="MFR Pour"
            width={780}
            height={808}
            className="pour"
          />
        </span>

        {/* preload audio via multiple sources */}
        <audio ref={audioRef} preload="auto" hidden>
          <source src="/assets/audio/hit_splat.mp3" type="audio/mpeg" />
          <source src="/assets/audio/hit_splat.wav" type="audio/wav" />
          <source src="/assets/audio/hit_splat.aac" type="audio/aac" />
        </audio>

        <Menu />
      </header>

      {/* fixed green box */}
      <div ref={greenRef} className={s.sticker}>
        <a href="#top">tOP ^</a>
      </div>
    </>
  );
};

export default Header;
