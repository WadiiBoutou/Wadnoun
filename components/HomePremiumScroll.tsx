"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Sun, Wind, Zap, ShieldCheck, Gauge } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatInt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n));
}

export const HomePremiumScroll = () => {
  const { t, language } = useLanguage();

  const rootRef = useRef<HTMLDivElement>(null);
  const stickyOuterRef = useRef<HTMLDivElement>(null);

  const revealOverlayRef = useRef<HTMLDivElement>(null);
  const underlayRef = useRef<HTMLDivElement>(null);

  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressPctRef = useRef<HTMLDivElement>(null);

  const counterARef = useRef<HTMLSpanElement>(null);
  const counterBRef = useRef<HTMLSpanElement>(null);

  const galleryViewportRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const galleryProgressBarRef = useRef<HTMLDivElement>(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const apply = () => setReduceMotion(mq.matches);
    const rafId = window.requestAnimationFrame(apply);
    mq.addEventListener?.("change", apply);

    return () => {
      window.cancelAnimationFrame(rafId);
      mq.removeEventListener?.("change", apply);
    };
  }, []);

  const storySteps = useMemo(
    () => [
      {
        title: t("home.premium.story.step1.title"),
        desc: t("home.premium.story.step1.desc"),
        tag: "01",
      },
      {
        title: t("home.premium.story.step2.title"),
        desc: t("home.premium.story.step2.desc"),
        tag: "02",
      },
      {
        title: t("home.premium.story.step3.title"),
        desc: t("home.premium.story.step3.desc"),
        tag: "03",
      },
      {
        title: t("home.premium.story.step4.title"),
        desc: t("home.premium.story.step4.desc"),
        tag: "04",
      },
    ],
    [t]
  );

  const galleryCards = useMemo(
    () => [
      {
        key: "solar",
        icon: <Sun size={28} className="text-primary" />,
        title: t("home.premium.gallery.solar.title"),
        desc: t("home.premium.gallery.solar.desc"),
        bgPos: language === "ar" ? "70% 35%" : "20% 35%",
      },
      {
        key: "wind",
        icon: <Wind size={28} className="text-primary" />,
        title: t("home.premium.gallery.wind.title"),
        desc: t("home.premium.gallery.wind.desc"),
        bgPos: language === "ar" ? "65% 65%" : "35% 65%",
      },
      {
        key: "audit",
        icon: <Gauge size={28} className="text-primary" />,
        title: t("home.premium.gallery.audit.title"),
        desc: t("home.premium.gallery.audit.desc"),
        bgPos: language === "ar" ? "30% 60%" : "60% 60%",
      },
      {
        key: "storage",
        icon: <Zap size={28} className="text-primary" />,
        title: t("home.premium.gallery.storage.title"),
        desc: t("home.premium.gallery.storage.desc"),
        bgPos: language === "ar" ? "30% 30%" : "70% 30%",
      },
      {
        key: "security",
        icon: <ShieldCheck size={28} className="text-primary" />,
        title: t("home.premium.gallery.security.title"),
        desc: t("home.premium.gallery.security.desc"),
        bgPos: language === "ar" ? "60% 25%" : "35% 25%",
      },
    ],
    [t, language]
  );

  useGSAP(
    () => {
      if (reduceMotion) return;
      if (!rootRef.current || !stickyOuterRef.current) return;

      const stepsCount = storySteps.length;
      const maxIndex = Math.max(0, stepsCount - 1);

      // Initial state
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0.18,
          y: i === 0 ? 0 : 18,
        });
      });
      if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: 0 });
      if (progressPctRef.current) progressPctRef.current.textContent = "0%";
      if (revealOverlayRef.current) gsap.set(revealOverlayRef.current, { scaleX: 0 });
      if (underlayRef.current) gsap.set(underlayRef.current, { y: 10 });

      const trigger = stickyOuterRef.current;

      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress; // 0..1
          const activeIdx = clamp(Math.floor(p * stepsCount), 0, maxIndex);

          stepRefs.current.forEach((el, i) => {
            if (!el) return;
            const isActive = i === activeIdx;
            gsap.set(el, {
              opacity: isActive ? 1 : i <= activeIdx ? 0.55 : 0.14,
              y: isActive ? 0 : 18,
            });
          });

          const revealP = clamp((p - 0.08) / 0.84, 0, 1);
          if (revealOverlayRef.current) gsap.set(revealOverlayRef.current, { scaleX: revealP });
          if (underlayRef.current) gsap.set(underlayRef.current, { y: 10 - revealP * 14 });

          if (progressBarRef.current) gsap.set(progressBarRef.current, { scaleX: p });
          if (progressPctRef.current) {
            progressPctRef.current.textContent = `${Math.round(p * 100)}%`;
          }

          const aTarget = 120; // "120+"
          const bTarget = 25; // "25 ans"
          if (counterARef.current) counterARef.current.textContent = `${formatInt(aTarget * p)}+`;
          if (counterBRef.current) counterBRef.current.textContent = `${formatInt(bTarget * p)}`;
        },
      });

      return () => scrollTrigger.kill();
    },
    { scope: rootRef, dependencies: [reduceMotion, language, storySteps] }
  );

  useGSAP(
    () => {
      if (reduceMotion) return;
      if (!galleryViewportRef.current || !galleryTrackRef.current) return;

      const viewportEl = galleryViewportRef.current;
      const trackEl = galleryTrackRef.current;

      const compute = () => {
        const maxScroll = trackEl.scrollWidth - viewportEl.clientWidth;
        return Math.max(0, maxScroll);
      };

      // RTL feels natural by moving the track "forward" the other way.
      const dir = language === "ar" ? 1 : -1;
      const onUpdate = (self: { progress: number }) => {
        if (galleryProgressBarRef.current) gsap.set(galleryProgressBarRef.current, { scaleX: self.progress });
      };

      const tween = gsap.to(trackEl, {
        x: () => dir * compute(),
        ease: "none",
        scrollTrigger: {
          trigger: viewportEl,
          start: "top top",
          end: () => `+=${compute()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate,
          markers: false,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: rootRef, dependencies: [reduceMotion, language, galleryCards] }
  );

  return (
    <div ref={rootRef} className="w-full bg-black text-white overflow-hidden">
      {/* Sticky cinematic storytelling */}
      <section className="relative bg-black">
        <div
          ref={stickyOuterRef}
          className="relative h-[320vh] py-24"
        >
          <div className="sticky top-0 h-screen flex items-center">
            {/* Ambient gradients */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgb(var(--color-primary-rgb) / 0.18), transparent 50%), radial-gradient(ellipse at bottom, rgb(var(--color-secondary-rgb) / 0.28), transparent 55%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

            {/* Cinematic reveal image (same asset, editorial masks) */}
            <div className="absolute inset-0">
              <div
                ref={underlayRef}
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url(/about.webp)" }}
              />
              <div
                ref={revealOverlayRef}
                className="absolute inset-0 bg-cover bg-center opacity-95"
                style={{
                  backgroundImage: "url(/about.webp)",
                  transformOrigin: language === "ar" ? "right center" : "left center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-black/90" />
            </div>

            <div className="relative container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-widest">
                    {t("home.premium.story.kicker")}
                  </span>
                </div>

                <h2 className="mt-6 text-4xl md:text-6xl font-heading font-extrabold leading-[1.03]">
                  {t("home.premium.story.title")}
                </h2>
                <p className="mt-5 max-w-xl text-white/75 leading-relaxed text-base md:text-lg">
                  {t("home.premium.story.subtitle")}
                </p>

                <div className="mt-10 space-y-5">
                  {storySteps.map((s, i) => (
                    <div
                      key={s.tag}
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      className="flex items-start gap-4 opacity-0 translate-y-6"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-heading font-extrabold text-lg">
                        {s.tag}
                      </div>
                      <div>
                        <div className="font-bold text-xl">{s.title}</div>
                        <div className="mt-1 text-white/70 leading-relaxed">
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-2 gap-6">
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur">
                    <div className="text-3xl md:text-4xl font-heading font-extrabold">
                      <span ref={counterARef}>0</span>
                    </div>
                    <div className="mt-2 text-white/70 font-bold">
                      {t("home.premium.counter.a.label")}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur">
                    <div className="text-3xl md:text-4xl font-heading font-extrabold">
                      <span ref={counterBRef}>0</span>
                      <span className="text-primary font-heading"> {t("home.premium.counter.b.suffix")}</span>
                    </div>
                    <div className="mt-2 text-white/70 font-bold">
                      {t("home.premium.counter.b.label")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <div className="text-white/65 text-sm font-bold uppercase tracking-widest">
                        {t("home.premium.story.progress.label")}
                      </div>
                      <div className="text-white/95 text-lg font-bold mt-1">
                        {t("home.premium.story.progress.value")}
                      </div>
                    </div>
                    <div className="text-3xl font-heading font-extrabold text-primary">
                      <span ref={progressPctRef}>0%</span>
                    </div>
                  </div>

                  <div className="mt-7 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      ref={progressBarRef}
                      className="h-full w-full origin-left bg-primary rounded-full"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>

                  <div className="mt-10 space-y-3">
                    <p className="text-white/70 leading-relaxed">
                      {t("home.premium.story.note")}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {[
                        t("home.premium.story.pill1"),
                        t("home.premium.story.pill2"),
                        t("home.premium.story.pill3"),
                      ].map((pill) => (
                        <span
                          key={pill}
                          className="px-3 py-1 rounded-full border border-white/10 bg-black/20 text-white/75 text-xs font-bold"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-sm text-white/60 font-bold uppercase tracking-widest">
                      {t("home.premium.story.signal.label")}
                    </div>
                    <div className="mt-2 text-white/90 font-bold text-lg">
                      {t("home.premium.story.signal.value")}
                    </div>
                    <div className="mt-3 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-white/20 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal gallery */}
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-white/65 text-sm font-bold uppercase tracking-widest">
                {t("home.premium.gallery.kicker")}
              </div>
              <h3 className="mt-3 text-3xl md:text-5xl font-heading font-extrabold">
                {t("home.premium.gallery.title")}
              </h3>
              <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">
                {t("home.premium.gallery.subtitle")}
              </p>
            </div>
          </div>

          <div
            ref={galleryViewportRef}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 min-h-[70vh]"
          >
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-6 z-10">
              <div className="text-white/70 text-sm font-bold uppercase tracking-widest">
                {t("home.premium.gallery.progress.label")}
              </div>
              <div className="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  ref={galleryProgressBarRef}
                  className="h-full w-full origin-left bg-primary rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>

            <div
              ref={galleryTrackRef}
              className="flex gap-8 py-28 px-8 will-change-transform"
            >
              {galleryCards.map((c) => (
                <div
                  key={c.key}
                  className="relative shrink-0 w-[min(420px,80vw)] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                      backgroundImage: "url(/about.webp)",
                      backgroundPosition: c.bgPos,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                  <div className="relative p-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {c.icon}
                    </div>
                    <h4 className="mt-6 text-2xl font-heading font-extrabold">
                      {c.title}
                    </h4>
                    <p className="mt-3 text-white/70 leading-relaxed">
                      {c.desc}
                    </p>
                    <div className="mt-7 flex items-center gap-3 text-primary font-bold">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">
                        {t("home.premium.gallery.cta")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

