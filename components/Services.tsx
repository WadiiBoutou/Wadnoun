"use client";

import { useLanguage } from "../components/LanguageProvider";
import { Zap, Activity, Sun, Lightbulb, Settings2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import { HoverEffect } from "./ui/hover-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const Services = () => {
  const { t } = useLanguage();
  const servicesRef = useRef<HTMLElement>(null);

  const servicesList = [
    { key: "electric", icon: Zap },
    { key: "transform", icon: Activity },
    { key: "light", icon: Sun },
    { key: "energy", icon: Lightbulb },
    { key: "control", icon: Settings2 },
  ];

  useGSAP(() => {
    // Reveal Title
    gsap.to(".service-title", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".service-title",
        start: "top 85%"
      }
    });

    // Reveal Cards mapped from HoverEffect
    gsap.to(".service-card", {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 75%"
      }
    });
  }, { scope: servicesRef });

  return (
    <section id="services" ref={servicesRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="service-title opacity-0 translate-y-8 text-4xl md:text-5xl font-bold text-secondary inline-block relative">
            {t("services.title")}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-primary rounded-full"></span>
          </h2>
        </div>

        {/* Aceternity Bento-Hover like Grid */}
        <HoverEffect items={servicesList} t={t} />

      </div>
    </section>
  );
};
