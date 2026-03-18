"use client";

import { useLanguage } from "./LanguageProvider";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const Contact = () => {
  const { t, language } = useLanguage();
  const contactRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to(".contact-title", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%"
      }
    });

    gsap.to(".contact-info", {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 75%"
      }
    });

    gsap.to(".contact-form", {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 75%"
      }
    });
  }, { scope: contactRef, dependencies: [language] });

  return (
    <section id="contact" ref={contactRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="contact-title opacity-0 translate-y-8 text-4xl md:text-5xl font-bold text-secondary inline-block relative">
            {t("contact.title")}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-primary rounded-full"></span>
          </h2>
        </div>

        <div className="contact-grid flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className={`contact-info w-full lg:w-1/3 space-y-8 opacity-0 ${language === 'ar' ? 'translate-x-[50px]' : '-translate-x-[50px]'}`}>
            <div className="bg-gray-50 p-8 rounded-3xl h-full flex flex-col justify-center gap-8 shadow-sm border border-gray-100 group">
              <a href="tel:0602606041" className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors shadow-sm shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xl mb-1">{t("contact.phone")}</h4>
                  <p className="text-gray-600 text-lg group-hover/item:text-primary transition-colors" dir="ltr">0602-606041</p>
                </div>
              </a>

              <div className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors shadow-sm shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xl mb-1">{t("contact.email")}</h4>
                  <p className="text-gray-600 text-lg group-hover/item:text-primary transition-colors">contact@wadnoun-ad.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group/item">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors shadow-sm shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xl mb-1">{t("contact.address")}</h4>
                  <p className="text-gray-600 text-lg">Siège Social, WadNoun, Maroc</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`contact-form w-full lg:w-2/3 opacity-0 ${language === 'ar' ? '-translate-x-[50px]' : 'translate-x-[50px]'}`}>
            <form className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/2 h-2 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-2">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">{t("contact.name")}</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-800 text-lg" placeholder="..." />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-3">{t("contact.email")}</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-800 text-lg" placeholder="..." />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3">{t("contact.message")}</label>
                <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-800 text-lg resize-none" placeholder="..."></textarea>
              </div>
              <button type="button" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-10 py-5 rounded-xl w-full flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-lg shadow-secondary/20">
                {t("contact.send")}
                <Send size={24} className={language === 'ar' ? 'rotate-180 transform' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
