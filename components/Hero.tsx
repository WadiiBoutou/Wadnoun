"use client";

import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const SplineScene = dynamic(() => import("./SplineScene").then(m => m.SplineScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0f0d]" />
});

export const Hero = () => {
  const { t, language } = useLanguage();
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
      {/* 3D Spline Backdrop with scroll fix */}
      <SplineScene isArabic={language === "ar"} />

      {/* Shadow Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/60 via-transparent to-[#0a0f0d] opacity-100 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#0a0f0d]/30"></div>
      </div>

      {/* Content container now has pointer-events-none to let you 'reach through' to the Spline backdrop */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 pt-32 pb-20 pointer-events-none">
        {/* Giant heading — Style matches home hero */}
        <div className="max-w-6xl">
          <h1 className="font-heading font-extrabold leading-[0.95] tracking-tight text-white select-none">
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.2rem,7vw,5.5rem)] lg:text-[clamp(3.5rem,8vw,6.5rem)]">
              {t("home.hero.title.line1")}
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.2rem,7vw,5.5rem)] lg:text-[clamp(3.5rem,8vw,6.5rem)]">
              {t("home.hero.title.line2")}
            </span>
            <span className="hero-line block opacity-0 translate-y-12 text-[clamp(2.2rem,7vw,5.5rem)] lg:text-[clamp(3.5rem,8vw,6.5rem)] text-primary">
              {t("home.hero.title.line3")}
            </span>
          </h1>
        </div>

        <p className="hero-sub opacity-0 translate-y-8 text-base md:text-xl lg:text-lg xl:text-xl text-white/60 max-w-2xl mt-10 leading-relaxed font-medium select-none">
          {t("home.hero.subtitle")}
        </p>

        {/* Individual buttons keep pointer-events-auto so you can still click them */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Link href="/services" className="hero-cta opacity-0 translate-y-6 bg-primary text-[#0a0f0d] font-bold px-7 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-primary/90 transition-all text-center text-sm md:text-base pointer-events-auto">
            {t("home.hero.cta1")}
          </Link>
          <Link href="/contact" className="hero-cta opacity-0 translate-y-6 border border-white/30 text-white font-bold px-7 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-white/5 transition-all text-center text-sm md:text-base pointer-events-auto">
            {t("home.hero.cta2")}
          </Link>
        </div>
      </div>

    </section>
  );
};
