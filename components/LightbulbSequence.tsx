"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const LightbulbSequence = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bulbRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  const tProgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bulb = bulbRef.current;
    if (!bulb) return;

    if (bulb.readyState >= 2) {
      setIsReady(true);
    } else {
      const handleLoaded = () => setIsReady(true);
      bulb.addEventListener("loadedmetadata", handleLoaded);
      return () => bulb.removeEventListener("loadedmetadata", handleLoaded);
    }
  }, []);

  useGSAP(() => {
    if (!isReady || !bulbRef.current) return;

    const bulb = bulbRef.current;
    let targetTime = 0;
    let currentTime = 0;
    const LERP = 0.05;

    const ticker = () => {
      const diff = targetTime - currentTime;
      if (Math.abs(diff) < 0.001) {
        if (currentTime !== targetTime) {
          currentTime = targetTime;
          if (bulb.readyState >= 2) bulb.currentTime = currentTime;
        }
      } else {
        currentTime += diff * LERP;
        if (bulb.readyState >= 2) bulb.currentTime = currentTime;
      }
    };

    gsap.ticker.add(ticker);

    const animateText = (p: number, selector: string) => {
      const els = containerRef.current?.querySelectorAll(selector);
      if (!els) return;
      let op = 0; let y = 30;
      if (p < 0.2) { op = p / 0.2; y = 30 * (1 - op); }
      else if (p > 0.8) { op = 1 - ((p - 0.8) / 0.2); y = -30 * (1 - op); }
      else { op = 1; y = 0; }

      els.forEach(el => {
        (el as HTMLElement).style.opacity = op.toString();
        (el as HTMLElement).style.transform = `translateY(${y}px)`;
      });
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        targetTime = self.progress * bulb.duration;
        animateText(self.progress, '.l-text');
        if (tProgRef.current) tProgRef.current.style.width = `${self.progress * 100}%`;
      }
    });

    return () => {
      gsap.ticker.remove(ticker);
    };

  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section ref={containerRef} className="bg-black w-full h-screen overflow-hidden text-white font-sans relative">
      {!isReady && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      )}

      <video
        ref={bulbRef} src="/lightbulb_fixed.mp4"
        muted playsInline preload="auto" // @ts-ignore
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-90 will-change-[transform,filter]"
      />

      <div className="absolute inset-0 pointer-events-none z-10 mix-blend-multiply" style={{ background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.95) 100%)" }}></div>
      <div className="absolute bottom-0 left-0 h-1 bg-blue-500 z-30" ref={tProgRef} style={{ width: '0%' }}></div>

      <div className="l-text absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-0 will-change-transform">
        <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-widest text-emerald-100 drop-shadow-2xl text-center leading-tight">
          {t("anime.light1")} <br /> {t("anime.light2")}
        </h2>
      </div>
    </section>
  );
};
