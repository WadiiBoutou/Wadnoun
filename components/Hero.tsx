"use client";

import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const { t, language } = useLanguage();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".hero-text", { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
      .to(".hero-btn", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
      .to(".stat-item", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.2");
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-slate-50 flex flex-col items-center pt-32 pb-20">
      <div className="container mx-auto px-6 text-center max-w-4xl pt-10">
        <h1 className="hero-text opacity-0 translate-y-8 text-5xl md:text-7xl font-heading font-bold text-gray-900 leading-tight mb-6">
          {t("home.hero.title")}
        </h1>
        <p className="hero-text opacity-0 translate-y-8 text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t("home.hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/services" className="hero-btn opacity-0 scale-90 bg-primary text-gray-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
            {t("home.hero.cta1")}
          </Link>
          <Link href="/contact" className="hero-btn opacity-0 scale-90 border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary/5 transition-all w-full sm:w-auto">
            {t("home.hero.cta2")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-item opacity-0 translate-y-4 flex flex-col items-center justify-center text-center">
              <span className="text-4xl md:text-5xl font-heading font-extrabold text-secondary mb-2">{t(`home.stats.v${i}`)}</span>
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t(`home.stats.l${i}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
