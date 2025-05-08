// components/Loader.tsx
"use client";

import type { FC } from "react";
import { useState, useEffect } from "react";
import s from "../styles/Container.module.sass";

const Loader: FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleLoad = () => {
      // kick off fade
      setFading(true);
      // remove from DOM after 300ms
      timeoutId = setTimeout(() => setVisible(false), 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={s.loader}
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity .3s ease",
      }}
    >
      <div className={s.nest}>
        <span className={s.egg} />
        <span className={s.egg} />
        <span className={s.egg} />
      </div>
    </div>
  );
};

export default Loader;
