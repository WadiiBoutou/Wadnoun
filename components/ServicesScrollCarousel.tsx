"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGE_SRCS = [
  "/pics/image1.webp",
  "/pics/image2.webp",
  "/pics/image 3.webp",
  "/pics/image2.webp",
  "/pics/image 5.webp",
];

const CARD_W_VW = 72;
const CARD_H_VH = 58;
const PEEK_VH = 14;
const ACTIVE_TOP_VH = 21;
const RECEDED_TOP_VH = -28;
const RECEDED_SCALE = 0.88;
const BELOW_TOP_VH = 110;
const PEEK_TOP_VH = 100 - PEEK_VH;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export const ServicesScrollCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 150);
    window.addEventListener("resize", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const cards = gsap.utils.toArray<HTMLDivElement>(pin.querySelectorAll("[data-card]"));
      if (cards.length !== 5) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: pin,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const seg = 1 / 5;
          const segIndex = Math.min(4, Math.floor(p / seg));
          const tRaw = seg === 0 ? 0 : (p - segIndex * seg) / seg;
          const t = easeOutCubic(Math.min(1, tRaw));
          setActiveIndex(t >= 0.99 ? Math.min(4, segIndex + 1) : segIndex);

          cards.forEach((card, i) => {
            let topVh: number;
            let scale: number;
            let zIndex: number;

            if (i < segIndex) {
              topVh = RECEDED_TOP_VH;
              scale = RECEDED_SCALE;
              zIndex = i;
            } else if (i === segIndex) {
              topVh = ACTIVE_TOP_VH + (RECEDED_TOP_VH - ACTIVE_TOP_VH) * t;
              scale = 1 + (RECEDED_SCALE - 1) * t;
              zIndex = 9;
            } else if (i === segIndex + 1) {
              topVh = PEEK_TOP_VH + (ACTIVE_TOP_VH - PEEK_TOP_VH) * t;
              scale = 1;
              zIndex = 10;
            } else if (i === segIndex + 2) {
              topVh = BELOW_TOP_VH + (PEEK_TOP_VH - BELOW_TOP_VH) * t;
              scale = 1;
              zIndex = 8;
            } else {
              topVh = BELOW_TOP_VH;
              scale = 1;
              zIndex = i;
            }

            gsap.set(card, {
              top: `${topVh}vh`,
              scale,
              zIndex,
            });
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-accent-soft"
      style={{ height: "600vh" }}
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {IMAGE_SRCS.map((src, i) => (
          <div
            key={i}
            data-card
            className="absolute left-1/2 rounded-xl overflow-hidden bg-accent-soft shadow-2xl"
            style={{
              width: `${CARD_W_VW}vw`,
              height: `${CARD_H_VH}vh`,
              top: i === 0 ? `${ACTIVE_TOP_VH}vh` : i === 1 ? `${PEEK_TOP_VH}vh` : `${BELOW_TOP_VH}vh`,
              transform: "translateX(-50%)",
              transformOrigin: "50% 0%",
              zIndex: i === 0 ? 9 : i === 1 ? 10 : i,
              boxShadow: "0 24px 48px rgb(var(--color-black-rgb) / 0.4)",
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
