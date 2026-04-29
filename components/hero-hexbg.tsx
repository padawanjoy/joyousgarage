"use client";

import { useEffect, useRef } from "react";

export function HeroHexBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const TIERS = [
      "tier-base", "tier-base", "tier-base",
      "tier-lift", "tier-lift",
      "tier-pop",
      "tier-recess",
      "tier-deep",
    ] as const;
    const HEX_SIZE = 36;
    const HEX_W = HEX_SIZE * 2;
    const HEX_H = HEX_SIZE * Math.sqrt(3);
    const COL_SP = HEX_SIZE * 1.5;
    const ROW_SP = HEX_H;

    const allHexes: HTMLDivElement[] = [];

    function build() {
      container!.innerHTML = "";
      allHexes.length = 0;
      const rect = container!.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const cols = Math.ceil(W / COL_SP) + 2;
      const rows = Math.ceil(H / ROW_SP) + 2;
      const frag = document.createDocumentFragment();
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          const yOffset = c % 2 !== 0 ? ROW_SP / 2 : 0;
          const x = c * COL_SP - HEX_W / 2;
          const y = r * ROW_SP - HEX_H / 2 + yOffset;
          const div = document.createElement("div");
          div.className = `hex ${TIERS[(Math.random() * TIERS.length) | 0]}`;
          div.style.left = `${x}px`;
          div.style.top = `${y}px`;
          div.style.width = `${HEX_W}px`;
          div.style.height = `${HEX_H}px`;
          frag.appendChild(div);
          allHexes.push(div);
        }
      }
      container!.appendChild(frag);
    }

    build();

    let resizeT: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(build, 180);
    };
    window.addEventListener("resize", onResize);

    // Pause twinkle while scrolling so the drop-shadows don't jank scroll.
    let isScrolling = false;
    let scrollT: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      isScrolling = true;
      if (scrollT) clearTimeout(scrollT);
      scrollT = setTimeout(() => { isScrolling = false; }, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(container);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let twinkleT: ReturnType<typeof setTimeout> | null = null;

    function twinkleOnce() {
      if (allHexes.length === 0) return;
      const hex = allHexes[(Math.random() * allHexes.length) | 0];
      if (hex.classList.contains("flash-bright") || hex.classList.contains("flash-dim")) return;
      const cls = Math.random() < 0.45 ? "flash-bright" : "flash-dim";
      hex.classList.add(cls);
      const dur = 240 + Math.random() * 500;
      setTimeout(() => hex.classList.remove(cls), dur);
    }

    function schedule() {
      if (!isScrolling && isVisible) {
        const burst = 1 + ((Math.random() * 2) | 0);
        for (let i = 0; i < burst; i++) twinkleOnce();
      }
      const next = 180 + Math.random() * 420;
      twinkleT = setTimeout(schedule, next);
    }

    if (!reduceMotion) schedule();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (resizeT) clearTimeout(resizeT);
      if (scrollT) clearTimeout(scrollT);
      if (twinkleT) clearTimeout(twinkleT);
    };
  }, []);

  return <div className="hex-bg" ref={ref} aria-hidden />;
}
