"use client";

import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const TestingAnimations = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    // 1. Wind Turbine Scroll Animation
    // We use scrub so the blades spin identically to the scroll distance
    gsap.to(".turbine-blades", {
      rotation: 360 * 3, // spins 3 full times over the scroll distance
      ease: "none",
      scrollTrigger: {
        trigger: ".turbine-section",
        start: "top top",
        end: "+=2000", // Makes the section take roughy 3 scroll wheels
        scrub: 1, // Smooth scrub
        pin: true // Pins the turbine while scrolling
      }
    });

    // 2. Solar Panel Scroll Animation
    // We animate the black overlay's opacity from 1 to 0 (fading out the dark)
    gsap.to(".solar-panel-overlay", {
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".solar-section",
        start: "top top",
        end: "+=2000", // Smooth long scroll
        scrub: 1,
        pin: true
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white flex flex-col items-center overflow-x-hidden">
      
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-secondary mb-4">Testing Animation Tab</h1>
        <p className="text-xl text-gray-500 max-w-xl">Scroll down to observe the scrub-based animations pinning and reacting smoothly to your scrollbar.</p>
      </div>

      {/* Turbine Section */}
      <div className="turbine-section w-full h-screen flex flex-col items-center justify-center relative bg-sky-50 shadow-inner">
        <h2 className="absolute top-20 text-3xl font-bold text-gray-800">1. Wind Turbine (Scroll to Spin)</h2>
        
        <div className="relative w-64 h-96 flex flex-col items-center mt-20">
          {/* Blades (separate rotating element) */}
          <div className="turbine-blades absolute -top-12 z-10 w-64 h-64 flex items-center justify-center origin-center">
             <svg viewBox="0 0 100 100" className="w-full h-full text-slate-700 drop-shadow-xl">
               <circle cx="50" cy="50" r="4" fill="currentColor"/>
               {/* Blade 1 */}
               <path d="M48 50 C45 20 48 5 50 0 C52 5 55 20 52 50 Z" fill="currentColor" />
               {/* Blade 2 */}
               <path d="M48 50 C45 20 48 5 50 0 C52 5 55 20 52 50 Z" fill="currentColor" transform="rotate(120 50 50)" />
               {/* Blade 3 */}
               <path d="M48 50 C45 20 48 5 50 0 C52 5 55 20 52 50 Z" fill="currentColor" transform="rotate(240 50 50)" />
             </svg>
          </div>
          {/* Base */}
          <div className="absolute top-[38px] w-4 h-72 bg-gradient-to-r from-gray-400 to-gray-300 rounded-t-full rounded-b-md z-0 shadow-lg"></div>
        </div>
      </div>

      {/* Solar Panel Section */}
      <div className="solar-section w-full h-screen flex flex-col items-center justify-center relative bg-yellow-50 shadow-inner">
        <h2 className="absolute top-20 text-3xl font-bold text-gray-800">2. Solar Panel (Scroll to Light Up)</h2>
        
        <div className="relative w-full max-w-2xl aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border-8 border-slate-800 bg-[var(--color-accent)] transform -rotate-12 hover:rotate-0 transition-transform duration-1000 mt-20">
          
          {/* Solar Grid Simulation */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-1 p-2">
            {Array.from({length: 32}).map((_, i) => (
              <div key={i} className="bg-blue-600/80 rounded-sm border border-blue-400/30"></div>
            ))}
          </div>

          {/* Sun Reflection Fake Layer */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/30 blur-[40px] rounded-full"></div>
          
          {/* Darkness Overlay that fades out */}
          <div className="solar-panel-overlay absolute inset-0 bg-black/95 pointer-events-none"></div>
        </div>
      </div>

      {/* Extra space at the bottom to finish the final scroll */}
      <div className="h-[80vh] w-full flex items-center justify-center bg-gray-900 text-white text-2xl font-bold">
        End of Animation Testing
      </div>
    </section>
  );
};
