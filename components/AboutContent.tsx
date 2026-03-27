"use client";

import { useLanguage } from "./LanguageProvider";
import { Target, ShieldCheck, Zap, Users } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutContent = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Generic reveals
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // About Image 1 — slide from right (transformer station)
    gsap.fromTo(".about-img-1",
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".about-img-1", start: "top 80%", once: true } }
    );

    // About Image 2 — stagger pair (urban infrastructure)
    gsap.fromTo(".about-img-2a",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: ".about-img-2-wrap", start: "top 80%", once: true } }
    );
    gsap.fromTo(".about-img-2b",
      { opacity: 0, y: 70, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out", delay: 0.2,
        scrollTrigger: { trigger: ".about-img-2-wrap", start: "top 80%", once: true } }
    );

    // About Image 3 — parallax (electrical work)
    gsap.fromTo(".about-img-3-inner",
      { yPercent: 7 },
      { yPercent: -7, ease: "none",
        scrollTrigger: { trigger: ".about-img-3-wrap", start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.fromTo(".about-img-3-wrap",
      { opacity: 0 },
      { opacity: 1, duration: 1,
        scrollTrigger: { trigger: ".about-img-3-wrap", start: "top 85%", once: true } }
    );

  }, { scope: ref });

  const icons = [
    <ShieldCheck key="1" className="w-8 h-8" />,
    <Zap key="2" className="w-8 h-8" />,
    <Target key="3" className="w-8 h-8" />,
    <Users key="4" className="w-8 h-8" />,
  ];

  return (
    <div ref={ref} className="w-full">

      {/* History + Image 1 — transformer station slides in from right */}
      <section data-navbar="light" className="py-0 bg-[#0a0f0d] overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[60vh]">
          <div className="flex items-center px-10 md:px-20 py-28">
            <div>
              <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-white mb-12">{t("about.history.title")}</h2>
              <p className="reveal opacity-0 translate-y-8 text-xl text-white/60 leading-relaxed">{t("about.history.text")}</p>
            </div>
          </div>
          <div className="about-img-1 opacity-0 relative overflow-hidden min-h-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85"
              alt="Poste de transformation électrique"
              fill
              className="object-cover object-center"
              sizes="50vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0f0d]/20" />
          </div>
        </div>
      </section>

      {/* Values — accent */}
      <section data-navbar="dark" className="py-40 bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-7xl font-heading font-extrabold text-[#0a0f0d] mb-20 text-center">{t("about.values.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-8 bg-[#0a0f0d]/10 p-10 rounded-2xl border border-[#0a0f0d]/10">
                <div className="text-white/60 mb-6">{icons[i - 1]}</div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-[#0a0f0d]">{t(`about.values.${i}.title`)}</h3>
                <p className="text-[#0a0f0d]/60 leading-relaxed">{t(`about.values.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE + CONTENT PAIRS — each image aligned with its own description */}
      <section data-navbar="dark" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="about-img-2-wrap grid md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto items-start">
            <div className="md:-translate-y-8">
              <div className="about-img-2a opacity-0 relative overflow-hidden rounded-2xl h-[260px] md:h-[351px] mb-10">
                <Image
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85"
                  alt="Infrastructure urbaine électrique"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <h2 className="reveal opacity-0 translate-y-6 text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">{t("about.team.title")}</h2>
              <p className="reveal opacity-0 translate-y-6 text-lg text-gray-500 leading-relaxed">{t("about.team.text")}</p>
            </div>

            <div className="md:translate-y-8">
              <div className="about-img-2b opacity-0 relative overflow-hidden rounded-2xl h-[260px] md:h-[351px] mb-10">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85"
                  alt="Travaux d'électrification"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
              <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-8">{t("about.cert.title")}</h2>
              <p className="reveal opacity-0 translate-y-8 text-lg text-gray-500 leading-relaxed">{t("about.cert.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers — dark */}
      <section data-navbar="light" className="py-40 bg-[#0a0f0d]">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-white text-center mb-20">{t("about.numbers.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-6 text-center p-8">
                <div className="text-5xl md:text-6xl font-heading font-black text-primary mb-3">{t(`about.numbers.v${i}`)}</div>
                <div className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">{t(`about.numbers.l${i}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 3 — Parallax: electrical pylons / energy landscape */}
      <div data-navbar="light" className="about-img-3-wrap opacity-0 relative overflow-hidden" style={{ height: "55vh" }}>
        <div className="about-img-3-inner absolute inset-0" style={{ top: "-8%", bottom: "-8%", height: "116%" }}>
          <Image
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1800&q=85"
            alt="Infrastructure électrique Maroc"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/60 via-transparent to-[#0a0f0d]/80 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.5em]">WadNoun SARL — Maroc</p>
        </div>
      </div>

      {/* Vision — white, big centered */}
      <section data-navbar="dark" className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <Target className="reveal opacity-0 translate-y-6 w-16 h-16 text-primary mx-auto mb-10" />
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-10">{t("about.vision.title")}</h2>
          <p className="reveal opacity-0 translate-y-8 text-xl text-gray-500 leading-relaxed">{t("about.vision.text")}</p>
        </div>
      </section>

    </div>
  );
};
