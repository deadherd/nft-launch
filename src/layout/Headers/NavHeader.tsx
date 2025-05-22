"use client";

import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
//import { Wallet } from "@coinbase/onchainkit/wallet";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoSvg from "@/components/svg/LogoSvg";
import ProfileCard from "../../components/ProfileCard";
import SpotDotsSvg from "@/components/svg/SpotDotsSvg";
import ClawBarsSvg from "@/components/svg/ClawBarsSvg";
import SignInWithEthereum from "@/components/SignInWithEthereum";
import Menu from "../../components/Menu";
import s from "../../styles/Header.module.sass";

gsap.registerPlugin(ScrollTrigger);

const Header: FC = () => {
  const pathname = usePathname();
  const greenRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // derive tagline for deep-dive
  const getTagline = () => {
    if (pathname?.startsWith("/deep-dive")) {
      const segments = pathname.split("/").filter(Boolean);
      const last = segments[segments.length - 1] || "deep-dive";
      return last
        .replace(/-/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    }
    return "Say yes to crack.";
  };

  const tagline = getTagline();

  // init audio once
  useEffect(() => {
    if (audioRef.current) audioRef.current.load();
  }, []);

  // on path change close menus
  useEffect(() => {
    setMenuOpen(false);
    setSlideOpen(false);
    setProfileOpen(false);
    document.body.classList.remove("menu-open");
    document.body.classList.remove("slide-menu-open");
    document.body.classList.remove("open-profile");
  }, [pathname]);

  // gsap reveal for green box
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

  // toggle body class for main menu
  useEffect(() => {
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // toggle body class for slide menu
  useEffect(() => {
    if (slideOpen) document.body.classList.add("slide-menu-open");
    else document.body.classList.remove("slide-menu-open");
  }, [slideOpen]);

  // toggle body class for profile
  useEffect(() => {
    if (profileOpen) document.body.classList.add("open-profile");
    else document.body.classList.remove("open-profile");
  }, [profileOpen]);

  // handle main menu toggle + sound
  const handleToggle = () => {
    const willOpen = !menuOpen;
    setProfileOpen(false);
    setMenuOpen(willOpen);
    if (willOpen && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // handle slide menu toggle
  const handleSlideToggle = () => {
    setSlideOpen(!slideOpen);
  };

  // toggle profile open state
  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const clawColor = menuOpen ? "#0a0a0a" : "#59fd53";

  return (
    <>
      <header className={s.header} id="top">
        <span className={s.tagline}>{tagline}</span>
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
          <div className={s.profileCard}>
            <button
              className={s.openProfile}
              onClick={handleProfileToggle}
              aria-label="toggle menu"
            >
              <SpotDotsSvg color={clawColor} />
            </button>
            <ProfileCard />
          </div>
          {/*<Wallet />*/}
          <SignInWithEthereum />
          <button
            className={s.openMenu}
            onClick={handleToggle}
            aria-label="toggle profile"
          >
            <ClawBarsSvg color={clawColor} />
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
        <audio ref={audioRef} preload="auto" hidden>
          <source src="/assets/audio/hit_splat.mp3" type="audio/mpeg" />
          <source src="/assets/audio/hit_splat.wav" type="audio/wav" />
          <source src="/assets/audio/hit_splat.aac" type="audio/aac" />
        </audio>
        <Menu />
      </header>

      <div ref={greenRef} className={s.sticker}>
        <a href="#top">
          Go<i> </i>tOP
        </a>
      </div>
    </>
  );
};

export default Header;
