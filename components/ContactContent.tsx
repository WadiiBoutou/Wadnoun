"use client";

import { useLanguage } from "./LanguageProvider";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactContent = () => {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full">
      
      {/* Hero — dark cinematic */}
      <section data-navbar="light" className="pt-40 pb-32 bg-[#0a0f0d] text-center px-6">
        <h1 className="reveal opacity-0 translate-y-6 text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">
          {t("contact.hero.title")}
        </h1>
        <p className="reveal opacity-0 translate-y-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          {t("contact.hero.subtitle")}
        </p>
      </section>

      {/* Form + Info */}
      <section data-navbar="dark" className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Form */}
            <div className="reveal opacity-0 translate-y-6">
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wider uppercase">{t("contact.form.name")}</label>
                  <input type="text" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-3 outline-none focus:border-primary transition-colors text-base" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wider uppercase">{t("contact.form.email")}</label>
                  <input type="email" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-3 outline-none focus:border-primary transition-colors text-base" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wider uppercase">{t("contact.form.phone")}</label>
                  <input type="tel" className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-3 outline-none focus:border-primary transition-colors text-base" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wider uppercase">{t("contact.form.type")}</label>
                  <select className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-3 outline-none focus:border-primary transition-colors text-base">
                    <option>{t("contact.form.type.opt1")}</option>
                    <option>{t("contact.form.type.opt2")}</option>
                    <option>{t("contact.form.type.opt3")}</option>
                    <option>{t("contact.form.type.opt4")}</option>
                    <option>{t("contact.form.type.opt5")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wider uppercase">{t("contact.form.msg")}</label>
                  <textarea rows={3} className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-0 py-3 outline-none focus:border-primary transition-colors resize-none text-base leading-relaxed"></textarea>
                </div>
                <button className="bg-[#0a0f0d] text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 hover:bg-[#0a0f0d]/90 transition-colors mt-4 text-base">
                  {t("contact.form.btn")} <Send size={18} />
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="reveal opacity-0 translate-y-6 flex flex-col gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-gray-900">{t("contact.info.title")}</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0"><Phone size={22} /></div>
                    <span className="text-base font-bold text-gray-700">{t("contact.info.phone")}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0"><Mail size={22} /></div>
                    <span className="text-base font-bold text-gray-700">{t("contact.info.email")}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0"><MapPin size={22} /></div>
                    <span className="text-base font-bold text-gray-700">{t("contact.info.address")}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0"><Clock size={22} /></div>
                    <span className="text-base font-bold text-gray-700">{t("contact.info.hours")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#25D366]/10 border border-[#25D366]/20 p-8 rounded-2xl mt-auto">
                <p className="text-base text-gray-700 mb-5 leading-relaxed">{t("contact.wa.text")}</p>
                <a href="https://wa.me/212602606041" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform shadow-lg shadow-[#25D366]/30">
                  <MessageCircle size={22} />
                  {t("contact.wa.btn")}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
