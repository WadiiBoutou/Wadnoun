"use client";

import { useLanguage } from "./LanguageProvider";
import { Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ServicesContent = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        x: 0,
        filter: "blur(0px)",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Smoke effect for images: start blurred, unblur on scroll.
    gsap.set(".svc-left-img", { filter: "blur(18px)", opacity: 0.88 });

    // Animate each left image card
    gsap.utils.toArray<HTMLElement>(".svc-left-img").forEach((el) => {
      const dir = el.getAttribute("data-svc-dir");
      const x = dir === "right" ? 45 : -45;
      gsap.fromTo(
        el,
        { x, scale: 0.98 },
        {
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          // Prevent GSAP from applying the "from" transform before ScrollTrigger starts.
          // This keeps images visible on initial load.
          immediateRender: false,
        }
      );
    });

  }, { scope: ref });

  return (
    <div ref={ref} className="w-full">

      {/* Hero */}
      <section data-navbar="dark" className="pt-40 pb-32 bg-white text-center px-6">
        <h1 className="reveal opacity-0 translate-y-10 blur-[18px] text-5xl md:text-8xl font-heading font-extrabold text-secondary mb-8">{t("services.hero.title")}</h1>
        <p className="reveal opacity-0 translate-y-8 blur-[18px] text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto">{t("services.hero.subtitle")}</p>
      </section>

      {/* Services List — alternating black/white bands */}
      {[
        {
          idx: 1,
          image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=85",
          alt: "Lignes électriques haute tension",
        },
        {
          idx: 2,
          image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1800&q=85",
          alt: "Poste de transformation électrique",
        },
        {
          idx: 3,
          image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=85",
          alt: "Éclairage public LED la nuit",
        },
        {
          idx: 4,
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85",
          alt: "Tableau de distribution électrique",
        },
        {
          idx: 5,
          image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1800&q=85",
          alt: "Économie d'énergie et supervision",
        },
        {
          idx: 6,
          image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1800&q=85",
          alt: "Technicien et maintenance électrique",
        },
      ].map(({ idx, image, alt }) => {
        const isEven = idx % 2 === 0;
        const number = String(idx).padStart(2, "0");

        return (
          <section
            key={idx}
            data-navbar={isEven ? "dark" : "light"}
            className={`py-20 md:py-24 ${isEven ? "bg-white" : "bg-accent-deep"}`}
          >
            <div className="container mx-auto px-6">
              <article className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
                <div className={`${isEven ? "md:order-2" : "md:order-1"} svc-left-img relative overflow-hidden rounded-2xl aspect-[4/4.5]`} data-svc-dir={isEven ? "right" : "left"}>
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-cover object-center scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                <div className={`${isEven ? "md:order-1" : "md:order-2"} relative`}>
                  <span className="reveal opacity-0 translate-y-8 blur-[18px] absolute -top-8 -left-2 md:-top-10 md:-left-6 text-[6rem] md:text-[8rem] font-heading font-black leading-none text-primary/15 pointer-events-none">
                    {number}
                  </span>
                  <div className="reveal opacity-0 translate-y-8 blur-[18px] relative z-10">
                    <h2 className={`text-3xl md:text-4xl font-heading font-extrabold mb-5 leading-tight ${isEven ? "text-gray-900" : "text-white"}`}>
                      {t(`services.s${idx}.title`)}
                    </h2>
                    <p className={`text-base md:text-lg leading-relaxed mb-8 ${isEven ? "text-gray-500" : "text-white/60"}`}>
                      {t(`services.s${idx}.text`)}
                    </p>
                    <div className={`text-sm font-bold uppercase tracking-[0.2em] ${isEven ? "text-secondary" : "text-primary"}`}>
                      {t(`services.s${idx}.tags`)}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        );
      })}

      {/* Offres — accent */}
      <section data-navbar="dark" className="py-40 bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-7xl font-heading font-extrabold text-accent mb-20 text-center">{t("services.prices.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-8 bg-accent/10 p-10 rounded-2xl border border-accent/10 hover:bg-accent/15 transition-colors">
                <h3 className="text-xl font-bold font-heading mb-6 text-accent">{t(`services.prices.${i}.title`)}</h3>
                <p className="text-accent/60 leading-relaxed text-lg">{t(`services.prices.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-navbar="light" className="py-40 bg-accent text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl font-heading font-bold mb-14 text-white">{t("services.cta.text")}</h2>
          <Link href="/contact" className="reveal opacity-0 translate-y-6 inline-flex items-center gap-3 bg-primary text-accent font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform text-lg">
            {t("services.cta.btn")} <Zap size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};
