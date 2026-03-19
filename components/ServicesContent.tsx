"use client";

import { useLanguage } from "./LanguageProvider";
import { Zap, Building2, Lightbulb, Cpu, BarChart3, Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICE_ICONS = [
  <Zap className="w-7 h-7" key="1" />,
  <Building2 className="w-7 h-7" key="2" />,
  <Lightbulb className="w-7 h-7" key="3" />,
  <Cpu className="w-7 h-7" key="4" />,
  <BarChart3 className="w-7 h-7" key="5" />,
  <Wrench className="w-7 h-7" key="6" />,
];

export const ServicesContent = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    // Services image 1 — substation, fade+scale between services
    gsap.fromTo(".svc-img-1",
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: ".svc-img-1", start: "top 80%", once: true } }
    );

    // Services image 2 — street lighting at night, slide from left
    gsap.fromTo(".svc-img-2",
      { opacity: 0, x: -70 },
      { opacity: 1, x: 0, duration: 1.1, ease: "power2.out",
        scrollTrigger: { trigger: ".svc-img-2", start: "top 80%", once: true } }
    );
    gsap.fromTo(".svc-img-2-text",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.1, ease: "power2.out", delay: 0.18,
        scrollTrigger: { trigger: ".svc-img-2", start: "top 80%", once: true } }
    );

    // Services image 3 — parallax energy efficiency
    gsap.fromTo(".svc-img-3-inner",
      { yPercent: 8 },
      { yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ".svc-img-3-wrap", start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.fromTo(".svc-img-3-wrap",
      { opacity: 0 },
      { opacity: 1, duration: 1,
        scrollTrigger: { trigger: ".svc-img-3-wrap", start: "top 85%", once: true } }
    );

  }, { scope: ref });

  return (
    <div ref={ref} className="w-full">

      {/* Hero */}
      <section data-navbar="dark" className="pt-40 pb-32 bg-white text-center px-6">
        <h1 className="reveal opacity-0 translate-y-10 text-5xl md:text-8xl font-heading font-extrabold text-gray-900 mb-8">{t("services.hero.title")}</h1>
        <p className="reveal opacity-0 translate-y-8 text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto">{t("services.hero.subtitle")}</p>
      </section>

      {/* Services 1 & 2 */}
      {[1, 2].map((i) => (
        <section key={i} data-navbar={i % 2 === 0 ? "dark" : "light"} className={`py-32 ${i % 2 === 0 ? "bg-white" : "bg-[#0a0f0d]"}`}>
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
                <span className={`text-8xl md:text-9xl font-heading font-black leading-none ${i % 2 === 0 ? "text-gray-100" : "text-white/5"}`}>0{i}</span>
                <div className={i % 2 === 0 ? "text-primary" : "text-primary/80"}>{SERVICE_ICONS[i - 1]}</div>
              </div>
              <div className="md:w-3/4">
                <h2 className={`reveal opacity-0 translate-y-8 text-3xl md:text-4xl font-heading font-bold mb-6 ${i % 2 === 0 ? "text-gray-900" : "text-white"}`}>
                  {t(`services.s${i}.title`)}
                </h2>
                <p className={`reveal opacity-0 translate-y-8 text-lg leading-relaxed mb-8 ${i % 2 === 0 ? "text-gray-500" : "text-white/60"}`}>
                  {t(`services.s${i}.text`)}
                </p>
                <div className={`reveal opacity-0 translate-y-6 text-sm font-bold uppercase tracking-[0.2em] ${i % 2 === 0 ? "text-primary" : "text-primary/80"}`}>
                  {t(`services.s${i}.tags`)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* IMAGE 1 — Electrical substation / transformer station */}
      <div data-navbar="light" className="svc-img-1 opacity-0 relative overflow-hidden" style={{ height: "55vh" }}>
        <Image
          src="https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1800&q=85"
          alt="Poste de transformation haute tension"
          fill
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/75 via-[#0a0f0d]/30 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10 md:px-24">
          <div className="max-w-xl">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.35em] mb-4">Postes de Transformation</p>
            <h3 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              HTA/BT — du poste sur poteau<br />au poste cabine industriel
            </h3>
          </div>
        </div>
      </div>

      {/* Services 3 */}
      <section data-navbar="light" className="py-32 bg-[#0a0f0d]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
              <span className="text-8xl md:text-9xl font-heading font-black leading-none text-white/5">03</span>
              <div className="text-primary/80">{SERVICE_ICONS[2]}</div>
            </div>
            <div className="md:w-3/4">
              <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-4xl font-heading font-bold mb-6 text-white">{t("services.s3.title")}</h2>
              <p className="reveal opacity-0 translate-y-8 text-lg leading-relaxed mb-8 text-white/60">{t("services.s3.text")}</p>
              <div className="reveal opacity-0 translate-y-6 text-sm font-bold uppercase tracking-[0.2em] text-primary/80">{t("services.s3.tags")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE 2 — Street lighting at night, side-by-side */}
      <section data-navbar="light" className="bg-white overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[50vh]">
          <div className="svc-img-2 opacity-0 relative overflow-hidden min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=85"
              alt="Éclairage public LED la nuit"
              fill
              className="object-cover object-center"
              sizes="50vw"
              unoptimized
            />
          </div>
          <div className="svc-img-2-text opacity-0 flex items-center bg-[#0a0f0d] px-10 md:px-20 py-20">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.35em] mb-6">Éclairage Public LED</p>
              <h3 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight mb-6">
                Jusqu'à 70% d'économies<br />avec le télécontrôle LED
              </h3>
              <p className="text-white/40 text-base leading-relaxed">
                Candélabres, armoires de commande, gradation automatique — une solution complète clé en main.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services 4 */}
      <section data-navbar="dark" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
              <span className="text-8xl md:text-9xl font-heading font-black leading-none text-gray-100">04</span>
              <div className="text-primary">{SERVICE_ICONS[3]}</div>
            </div>
            <div className="md:w-3/4">
              <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900">{t("services.s4.title")}</h2>
              <p className="reveal opacity-0 translate-y-8 text-lg leading-relaxed mb-8 text-gray-500">{t("services.s4.text")}</p>
              <div className="reveal opacity-0 translate-y-6 text-sm font-bold uppercase tracking-[0.2em] text-primary">{t("services.s4.tags")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services 5 */}
      <section data-navbar="light" className="py-32 bg-[#0a0f0d]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
              <span className="text-8xl md:text-9xl font-heading font-black leading-none text-white/5">05</span>
              <div className="text-primary/80">{SERVICE_ICONS[4]}</div>
            </div>
            <div className="md:w-3/4">
              <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-4xl font-heading font-bold mb-6 text-white">{t("services.s5.title")}</h2>
              <p className="reveal opacity-0 translate-y-8 text-lg leading-relaxed mb-8 text-white/60">{t("services.s5.text")}</p>
              <div className="reveal opacity-0 translate-y-6 text-sm font-bold uppercase tracking-[0.2em] text-primary/80">{t("services.s5.tags")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE 3 — Energy efficiency / smart monitoring, parallax */}
      <div data-navbar="light" className="svc-img-3-wrap opacity-0 relative overflow-hidden" style={{ height: "60vh" }}>
        <div className="svc-img-3-inner absolute inset-0" style={{ top: "-8%", bottom: "-8%", height: "116%" }}>
          <Image
            src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1800&q=85"
            alt="Économie d'énergie et supervision"
            fill
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f0d]/80 z-10" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.4em] mb-3">Économie d'Énergie</p>
          <h3 className="text-3xl md:text-5xl font-heading font-black text-white">
            Audit, optimisation,<br />ROI garanti
          </h3>
        </div>
      </div>

      {/* Services 6 */}
      <section data-navbar="dark" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
              <span className="text-8xl md:text-9xl font-heading font-black leading-none text-gray-100">06</span>
              <div className="text-primary">{SERVICE_ICONS[5]}</div>
            </div>
            <div className="md:w-3/4">
              <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900">{t("services.s6.title")}</h2>
              <p className="reveal opacity-0 translate-y-8 text-lg leading-relaxed mb-8 text-gray-500">{t("services.s6.text")}</p>
              <div className="reveal opacity-0 translate-y-6 text-sm font-bold uppercase tracking-[0.2em] text-primary">{t("services.s6.tags")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Offres — accent */}
      <section data-navbar="dark" className="py-40 bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="reveal opacity-0 translate-y-8 text-4xl md:text-7xl font-heading font-extrabold text-[#0a0f0d] mb-20 text-center">{t("services.prices.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="reveal opacity-0 translate-y-8 bg-[#0a0f0d]/10 p-10 rounded-2xl border border-[#0a0f0d]/10 hover:bg-[#0a0f0d]/15 transition-colors">
                <h3 className="text-xl font-bold font-heading mb-6 text-[#0a0f0d]">{t(`services.prices.${i}.title`)}</h3>
                <p className="text-[#0a0f0d]/60 leading-relaxed text-lg">{t(`services.prices.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-navbar="light" className="py-40 bg-[#0a0f0d] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="reveal opacity-0 translate-y-8 text-3xl md:text-5xl font-heading font-bold mb-14 text-white">{t("services.cta.text")}</h2>
          <Link href="/contact" className="reveal opacity-0 translate-y-6 inline-flex items-center gap-3 bg-primary text-[#0a0f0d] font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform text-lg">
            {t("services.cta.btn")} <Zap size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};
