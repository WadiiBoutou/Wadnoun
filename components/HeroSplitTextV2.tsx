"use client";

import { useRef } from "react";
import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800",
];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smooth01(n: number) {
  const t = clamp01(n);
  // Smoothstep for less clunky interpolation
  return t * t * (3 - 2 * t);
}

export const HeroSplitTextV2 = () => {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  const white1Ref = useRef<HTMLSpanElement>(null);
  const white2Ref = useRef<HTMLSpanElement>(null);
  const white3Ref = useRef<HTMLSpanElement>(null);

  const energyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Initial visible state for line1.
      if (line1Ref.current) gsap.set(line1Ref.current, { opacity: 0.9, x: -40 });
      if (line2Ref.current) gsap.set(line2Ref.current, { opacity: 0, x: -80 });
      if (line3Ref.current) gsap.set(line3Ref.current, { opacity: 0, x: -80 });

      if (white1Ref.current) gsap.set(white1Ref.current, { opacity: 0.9, x: -40 });
      if (white2Ref.current) gsap.set(white2Ref.current, { opacity: 0, x: -80 });
      if (white3Ref.current) gsap.set(white3Ref.current, { opacity: 0, x: -80 });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (!Number.isFinite(p)) return;

          // Keep Line1 visible immediately (reference shows it present at top).
          const l1 = 1;
          const l2 = smooth01((p - 0.33) / 0.33);
          const l3 = smooth01((p - 0.66) / 0.34);

          // Lines (opacity + slide-in)
          const lineVals = [l1, l2, l3];
          [line1Ref.current, line2Ref.current, line3Ref.current].forEach((el, i) => {
            if (!el) return;
            const val = lineVals[i];
            gsap.set(el, { opacity: val, x: -80 + 80 * val });
          });

          [white1Ref.current, white2Ref.current, white3Ref.current].forEach((el, i) => {
            if (!el) return;
            const val = lineVals[i];
            gsap.set(el, { opacity: val, x: -80 + 80 * val });
          });

          // Images (NO opacity fade): scaleX wipe from left
          const t12 = smooth01((p - 0.33) / 0.33); // between img1->img2
          const t23 = smooth01((p - 0.66) / 0.34); // between img2->img3

          const scale1 = 1 - t12;
          const scale2 = t12 * (1 - t23);
          const scale3 = t23;

          if (img1Ref.current)
            gsap.set(img1Ref.current, { scaleX: scale1, transformOrigin: "left center" });
          if (img2Ref.current)
            gsap.set(img2Ref.current, { scaleX: scale2, transformOrigin: "left center" });
          if (img3Ref.current)
            gsap.set(img3Ref.current, { scaleX: scale3, transformOrigin: "left center" });
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f5f0]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 left-0 h-screen w-full flex items-center overflow-hidden">
        <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
          {/* Left column */}
          <div className="relative z-10 pl-0 md:pl-8" style={{ maxWidth: "52%" }}>
            <div
              className="font-heading font-bold text-black leading-tight"
              style={{ fontSize: "clamp(2rem, 10vw, 6rem)" }}
            >
              <div ref={line1Ref} className="origin-left">
                {t("home.hero.split.line1")}
              </div>
              <div ref={line2Ref} className="origin-left mt-2 opacity-0">
                {t("home.hero.split.line2")}
              </div>
              <div ref={line3Ref} className="origin-left mt-2 opacity-0">
                {t("home.hero.split.line3")}
              </div>
            </div>
          </div>

          {/* Image card */}
          <div
            className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[550px] rounded-sm overflow-hidden"
            style={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              zIndex: 5,
            }}
          >
            <span className="absolute top-2 left-2 w-4 h-4 border-l border-t border-gray-800 z-10 pointer-events-none" />
            <span className="absolute top-2 right-2 w-4 h-4 border-r border-t border-gray-800 z-10 pointer-events-none" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-gray-800 z-10 pointer-events-none" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-gray-800 z-10 pointer-events-none" />

            <div className="absolute inset-0">
              <div ref={img1Ref} className="absolute inset-0 opacity-100">
                <Image src={IMAGES[0]} alt="" fill className="object-cover" sizes="500px" />
              </div>
              <div
                ref={img2Ref}
                className="absolute inset-0 opacity-100"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              >
                <Image src={IMAGES[1]} alt="" fill className="object-cover" sizes="500px" />
              </div>
              <div
                ref={img3Ref}
                className="absolute inset-0 opacity-100"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              >
                <Image src={IMAGES[2]} alt="" fill className="object-cover" sizes="500px" />
              </div>
            </div>
          </div>

          {/* White overlay: clipped to card bounds */}
          <div
            className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[550px] overflow-hidden rounded-sm pointer-events-none"
            style={{ zIndex: 6 }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 font-heading font-bold text-white leading-tight pl-8"
              style={{
                fontSize: "clamp(2rem, 10vw, 6rem)",
                width: "200%",
                marginLeft: "-52%",
              }}
            >
              <span ref={white1Ref} className="block origin-left">
                {t("home.hero.split.line1")}
              </span>
              <span ref={white2Ref} className="block opacity-0 origin-left mt-2">
                {t("home.hero.split.line2")}
              </span>
              <span ref={white3Ref} className="block opacity-0 origin-left mt-2">
                {t("home.hero.split.line3")}
              </span>
            </div>
          </div>

          {/* Energy bottom-right */}
          <div
            ref={energyRef}
            className="absolute font-heading font-bold text-primary"
            style={{
              right: "calc(10% + 20px)",
              bottom: "calc(50% - 275px - 40px)",
              fontSize: "clamp(2rem, 10vw, 6rem)",
              zIndex: 7,
            }}
          >
            {t("home.hero.split.energy")}
          </div>
        </div>
      </div>
    </section>
  );
};

