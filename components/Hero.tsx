"use client";

import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

export const Hero = () => {
  const { t } = useLanguage();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(".hero-line", { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" })
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.3")
      ;
  }, { scope: container });

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
        {/* Giant heading — Breakthrough Energy style */}
        <div className="max-w-6xl">
          <h1 className="font-heading font-extrabold leading-[0.95] tracking-tight text-white">
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.5rem,8vw,7rem)]">
              Infrastructure
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.5rem,8vw,7rem)]">
              Électrique
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.5rem,8vw,7rem)] text-primary">
              au Maroc
            </span>
          </h1>
        </div>

        <p className="hero-sub opacity-0 translate-y-8 text-lg md:text-xl text-white/60 max-w-2xl mt-10 leading-relaxed font-medium">
          {t("home.hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Link href="/services" className="hero-cta opacity-0 translate-y-6 bg-primary text-[#0a0f0d] font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-all text-center">
            {t("home.hero.cta1")}
          </Link>
          <Link href="/contact" className="hero-cta opacity-0 translate-y-6 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/5 transition-all text-center">
            {t("home.hero.cta2")}
          </Link>
        </div>
      </div>

    </section>
  );
};
