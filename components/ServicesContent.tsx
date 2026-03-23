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
        <h1 className="reveal opacity-0 translate-y-10 blur-[18px] text-5xl md:text-8xl font-heading font-extrabold text-gray-900 mb-8">{t("services.hero.title")}</h1>
        <p className="reveal opacity-0 translate-y-8 blur-[18px] text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto">{t("services.hero.subtitle")}</p>
      </section>

      {/* Services 1 & 2 */}
      {[1, 2].map((i) => (
        <section key={i} data-navbar={i % 2 === 0 ? "dark" : "light"} className={`py-12 md:py-14 ${i % 2 === 0 ? "bg-white" : "bg-[#0a0f0d]"}`}>
          <div className="container mx-auto px-6 max-w-5xl">
            <div className={`flex flex-col md:flex-row gap-4 items-stretch ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              <div
                data-svc-dir={i % 2 === 0 ? "right" : "left"}
                className="svc-left-img relative w-full md:w-1/2 overflow-hidden rounded-3xl min-h-[160px] md:min-h-[210px]"
              >
                <Image
                  src={
                    i === 1
                      ? "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=85"
                      : "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=1800&q=85"
                  }
                  alt={i === 1 ? "Lignes électriques haute tension" : "Poste de transformation électrique"}
                  fill
                  className="object-cover object-center"
                  sizes="50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/65 via-[#0a0f0d]/20 to-transparent" />
              </div>

              <div
                className="flex flex-col md:flex-row gap-4 items-start flex-1"
              >
                <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
                  <span
                    className={`reveal opacity-0 translate-y-8 blur-[18px] ${
                      i % 2 === 0 ? "translate-x-[30px]" : "translate-x-[-30px]"
                    } text-6xl md:text-7xl font-heading font-black leading-none ${
                      i % 2 === 0 ? "text-gray-100" : "text-white/5"
                    }`}
                  >
                    0{i}
                  </span>
                </div>
                <div className="md:w-3/4">
                  <h2 className={`reveal opacity-0 translate-y-8 blur-[18px] text-2xl md:text-3xl font-heading font-bold mb-3 ${i % 2 === 0 ? "text-gray-900" : "text-white"}`}>
                    {t(`services.s${i}.title`)}
                  </h2>
                  <p className={`reveal opacity-0 translate-y-8 blur-[18px] text-base md:text-lg leading-relaxed mb-4 ${i % 2 === 0 ? "text-gray-500" : "text-white/60"}`}>
                    {t(`services.s${i}.text`)}
                  </p>
                  <div className={`reveal opacity-0 translate-y-6 blur-[18px] text-sm font-bold uppercase tracking-[0.2em] ${i % 2 === 0 ? "text-primary" : "text-primary/80"}`}>
                    {t(`services.s${i}.tags`)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Services 3 */}
      <section data-navbar="light" className="py-12 md:py-14 bg-[#0a0f0d]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div
              data-svc-dir="left"
              className="svc-left-img relative w-full md:w-1/2 overflow-hidden rounded-3xl min-h-[160px] md:min-h-[210px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=85"
                alt="Éclairage public LED la nuit"
                fill
                className="object-cover object-center"
                sizes="50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/65 via-[#0a0f0d]/20 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
              <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
                <span className="reveal opacity-0 translate-y-8 blur-[18px] translate-x-[-30px] text-6xl md:text-7xl font-heading font-black leading-none text-white/5">03</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="reveal opacity-0 translate-y-8 blur-[18px] text-2xl md:text-3xl font-heading font-bold mb-3 text-white">{t("services.s3.title")}</h2>
                <p className="reveal opacity-0 translate-y-8 blur-[18px] text-base md:text-lg leading-relaxed mb-4 text-white/60">{t("services.s3.text")}</p>
                <div className="reveal opacity-0 translate-y-6 blur-[18px] text-sm font-bold uppercase tracking-[0.2em] text-primary/80">{t("services.s3.tags")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services 4 */}
      <section data-navbar="dark" className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:flex-row-reverse">
            <div
              data-svc-dir="right"
              className="svc-left-img relative w-full md:w-1/2 overflow-hidden rounded-3xl min-h-[160px] md:min-h-[210px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85"
                alt="Tableau de distribution électrique"
                fill
                className="object-cover object-center"
                sizes="50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/35 via-transparent to-[#0a0f0d]/0" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
              <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
                <span className="reveal opacity-0 translate-y-8 blur-[18px] translate-x-[30px] text-6xl md:text-7xl font-heading font-black leading-none text-gray-100">04</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="reveal opacity-0 translate-y-8 blur-[18px] text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">{t("services.s4.title")}</h2>
                <p className="reveal opacity-0 translate-y-8 blur-[18px] text-base md:text-lg leading-relaxed mb-4 text-gray-500">{t("services.s4.text")}</p>
                <div className="reveal opacity-0 translate-y-6 blur-[18px] text-sm font-bold uppercase tracking-[0.2em] text-primary">{t("services.s4.tags")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services 5 */}
      <section data-navbar="light" className="py-12 md:py-14 bg-[#0a0f0d]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div
              data-svc-dir="left"
              className="svc-left-img relative w-full md:w-1/2 overflow-hidden rounded-3xl min-h-[160px] md:min-h-[210px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1800&q=85"
                alt="Économie d'énergie et supervision"
                fill
                className="object-cover object-center"
                sizes="50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/65 via-[#0a0f0d]/20 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
              <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
                <span className="reveal opacity-0 translate-y-8 blur-[18px] translate-x-[-30px] text-6xl md:text-7xl font-heading font-black leading-none text-white/5">05</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="reveal opacity-0 translate-y-8 blur-[18px] text-2xl md:text-3xl font-heading font-bold mb-3 text-white">{t("services.s5.title")}</h2>
                <p className="reveal opacity-0 translate-y-8 blur-[18px] text-base md:text-lg leading-relaxed mb-4 text-white/60">{t("services.s5.text")}</p>
                <div className="reveal opacity-0 translate-y-6 blur-[18px] text-sm font-bold uppercase tracking-[0.2em] text-primary/80">{t("services.s5.tags")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services 6 */}
      <section data-navbar="dark" className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:flex-row-reverse">
            <div
              data-svc-dir="right"
              className="svc-left-img relative w-full md:w-1/2 overflow-hidden rounded-3xl min-h-[160px] md:min-h-[210px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1800&q=85"
                alt="Technicien et maintenance électrique"
                fill
                className="object-cover object-center"
                sizes="50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/35 via-transparent to-[#0a0f0d]/0" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start flex-1">
              <div className="md:w-1/4 flex flex-col items-center md:items-start gap-4">
                <span className="reveal opacity-0 translate-y-8 blur-[18px] translate-x-[30px] text-6xl md:text-7xl font-heading font-black leading-none text-gray-100">06</span>
              </div>
              <div className="md:w-3/4">
                <h2 className="reveal opacity-0 translate-y-8 blur-[18px] text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">{t("services.s6.title")}</h2>
                <p className="reveal opacity-0 translate-y-8 blur-[18px] text-base md:text-lg leading-relaxed mb-4 text-gray-500">{t("services.s6.text")}</p>
                <div className="reveal opacity-0 translate-y-6 blur-[18px] text-sm font-bold uppercase tracking-[0.2em] text-primary">{t("services.s6.tags")}</div>
              </div>
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
