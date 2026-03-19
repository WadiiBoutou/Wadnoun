"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const LightbulbSequence = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bulbRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

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
      }
    });

    return () => {
      gsap.ticker.remove(ticker);
    };

  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section ref={containerRef} data-navbar="light" className="bg-black w-full h-screen overflow-hidden text-white font-sans relative">
      {!isReady && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      )}

      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: "calc(100% + 50px)", transform: "translateX(-50px)" }}
      >
        <video
          ref={bulbRef}
          src="/lightbulb.mp4"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-90 will-change-[transform,filter]"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 mix-blend-multiply" style={{ background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.95) 100%)" }}></div>

      <div className="l-text absolute inset-0 z-20 flex flex-col items-end justify-center pointer-events-none opacity-0 will-change-transform pr-8 md:pr-16">
        <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-widest text-emerald-100 drop-shadow-2xl text-right leading-tight">
          {t("anime.light1")} <br /> {t("anime.light2")}
        </h2>
      </div>

      {/* Scroll indicator — placed on Services page (instead of homepage) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none z-30">
        <span className="text-xs tracking-[0.3em] uppercase font-bold">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};
