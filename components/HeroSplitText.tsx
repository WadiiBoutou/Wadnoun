"use client";

import { useRef, useEffect, useState } from "react";
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

export const HeroSplitText = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const blackBlockRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const energyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const white1Ref = useRef<HTMLSpanElement>(null);
  const white2Ref = useRef<HTMLSpanElement>(null);
  const white3Ref = useRef<HTMLSpanElement>(null);

  const [whiteOffsetX, setWhiteOffsetX] = useState(0);
  const [cardMetrics, setCardMetrics] = useState({
    left: 0,
    top: 0,
    width: 500,
    height: 550,
  });

  useEffect(() => {
    const compute = () => {
      if (!stageRef.current || !cardRef.current || !blackBlockRef.current) return;
      const stageRect = stageRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      const blackRect = blackBlockRef.current.getBoundingClientRect();

      // Shift needed to align the duplicate white text with the black text.
      // We must use the *text start* (container left + padding-left), not the container border box.
      const paddingLeftRaw =
        window.getComputedStyle(blackBlockRef.current).paddingLeft || "0px";
      const paddingLeft = Number.parseFloat(paddingLeftRaw) || 0;

      const textStartLeft = blackRect.left + paddingLeft;
      const shiftX = cardRect.left - textStartLeft;
      setWhiteOffsetX(shiftX);

      // Place the white overlay wrapper exactly on top of the image card.
      setCardMetrics({
        left: cardRect.left - stageRect.left,
        top: cardRect.top - stageRect.top,
        width: cardRect.width,
        height: cardRect.height,
      });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Initial render state so the hero isn't blank before the first ScrollTrigger update.
      if (line1Ref.current) gsap.set(line1Ref.current, { x: 0, opacity: 0.65 });
      if (line2Ref.current) gsap.set(line2Ref.current, { x: -80, opacity: 0 });
      if (line3Ref.current) gsap.set(line3Ref.current, { x: -80, opacity: 0 });

      if (white1Ref.current) gsap.set(white1Ref.current, { x: 0, opacity: 0.65 });
      if (white2Ref.current) gsap.set(white2Ref.current, { x: -80, opacity: 0 });
      if (white3Ref.current) gsap.set(white3Ref.current, { x: -80, opacity: 0 });

      if (img1Ref.current) gsap.set(img1Ref.current, { scaleX: 1 });
      if (img2Ref.current) gsap.set(img2Ref.current, { scaleX: 0 });
      if (img3Ref.current) gsap.set(img3Ref.current, { scaleX: 0 });

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.75,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (!Number.isFinite(p)) return;

          const clamp = (v: number, min: number, max: number) =>
            Math.min(max, Math.max(min, v));

          // Thresholds for each line:
          // Line1: 0..0.33
          // Line2: 0.33..0.66 (stays visible after)
          // Line3: 0.66..1
          // Ensure Line1 is visible on initial render (when ScrollTrigger progress is ~0).
          // Lines 2 and 3 still come in on their thresholds.
          const l1 = clamp(p / 0.33, 0.65, 1);
          const l2 = clamp((p - 0.33) / 0.33, 0, 1);
          const l3 = clamp((p - 0.66) / 0.34, 0, 1);

          [line1Ref.current, line2Ref.current, line3Ref.current].forEach((el, i) => {
            if (!el) return;
            const val = [l1, l2, l3][i];
            gsap.set(el, { x: -80 + 80 * val, opacity: val });
          });
          [white1Ref.current, white2Ref.current, white3Ref.current].forEach((el, i) => {
            if (!el) return;
            const val = [l1, l2, l3][i];
            gsap.set(el, { x: -80 + 80 * val, opacity: val });
          });

          // Image switching without opacity fades:
          // Use a GPU-friendly scaleX wipe.
          const scale1 = 1 - l2; // img1 hides during Line2 segment
          const scale2 = l2 * (1 - l3); // img2 reveals during Line2, hides during Line3
          const scale3 = l3; // img3 reveals during Line3

          if (img1Ref.current)
            gsap.set(img1Ref.current, { scaleX: scale1, transformOrigin: "left center" });
          if (img2Ref.current)
            gsap.set(img2Ref.current, { scaleX: scale2, transformOrigin: "left center" });
          if (img3Ref.current)
            gsap.set(img3Ref.current, { scaleX: scale3, transformOrigin: "left center" });
        },
      });

      return () => pinTrigger.kill();
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
        <div ref={stageRef} className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
          {/* Left column: black text (and clipped white overlay) */}
          <div
            ref={blackBlockRef}
            className="relative z-[120] pl-0 md:pl-8"
            style={{ maxWidth: "52%" }}
          >
            <div className="font-heading font-bold text-black leading-tight" style={{ fontSize: "clamp(2rem, 10vw, 6rem)" }}>
              <div
                id="hero-line1"
                ref={line1Ref}
                className="origin-left relative z-[130]"
              >
                {t("home.hero.split.line1")}
              </div>
              <div
                id="hero-line2"
                ref={line2Ref}
                className="opacity-0 origin-left mt-2 relative z-[130]"
              >
                {t("home.hero.split.line2")}
              </div>
              <div
                id="hero-line3"
                ref={line3Ref}
                className="opacity-0 origin-left mt-2 relative z-[130]"
              >
                {t("home.hero.split.line3")}
              </div>
            </div>
          </div>

          {/* Card container: slightly right of center */}
          <div
            ref={cardRef}
            className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[550px] rounded-sm overflow-hidden"
            style={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              zIndex: 5,
            }}
          >
            {/* Corner crosshairs */}
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

          {/* White text clipped to card bounds — same position/size as card */}
          <div
            className="absolute overflow-hidden rounded-sm pointer-events-none"
            style={{
              zIndex: 6,
              left: cardMetrics.left,
              top: cardMetrics.top,
              width: cardMetrics.width,
              height: cardMetrics.height,
            }}
          >
            <div
              className="absolute left-0 top-1/2 font-heading font-bold text-white leading-tight pl-8"
              style={{
                fontSize: "clamp(2rem, 10vw, 6rem)",
                transform: `translateX(${-whiteOffsetX}px) translateY(-50%)`,
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

          {/* "Énergie" bottom-right of card, accent green — inside card area */}
          <div
            ref={energyRef}
            className="absolute font-heading font-bold text-primary"
            style={{
              fontSize: "clamp(2rem, 10vw, 6rem)",
              right: "10%",
              bottom: "calc(50% - 275px - 1rem)",
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
