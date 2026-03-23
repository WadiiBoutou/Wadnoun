"use client";

import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export const AboutHero = () => {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(".hero-kicker", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(".hero-line", { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }, "-=0.4")
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(".hero-stat", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.4")
      ;
  }, { scope: container });

  // Text values from user example
  const kickerPrefix = "02 — ";
  const kickerText = t("nav.about").toUpperCase();
  const titleLine1 = "Construire";
  const titleLine2 = "l'Avenir";
  const titleAccent = "Énergétique.";
  
  const subtitle = "Depuis Agadir, au cœur du Souss-Massa, SEP accompagne particuliers, agriculteurs et industriels dans leur transition vers une énergie propre, fiable et souveraine.";
  
  const stats = [
    { value: "2014", label: "DEPUIS" },
    { value: "+500", label: "PROJETS" },
    { value: "Agadir", label: "SIÈGE" }
  ];

  return (
    <section ref={container} data-navbar="light" className="relative w-full min-h-screen bg-[#0a0f0d] flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="/about.webp" 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/60 via-transparent to-[#0a0f0d]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-32 pb-20">
        {/* Kicker */}
        <p className="hero-kicker opacity-0 translate-y-4 text-xs md:text-sm font-bold tracking-[0.3em] text-primary mb-8 font-heading uppercase">
          {kickerPrefix}{kickerText}
        </p>

        {/* Giant heading — Updated with font-black (900) to match the screenshot better */}
        <div className="max-w-6xl">
          <h1 className="font-heading font-black leading-[0.9] tracking-tighter text-white mb-10">
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.5rem,7vw,6.5rem)] lg:text-[clamp(3.5rem,8vw,7.5rem)]">
              {titleLine1}
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.5rem,7vw,6.5rem)] lg:text-[clamp(3.5rem,8vw,7.5rem)]">
              {titleLine2}
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.5rem,7vw,6.5rem)] lg:text-[clamp(3.5rem,8vw,7.5rem)] text-primary">
              {titleAccent}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-sub opacity-0 translate-y-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed font-medium mt-10">
          {subtitle}
        </p>

        {/* Statistics Bar at bottom with dividers */}
        <div className="mt-20 flex flex-wrap gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="hero-stat opacity-0 translate-y-6 flex gap-8 md:gap-16 items-center">
              <div>
                <div className="text-3xl md:text-5xl font-heading font-black text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
              {/* Vertical divider like in screenshot */}
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
