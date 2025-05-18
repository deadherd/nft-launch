// components/Header.tsx
"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoSvg from "@/components/svg/LogoSvg";
import SpotDotsSvg from "@/components/svg/SpotDotsSvg";
//import ClawBarsSvg from "@/components/svg/ClawBarsSvg";
//import dynamic from "next/dynamic";
import Menu from "../../components/Menu";
import s from "../../styles/Header.module.sass";

gsap.registerPlugin(ScrollTrigger);

{/*const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});*/}

const Header: FC = () => {
  const greenRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const pathname = usePathname();

  // init audio once on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  useEffect(() => {
    // route changed, close menu
    setMenuOpen(false);
    setSlideOpen(false);
    document.body.classList.remove("menu-open");
    document.body.classList.remove("slide-menu-open");
  }, [pathname]);

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

  useEffect(() => {
    if (slideOpen) document.body.classList.add("slide-menu-open");
    else document.body.classList.remove("slide-menu-open");
  }, [slideOpen]);

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

  const handleSlideToggle = () => {
    const willOpen = !slideOpen;
    setSlideOpen(willOpen);
  };

  const clawColor = menuOpen ? "#0a0a0a" : "#59fd53";

  return (
    <>
      <header className={s.header} id="top">
        <span className={s.tagline}>Say yes to crack.</span>
        <Link href="/" className={s.logo}>
          <LogoSvg />
        </Link>
        <button
          className={s.openSlideMenu}
          onClick={handleSlideToggle}
          aria-label="toggle slide-menu"
        >
          <Image
            src="/assets/images/slide-in-sm.svg"
            alt="MFR Slide In"
            width={200}
            height={100}
          />
        </button>
        <span className={s.menu}>
          {/*<Link href="/deep-dive">
            <Image
              src="/assets/images/deep-dive.svg"
              alt="MFR Deep Dive"
              width={450}
              height={163}
              className={s.cstore}
            />
          </Link>
          <Link href="/store">
            <Image
              src="/assets/images/cook-book-page.svg"
              alt="MFR Cook Book"
              width={450}
              height={163}
              className={s.cstore}
            />
          </Link>
          <Link href="/store">
            <Image
              src="/assets/images/snack-hosue-btn.svg"
              alt="MFR Corner Store"
              width={450}
              height={163}
              className={s.cstore}
            />
          </Link>*/}
          <button
            className={s.openMenu}
            onClick={handleToggle}
            aria-label="toggle menu"
          >
            {/*<ClawBarsSvg color={clawColor} />*/}
            <SpotDotsSvg color={clawColor} />
          </button>
          <div className="sewage">
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
          </div>
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
        <a href="#top">
          Go<i> </i>tOP
        </a>
      </div>
    </>
  );
};

export default Header;
