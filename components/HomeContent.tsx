"use client";

import { useLanguage } from "./LanguageProvider";
import { Zap, Lightbulb, BarChart3, CheckCircle, ChevronRight, Quote, Activity, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useState } from "react";
import { LottieIcon } from "./LottieIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Methode Accordion ─────────────────────────────────────────────────────
// State-driven to avoid CSS group-hover jitter when multiple panels compete.
const PANEL_ASSETS = [
  { svg: "/icons/bolt.svg",     json: "/icons/bolt.json",     img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" },
  { svg: "/icons/lightbulb.svg", json: "/icons/lightbulb.json", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80" },
  { svg: "/icons/reports.svg",  json: "/icons/reports.json",  img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80" },
  { svg: "/icons/Security.svg", json: "/icons/Security.json", img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80" },
  { svg: "/icons/Success.svg",  json: "/icons/Success.json",  img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80" },
];

const MethodeAccordion = ({ t }: { t: (key: string) => string }) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 lg:h-[500px]">
      {[1, 2, 3, 4, 5].map((i) => {
        const isActive = active === i;
        const isIdle   = active !== null && active !== i;

        return (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              flex: isActive ? 3 : isIdle ? 0.55 : 1,
              transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease",
            }}
            className={`relative flex flex-col justify-end lg:justify-start 
                        px-6 lg:px-8 py-8 lg:py-10 overflow-hidden cursor-default
                        border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 min-h-[300px] lg:min-h-0
                        ${isActive ? "bg-accent z-10 shadow-2xl" : "bg-surface-soft z-0"}`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center origin-center transition-all duration-700 ease-out z-0 pointer-events-none"
              style={{ 
                backgroundImage: `url(${PANEL_ASSETS[i - 1].img})`,
                opacity: isActive ? 0.15 : 0,
                transform: isActive ? "scale(1.05)" : "scale(1)"
              }}
            />

            {/* Top Animated Line */}
            <div 
              className="absolute top-0 left-0 h-[3px] bg-primary z-10 transition-all duration-500 ease-in-out"
              style={{ width: isActive ? "100%" : "48px" }}
            />

            {/* Ghost number */}
            <span
              className="absolute bottom-6 right-6 lg:bottom-4 lg:right-6
                         text-[4rem] lg:text-[5rem] font-black font-heading pointer-events-none select-none z-10
                         transition-colors duration-500 leading-none"
              style={{ color: isActive ? "rgb(var(--color-white-rgb) / 0.04)" : "rgb(var(--color-black-rgb) / 0.04)" }}
            >
              0{i}
            </span>

            <div className="relative z-20 w-full flex flex-col items-start text-left h-full justify-between lg:justify-start">
              {/* Icon — SVG at rest, Lottie when active (crossfade) */}
              <div className="relative w-12 h-12 mb-6 lg:mb-8 flex-shrink-0">
                <img
                  src={PANEL_ASSETS[i - 1].svg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                  style={{
                    opacity: isActive ? 0 : 1,
                    filter: "grayscale(1) brightness(0.6)",
                  }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <LottieIcon
                    iconPath={PANEL_ASSETS[i - 1].json}
                    isHovered={isActive}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-grow w-full justify-start">
                 {/* Title */}
                 <h3
                   className="font-heading font-extrabold text-lg lg:text-xl transition-colors duration-400 whitespace-nowrap lg:whitespace-normal mb-2 lg:mb-4"
                  style={{ color: isActive ? "rgb(var(--color-white-rgb))" : "rgb(var(--foreground-rgb, 17 24 39))" }}
                 >
                   {t(`home.process.${i}`)}
                 </h3>

                 {/* Description — reveals only when active */}
                 <div
                   style={{
                     maxHeight: isActive ? "200px" : "0px",
                     opacity: isActive ? 1 : 0,
                     transform: isActive ? "translateY(0)" : "translateY(10px)",
                     transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                     overflow: "hidden",
                   }}
                 >
                   <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                     {t(`home.process.${i}.desc`)}
                   </p>
                 </div>

                 {/* Arrow & "Learn More" */}
                 <div
                   style={{
                     opacity: isActive ? 1 : 0,
                     transform: isActive ? "translateX(0)" : "translateX(-8px)",
                     transition: "all 0.4s cubic-bezier(0.4,0,0.2,1) 0.1s",
                     marginTop: "auto",
                     paddingTop: "1.5rem"
                   }}
                   className="flex items-center gap-2"
                 >
                   <span className="text-[0.67rem] font-bold uppercase tracking-widest text-primary">Découvrir</span>
                   <ChevronRight className="w-4 h-4 text-primary" />
                 </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── HomeContent ────────────────────────────────────────────────────────────
export const HomeContent = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  // State for hover-triggered Lottie animations
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  const domainData = [
    { icon: "/icons/bolt.json", idx: 1 },
    { icon: "/icons/lightbulb.json", idx: 2 },
    { icon: "/icons/reports.json", idx: 3 },
  ];

  const renderTitleWithoutNumber = (value: string) => {
    const match = value.match(/^\d{2}\s+(.+)$/);
    if (!match) return value;
    return match[1];
  };

  return (
    <div ref={ref} className="w-full text-gray-800">

      {/* Stats Band — full width dark */}
      <section data-navbar="light" className="bg-accent py-20 border-t border-white/5">
        <div className="container mx-auto max-w-7xl px-6">
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

      {/* Notre Mission — brand green */}
      <section data-navbar="dark" className="py-40 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-secondary mb-8 md:mb-12 uppercase tracking-tight">
              {t("home.mission.title")}
            </h2>
            <p className="reveal opacity-0 translate-y-8 text-base md:text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
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
        <div className="absolute inset-0 bg-gradient-to-r from-accent/70 via-transparent to-accent/40 z-10" />
        <div className="absolute inset-0 z-20 flex items-center px-8 sm:px-10 md:px-12 lg:px-16">
          <div className="max-w-lg">
            <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">{t("home.image1.kicker")}</p>
            <h3 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              {t("home.image1.title")}
            </h3>
          </div>
        </div>
      </div>

      {/* Nos Domaines — on dark background with 3D Lottie cards */}
      <section data-navbar="light" className="py-24 md:py-40 bg-accent">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-16 md:mb-20 text-center uppercase tracking-tight">
            {t("home.domains.title")}
          </h2>
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto [perspective:2000px]">
            {domainData.map(({ icon, idx }) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="reveal opacity-0 translate-y-8 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-10 
                           transition-all duration-500 ease-out cursor-default group 
                           hover:bg-white/[0.06] hover:border-primary/40 
                           hover:-translate-y-6 md:hover:-translate-y-8 hover:rotate-x-3 hover:shadow-[0_45px_100px_rgb(var(--color-black-rgb)/0.8)]
                           [transform-style:preserve-3d]"
              >
                {/* Header: Free icon + Title on the same line */}
                <div className="flex items-center gap-4 md:gap-6 mb-8 [transform:translateZ(40px)]">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                    <LottieIcon 
                      iconPath={icon} 
                      isHovered={hoveredIdx === idx} 
                      className="w-full h-full" 
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold font-heading text-white leading-tight">
                    {t(`home.domains.${idx}.title`)}
                  </h3>
                </div>
                
                {/* Body Content */}
                <div className="[transform:translateZ(20px)]">
                  <p className="text-white/50 leading-relaxed text-sm md:text-base lg:text-sm xl:text-lg">
                    {t(`home.domains.${idx}.text`)}
                  </p>
                </div>
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
          <div className="img-street-text opacity-0 flex items-center bg-accent px-6 lg:px-12 py-20">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-6">{t("home.image2.kicker")}</p>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-black text-white leading-tight mb-8">
                {t("home.image2.title")}
              </h3>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                {t("home.image2.text")}
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold tracking-wider text-sm uppercase hover:gap-4 transition-all">
                {t("home.image2.cta")} <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi WadNoun — accent section (Green bg, White navbar) */}
      <section
        data-navbar="light"
        className="py-40 bg-primary select-text"
        style={{ userSelect: "text", WebkitUserSelect: "text" }}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl lg:text-7xl font-heading font-extrabold text-accent mb-16 md:mb-20 uppercase tracking-tight select-text">{t("home.why.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-8">
                <h3
                  className="text-lg font-bold mb-3 font-heading text-white/95 select-text"
                  style={{ userSelect: "text", WebkitUserSelect: "text", pointerEvents: "auto" }}
                >
                  {renderTitleWithoutNumber(t(`home.why.${i}.title`))}
                </h3>
                <p
                  className="text-accent/60 leading-relaxed select-text"
                  style={{ userSelect: "text", WebkitUserSelect: "text", pointerEvents: "auto" }}
                >
                  {t(`home.why.${i}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Méthode — Interactive Accordion */}
      <section data-navbar="dark" className="py-24 md:py-40 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-center text-secondary mb-16 md:mb-20 uppercase tracking-tight">{t("home.process.title")}</h2>

          <div className="max-w-7xl mx-auto">
            <MethodeAccordion t={t} />
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
        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent z-10" />
        <div className="absolute bottom-12 left-8 sm:left-10 md:left-12 lg:left-16 xl:left-20 z-20">
          <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">{t("home.image3.kicker")}</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight">
            {t("home.image3.title")}
          </h3>
        </div>
      </div>

      {/* Testimonials — dark */}
      <section data-navbar="light" className="py-40 bg-accent">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-16 md:mb-20 text-center uppercase tracking-tight">{t("home.tests.title")}</h2>
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

      {/* Final CTA (Green bg, White navbar) */}
      <section data-navbar="light" className="py-40 bg-primary text-accent text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl lg:text-6xl font-heading font-black mb-10 md:mb-8 uppercase tracking-tight">{t("home.cta.title")}</h2>
          <p className="reveal opacity-0 translate-y-6 text-base md:text-xl mb-12 md:mb-14 font-medium text-accent/70">{t("home.cta.text")}</p>
          <Link href="/contact" className="reveal opacity-0 translate-y-6 inline-flex items-center gap-3 bg-accent text-white font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform text-lg">
            {t("home.cta.btn")} <ChevronRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};
