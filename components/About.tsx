"use client";

import { useLanguage } from "./LanguageProvider";
import { Zap, ShieldCheck, Leaf } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const About = () => {
  const { t, language } = useLanguage();
  const aboutRef = useRef<HTMLElement>(null);

  const features = [
    { icon: <Zap size={32} className="text-secondary" />, title: "Efficacité", delay: 0 },
    { icon: <ShieldCheck size={32} className="text-secondary" />, title: "Confiance", delay: 0 },
    { icon: <Leaf size={32} className="text-secondary" />, title: "Durable", delay: 0 },
  ];

  useGSAP(() => {
    // We use .to() and starting tailwind classes to prevent FOUC perfectly
    gsap.to(".about-text", {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 75%"
      }
    });

    gsap.to(".about-feature", {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-feature-parent",
        start: "top 80%"
      }
    });

    gsap.to(".about-image", {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%"
      }
    });

  }, { scope: aboutRef, dependencies: [language] });

  return (
    <section id="about" ref={aboutRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className={`about-text w-full md:w-1/2 opacity-0 ${language === 'ar' ? 'translate-x-[50px]' : '-translate-x-[50px]'}`}>
             <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 relative inline-block">
               {t("about.title")}
               <span className={`absolute -bottom-2 ${language === 'ar' ? 'right-0' : 'left-0'} w-20 h-1 bg-primary rounded-full`}></span>
             </h2>
             <p className="text-lg text-gray-600 mb-6 leading-relaxed mt-6">
               {t("about.desc1")}
             </p>
             <p className="text-lg text-gray-600 leading-relaxed font-medium">
               {t("about.desc2")}
             </p>

             <div className="about-feature-parent mt-12 flex gap-8">
               {features.map((feat, idx) => (
                 <div 
                   key={idx}
                   className="about-feature opacity-0 translate-y-8 flex flex-col items-center gap-3"
                 >
                   <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                     {feat.icon}
                   </div>
                   <span className="font-semibold text-gray-800">{feat.title}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="about-image opacity-0 scale-90 aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <Image
                src="/about.webp"
                alt="Renewable Energy Setup WadNoun"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
               <div className="absolute inset-0 bg-secondary/10 hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
