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
    tl.to(".hero-line", { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" })
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(".hero-stat", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.4")
      ;
  }, { scope: container });

  const titleLine1 = t("about.hero.title.line1");
  const titleLine2 = t("about.hero.title.line2");
  const titleAccent = t("about.hero.title.line3");
  
  const subtitle = t("about.hero.subtitle");
  
  const stats = [
    { value: t("about.hero.stats.1.value"), label: t("about.hero.stats.1.label") },
    { value: t("about.hero.stats.2.value"), label: t("about.hero.stats.2.label") },
    { value: t("about.hero.stats.3.value"), label: t("about.hero.stats.3.label") }
  ];

  return (
    <section ref={container} data-navbar="light" className="relative w-full min-h-screen bg-accent flex flex-col justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="/about.webp" 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-transparent to-accent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-32 pb-20">
        {/* Giant heading */}
        <div className="max-w-6xl">
          <h1 className="font-heading font-semibold leading-[0.95] tracking-tight text-white mb-10">
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2rem,6.5vw,5rem)] lg:text-[clamp(3rem,7vw,6rem)]">
              {titleLine1}
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2rem,6.5vw,5rem)] lg:text-[clamp(3rem,7vw,6rem)]">
              {titleLine2}
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2rem,6.5vw,5rem)] lg:text-[clamp(3rem,7vw,6rem)] text-primary">
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
