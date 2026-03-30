"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "./LanguageProvider";
import { Sun, Wind, Zap, ShieldCheck, Gauge } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatInt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n));
}

export const HomeBreakthroughLike = () => {
  const { t, language } = useLanguage();

  const [reduceMotion, setReduceMotion] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const opportunityRef = useRef<HTMLElement>(null);
  const demandRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const discoverRef = useRef<HTMLElement>(null);

  const statARef = useRef<HTMLSpanElement>(null);
  const statBRef = useRef<HTMLSpanElement>(null);
  const portfolioCounterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);

    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const portfolioItems = useMemo(
    () => [
      {
        key: "solar",
        icon: <Sun size={22} className="text-primary" />,
        count: t("home.breakthrough.portfolio.solar.count"),
        label: t("home.breakthrough.portfolio.solar.label"),
      },
      {
        key: "wind",
        icon: <Wind size={22} className="text-primary" />,
        count: t("home.breakthrough.portfolio.wind.count"),
        label: t("home.breakthrough.portfolio.wind.label"),
      },
      {
        key: "audit",
        icon: <Gauge size={22} className="text-primary" />,
        count: t("home.breakthrough.portfolio.audit.count"),
        label: t("home.breakthrough.portfolio.audit.label"),
      },
      {
        key: "storage",
        icon: <Zap size={22} className="text-primary" />,
        count: t("home.breakthrough.portfolio.storage.count"),
        label: t("home.breakthrough.portfolio.storage.label"),
      },
      {
        key: "maintenance",
        icon: <ShieldCheck size={22} className="text-primary" />,
        count: t("home.breakthrough.portfolio.maintenance.count"),
        label: t("home.breakthrough.portfolio.maintenance.label"),
      },
    ],
    [t]
  );

  useGSAP(
    () => {
      if (reduceMotion) return;

      // Hero + intro reveal
      const hero = heroRef.current;
      if (hero) {
        gsap.from(".bt-hero-reveal", {
          y: 18,
          opacity: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: hero,
            start: "top 60%",
          },
        });
      }

      // Opportunity cards
      gsap.from(".bt-opportunity-card", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: opportunityRef.current,
          start: "top 80%",
        },
      });

      const startCounters = () => {
        const targetA = Number(t("home.breakthrough.demand.statA.value"));
        const targetB = Number(t("home.breakthrough.demand.statB.value"));

        if (statARef.current) {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: targetA,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              statARef.current!.textContent = formatInt(obj.v);
            },
          });
        }

        if (statBRef.current) {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: targetB,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              statBRef.current!.textContent = formatInt(obj.v);
            },
          });
        }
      };

      if (demandRef.current) {
        ScrollTrigger.create({
          trigger: demandRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => startCounters(),
        });
      }

      // Quote + portfolio reveals
      gsap.from(".bt-quote", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top 82%",
        },
      });

      if (portfolioRef.current) {
        // Animate the numeric counts in the grid (as plain ints).
        const targets = portfolioItems.map((it) => {
          const raw = it.count.replace(/[^\d.]/g, "");
          return Number(raw) || 0;
        });

        ScrollTrigger.create({
          trigger: portfolioRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            portfolioCounterRefs.current.forEach((el, idx) => {
              if (!el) return;
              const target = clamp(targets[idx] ?? 0, 0, 1_000_000);
              const obj = { v: 0 };
              gsap.to(obj, {
                v: target,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = formatInt(obj.v);
                },
              });
            });
          },
        });
      }

      // Discover / Develop / Deploy steps
      gsap.from(".bt-step", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: discoverRef.current,
          start: "top 80%",
        },
      });
    },
    { dependencies: [reduceMotion, language, t] }
  );

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      {/* Cinematic hero */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="/turbine_fixed.mp4"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgb(var(--color-primary-rgb) / 0.22), transparent 52%)",
          }}
        />

        <div className="relative container mx-auto px-6 md:px-12 py-24">
          <div className="max-w-3xl">
            <div
              className="bt-hero-reveal inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2"
              style={{
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">
                {t("home.breakthrough.hero.kicker")}
              </span>
            </div>

            <h2 className="bt-hero-reveal mt-6 text-4xl md:text-6xl font-heading font-extrabold leading-[1.02]">
              {t("home.breakthrough.hero.title")}
            </h2>
            <p
              className="bt-hero-reveal mt-5 text-white/70 leading-relaxed text-base md:text-lg"
              style={{
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
              {t("home.breakthrough.hero.subtitle")}
            </p>

            <div className="bt-hero-reveal mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-gray-900 font-bold px-8 py-4 hover:bg-primary/90 transition-colors"
              >
                {t("home.breakthrough.hero.cta1")}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-white font-bold px-8 py-4 hover:bg-white/10 transition-colors"
              >
                {t("home.breakthrough.hero.cta2")}
              </a>
            </div>

            <div className="bt-hero-reveal mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  v: t("home.breakthrough.mini.one.value"),
                  l: t("home.breakthrough.mini.one.label"),
                },
                {
                  v: t("home.breakthrough.mini.two.value"),
                  l: t("home.breakthrough.mini.two.label"),
                },
                {
                  v: t("home.breakthrough.mini.three.value"),
                  l: t("home.breakthrough.mini.three.label"),
                },
                {
                  v: t("home.breakthrough.mini.four.value"),
                  l: t("home.breakthrough.mini.four.label"),
                },
              ].map((item) => (
                <div
                  key={item.l}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                    {item.v}
                  </div>
                  <div className="mt-1 text-white/65 text-xs md:text-sm font-bold uppercase tracking-widest">
                    {item.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bt-hero-reveal flex items-center gap-3 text-white/70">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest">
            {t("home.breakthrough.hero.scrollForMore")}
          </span>
          <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-bounce">
            <span className="text-lg leading-none">↓</span>
          </span>
        </div>
      </section>

      {/* Opportunity ahead */}
      <section
        ref={opportunityRef}
        className="py-20 bg-black border-t border-white/5"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-white/65 text-sm font-bold uppercase tracking-widest">
                {t("home.breakthrough.opportunity.kicker")}
              </div>
              <h3 className="mt-3 text-3xl md:text-5xl font-heading font-extrabold">
                {t("home.breakthrough.opportunity.title")}
              </h3>
              <p className="mt-4 text-white/70 leading-relaxed">
                {t("home.breakthrough.opportunity.subtitle")}
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                key: "affordable",
                title: t("home.breakthrough.cards.affordable.title"),
                desc: t("home.breakthrough.cards.affordable.desc"),
              },
              {
                key: "reliable",
                title: t("home.breakthrough.cards.reliable.title"),
                desc: t("home.breakthrough.cards.reliable.desc"),
              },
              {
                key: "clean",
                title: t("home.breakthrough.cards.clean.title"),
                desc: t("home.breakthrough.cards.clean.desc"),
              },
            ].map((c) => (
              <div
                key={c.key}
                className="bt-opportunity-card rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                  {c.title}
                </div>
                <div className="mt-4 text-xl md:text-2xl font-heading font-extrabold">
                  {c.title}
                </div>
                <p className="mt-4 text-white/70 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demand / numbers */}
      <section ref={demandRef} className="py-20 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="text-white/65 text-sm font-bold uppercase tracking-widest">
                {t("home.breakthrough.demand.kicker")}
              </div>
              <h3 className="mt-3 text-3xl md:text-5xl font-heading font-extrabold">
                {t("home.breakthrough.demand.title")}
              </h3>
              <p className="mt-4 text-white/70 leading-relaxed">
                {t("home.breakthrough.demand.text")}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                    <div className="text-5xl md:text-6xl font-heading font-extrabold leading-none">
                      <span ref={statARef}>0</span>
                      <span className="text-primary">+</span>
                    </div>
                    <div className="mt-4 text-white/65 font-bold uppercase tracking-widest text-sm">
                      {t("home.breakthrough.demand.statA.label")}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                    <div className="text-5xl md:text-6xl font-heading font-extrabold leading-none">
                      <span ref={statBRef}>0</span>
                      <span className="text-primary">+</span>
                    </div>
                    <div className="mt-4 text-white/65 font-bold uppercase tracking-widest text-sm">
                      {t("home.breakthrough.demand.statB.label")}
                    </div>
                  </div>
                </div>

                <div className="mt-8 h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full w-[33%] animate-[bt-pulse_2.2s_infinite]"
                    style={{ animationDuration: "3s" }}
                  />
                </div>

                <p className="mt-6 text-white/70 leading-relaxed">
                  {t("home.breakthrough.demand.note")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote + Portfolio */}
      <section ref={portfolioRef} className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="lg:grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="bt-quote rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
                <div className="text-white/60 text-sm font-bold uppercase tracking-widest">
                  {t("home.breakthrough.quote.kicker")}
                </div>
                <p className="mt-4 text-2xl md:text-3xl font-heading font-extrabold leading-relaxed">
                  “{t("home.breakthrough.quote.text")}”
                </p>
                <div className="mt-6 text-white/70 font-bold">
                  {t("home.breakthrough.quote.author")}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="text-white/65 text-sm font-bold uppercase tracking-widest">
                {t("home.breakthrough.portfolio.kicker")}
              </div>
              <h3 className="mt-3 text-3xl md:text-5xl font-heading font-extrabold">
                {t("home.breakthrough.portfolio.title")}
              </h3>
              <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
                {t("home.breakthrough.portfolio.subtitle")}
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {portfolioItems.map((item, idx) => (
                  <div
                    key={item.key}
                    className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl border border-white/10 bg-black/20 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="text-3xl font-heading font-extrabold text-white">
                        <span
                          ref={(el) => {
                            portfolioCounterRefs.current[idx] = el;
                          }}
                        >
                          {item.count}
                        </span>
                      </div>
                    </div>
                    <div
                      className="mt-3 text-white/70 font-bold leading-relaxed"
                      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover / Develop / Deploy */}
      <section ref={discoverRef} className="py-20 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="text-white/65 text-sm font-bold uppercase tracking-widest">
              {t("home.breakthrough.ddd.kicker")}
            </div>
            <h3 className="mt-3 text-3xl md:text-5xl font-heading font-extrabold">
              {t("home.breakthrough.ddd.title")}
            </h3>
            <p className="mt-4 text-white/70 leading-relaxed">
              {t("home.breakthrough.ddd.subtitle")}
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                key: "discover",
                title: t("home.breakthrough.ddd.discover.title"),
                desc: t("home.breakthrough.ddd.discover.desc"),
              },
              {
                key: "develop",
                title: t("home.breakthrough.ddd.develop.title"),
                desc: t("home.breakthrough.ddd.develop.desc"),
              },
              {
                key: "deploy",
                title: t("home.breakthrough.ddd.deploy.title"),
                desc: t("home.breakthrough.ddd.deploy.desc"),
              },
            ].map((s, idx) => (
              <div
                key={s.key}
                className="bt-step rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-4 text-2xl md:text-3xl font-heading font-extrabold">
                  {s.title}
                </div>
                <p className="mt-4 text-white/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

