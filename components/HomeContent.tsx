"use client";

import { useLanguage } from "./LanguageProvider";
import { Zap, Lightbulb, BarChart3, CheckCircle, ChevronRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HomeContent = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Generic reveal
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Image 1 — fade + scale from below (pylons)
    gsap.fromTo(".img-pylons",
      { opacity: 0, scale: 0.92, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".img-pylons", start: "top 80%", once: true } }
    );

    // Image 2 — slide from left (night lighting)
    gsap.fromTo(".img-street-light",
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1.1, ease: "power2.out",
        scrollTrigger: { trigger: ".img-street-light", start: "top 80%", once: true } }
    );

    // Image 2 text — slide from right, staggered
    gsap.fromTo(".img-street-text",
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.1, ease: "power2.out", delay: 0.15,
        scrollTrigger: { trigger: ".img-street-light", start: "top 80%", once: true } }
    );

    // Image 3 — parallax control panel
    gsap.fromTo(".img-panel-inner",
      { yPercent: 6 },
      { yPercent: -6, ease: "none",
        scrollTrigger: { trigger: ".img-panel-wrap", start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.fromTo(".img-panel-wrap",
      { opacity: 0 },
      { opacity: 1, duration: 1,
        scrollTrigger: { trigger: ".img-panel-wrap", start: "top 85%", once: true } }
    );

  }, { scope: ref });

  return (
    <div ref={ref} className="w-full text-gray-800">

      {/* Stats Band — full width dark */}
      <section data-navbar="light" className="bg-[#0a0f0d] py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-6 text-center">
                <div className="text-5xl md:text-6xl font-heading font-extrabold text-primary mb-3">{t(`home.stats.v${i}`)}</div>
                <div className="text-sm font-bold text-white/50 uppercase tracking-[0.2em]">{t(`home.stats.l${i}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Mission — dramatic white */}
      <section data-navbar="dark" className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-12">{t("home.mission.title")}</h2>
            <p className="reveal opacity-0 translate-y-8 text-xl md:text-2xl text-gray-500 leading-relaxed">
              {t("home.mission.text")}
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE 1 — High-voltage pylons, full width cinematic */}
      <div data-navbar="light" className="img-pylons opacity-0 relative w-full overflow-hidden" style={{ height: "60vh" }}>
        <Image
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=85"
          alt="Pylônes électrique haute tension"
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/70 via-transparent to-[#0a0f0d]/40 z-10" />
        <div className="absolute inset-0 z-20 flex items-center px-8 md:px-20">
          <div className="max-w-lg">
            <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Infrastructure HTA</p>
            <h3 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              Lignes haute tension,<br />réseaux de distribution
            </h3>
          </div>
        </div>
      </div>

      {/* Nos Domaines — on dark background */}
      <section data-navbar="light" className="py-40 bg-[#0a0f0d]">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-white mb-20 text-center">{t("home.domains.title")}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Zap className="w-10 h-10" />, idx: 1 },
              { icon: <Lightbulb className="w-10 h-10" />, idx: 2 },
              { icon: <BarChart3 className="w-10 h-10" />, idx: 3 },
            ].map(({ icon, idx }) => (
              <div key={idx} className="reveal opacity-0 translate-y-8 bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-colors group">
                <div className="text-primary mb-8 group-hover:scale-110 transition-transform">{icon}</div>
                <h3 className="text-xl font-bold mb-4 font-heading text-white">{t(`home.domains.${idx}.title`)}</h3>
                <p className="text-white/60 leading-relaxed">{t(`home.domains.${idx}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 2 — Street lighting at night, side-by-side layout */}
      <section data-navbar="light" className="py-0 bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[55vh]">
          <div className="img-street-light opacity-0 relative overflow-hidden min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=85"
              alt="Éclairage public urbain nocturne"
              fill
              className="object-cover object-center"
              sizes="50vw"
              unoptimized
            />
          </div>
          <div className="img-street-text opacity-0 flex items-center bg-[#0a0f0d] px-12 md:px-20 py-20">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-6">Éclairage Public</p>
              <h3 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-8">
                Des villes mieux éclairées,<br />une énergie maîtrisée
              </h3>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                Nos solutions LED avec télécontrôle réduisent la consommation des collectivités jusqu'à 70%.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold tracking-wider text-sm uppercase hover:gap-4 transition-all">
                Voir l'offre éclairage <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi WadNoun — accent section */}
      <section data-navbar="dark" className="py-40 bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-7xl font-heading font-extrabold text-[#0a0f0d] mb-20">{t("home.why.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-8">
                <h3 className="text-lg font-bold mb-3 font-heading text-[#0a0f0d]/80">{t(`home.why.${i}.title`)}</h3>
                <p className="text-[#0a0f0d]/60 leading-relaxed">{t(`home.why.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — clean white */}
      <section data-navbar="dark" className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-center text-gray-900 mb-20">{t("home.process.title")}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-6 flex items-center gap-6 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-primary font-heading font-black text-lg">0{i}</span>
                </div>
                <span className="text-lg font-bold text-gray-800">{t(`home.process.${i}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 3 — Electrical control panel, full-bleed parallax */}
      <div data-navbar="light" className="img-panel-wrap opacity-0 relative overflow-hidden" style={{ height: "65vh" }}>
        <div className="img-panel-inner absolute inset-0" style={{ top: "-8%", bottom: "-8%", height: "116%" }}>
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85"
            alt="Tableau de distribution électrique"
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d]/80 via-[#0a0f0d]/20 to-transparent z-10" />
        <div className="absolute bottom-12 left-8 md:left-20 z-20">
          <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">Distribution & Contrôle</p>
          <h3 className="text-3xl md:text-5xl font-heading font-black text-white">
            TGBT, automatisme<br />& supervision SCADA
          </h3>
        </div>
      </div>

      {/* Testimonials — dark */}
      <section data-navbar="light" className="py-40 bg-[#0a0f0d]">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-white mb-20 text-center">{t("home.tests.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-8 bg-white/5 border border-white/10 p-10 rounded-2xl flex flex-col">
                <Quote className="text-primary/40 w-8 h-8 mb-6" />
                <p className="text-white/70 leading-relaxed mb-8 flex-grow text-lg italic">{t(`home.tests.${i}.text`)}</p>
                <div className="font-bold text-sm text-primary tracking-wider">{t(`home.tests.${i}.author`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section data-navbar="dark" className="py-40 bg-primary text-[#0a0f0d] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-black mb-8">{t("home.cta.title")}</h2>
          <p className="reveal opacity-0 translate-y-6 text-xl mb-14 font-medium text-[#0a0f0d]/70">{t("home.cta.text")}</p>
          <Link href="/contact" className="reveal opacity-0 translate-y-6 inline-flex items-center gap-3 bg-[#0a0f0d] text-white font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform text-lg">
            {t("home.cta.btn")} <ChevronRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};
