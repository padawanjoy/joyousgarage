"use client";

import { useEffect, useRef } from "react";

export function HeroBall() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Units are em so motion scales with the responsive title.
    const G = 60;
    const RESTITUTION = 0.6;
    const ROLL_HALFLIFE = 0.85;
    const ROLL_DECAY = Math.LN2 / ROLL_HALFLIFE;
    const SPIN_PER_VX = 28;
    const MIN_BOUNCE_VY = 1.5;
    const REST_VX = 0.18;
    const X_SOFT_LEFT = -5.0;
    const X_SOFT_RIGHT = 0.3;
    const X_HARD_LEFT = -6.0;
    const X_HARD_RIGHT = 0.8;

    type Phase = "init" | "arc" | "rolling" | "idle";
    const s = {
      x: 0, y: 0, vx: 0, vy: 0,
      rot: 0,
      sx: 1, sy: 1,
      phase: "init" as Phase,
      phaseT0: performance.now(),
      lastT: performance.now(),
      idleDuration: 0,
    };

    function squash(strength: number) {
      s.sx = 1 + 0.18 * strength;
      s.sy = 1 - 0.25 * strength;
    }

    function pickKick() {
      const range = X_SOFT_RIGHT - X_SOFT_LEFT;
      const ratio = (s.x - X_SOFT_LEFT) / range;
      let direction: number;
      if (ratio < 0.18) direction = 1;
      else if (ratio > 0.82) direction = -1;
      else direction = Math.random() < 0.5 ? -1 : 1;

      const variety = Math.random();
      if (variety < 0.15) {
        s.vx = direction * (1.0 + Math.random() * 1.2);
        s.vy = 0;
        s.phase = "rolling";
        squash(0.3);
      } else {
        let force: number, peak: number;
        if (variety < 0.55) {
          force = 0.9 + Math.random() * 0.9;
          peak = 0.4 + Math.random() * 0.7;
        } else if (variety < 0.85) {
          force = 1.4 + Math.random() * 1.1;
          peak = 1.0 + Math.random() * 1.2;
        } else {
          force = 1.8 + Math.random() * 1.0;
          peak = 2.0 + Math.random() * 1.0;
        }
        s.vx = direction * force;
        s.vy = -Math.sqrt(2 * G * peak);
        s.phase = "arc";
        squash(0.5);
      }
      s.phaseT0 = performance.now();
    }

    function transitionToIdle(now: number) {
      s.phase = "idle";
      s.phaseT0 = now;
      s.idleDuration = 0.25 + Math.random() * 1.0;
      s.vx = 0;
      s.vy = 0;
    }

    let rafId = 0;
    function step(now: number) {
      const dt = Math.min((now - s.lastT) / 1000, 0.04);
      s.lastT = now;
      const elapsed = (now - s.phaseT0) / 1000;

      switch (s.phase) {
        case "init":
          s.vx = -2.0;
          s.vy = -Math.sqrt(2 * G * 2.5);
          s.phase = "arc";
          s.phaseT0 = now;
          break;
        case "arc":
          s.vy += G * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.rot += s.vx * SPIN_PER_VX * dt;
          if (s.x < X_HARD_LEFT) { s.x = X_HARD_LEFT; if (s.vx < 0) s.vx = 0; }
          if (s.x > X_HARD_RIGHT) { s.x = X_HARD_RIGHT; if (s.vx > 0) s.vx = 0; }
          if (s.y >= 0 && s.vy > 0) {
            s.y = 0;
            const newVy = -s.vy * RESTITUTION;
            if (Math.abs(newVy) < MIN_BOUNCE_VY) {
              s.vy = 0;
              s.phase = "rolling";
              s.phaseT0 = now;
              squash(0.4);
            } else {
              s.vy = newVy;
              s.vx *= 0.93;
              squash(Math.min(1, 0.4 + Math.abs(newVy) / 14));
            }
          }
          break;
        case "rolling":
          s.x += s.vx * dt;
          s.vx *= Math.exp(-ROLL_DECAY * dt);
          s.rot += s.vx * SPIN_PER_VX * dt;
          if (s.x < X_HARD_LEFT) { s.x = X_HARD_LEFT; s.vx *= -0.35; }
          if (s.x > X_HARD_RIGHT) { s.x = X_HARD_RIGHT; s.vx *= -0.35; }
          if (Math.abs(s.vx) < REST_VX) transitionToIdle(now);
          break;
        case "idle":
          if (elapsed >= s.idleDuration) pickKick();
          break;
      }

      const k = Math.min(dt * 14, 1);
      s.sx += (1 - s.sx) * k;
      s.sy += (1 - s.sy) * k;

      dot!.style.transform =
        `translate(${s.x.toFixed(3)}em, ${s.y.toFixed(3)}em) ` +
        `rotate(${s.rot.toFixed(1)}deg) ` +
        `scale(${s.sx.toFixed(3)}, ${s.sy.toFixed(3)})`;

      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <span ref={ref} className="accent-dot" aria-hidden />;
}
