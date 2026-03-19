"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import { emitScrollProgress, registerScrollTo } from "./lenis-bus";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Wire up the bus so LenisScrollBar can consume progress and call scrollTo
    registerScrollTo((target, immediate = false) =>
      lenis.scrollTo(target, { immediate })
    );

    const onScroll = (e: Lenis) => {
      ScrollTrigger.update();
      // Lenis 'scroll' and 'limit' are pixel-based and remain consistent even when ScrollTrigger pins add extra visual distance.
      emitScrollProgress(e.scroll, e.limit);
    };
    lenis.on("scroll", onScroll);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
};
