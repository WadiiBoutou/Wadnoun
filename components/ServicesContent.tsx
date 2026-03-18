"use client";

import { useLanguage } from "./LanguageProvider";
import { Zap, Home, Factory, Wind, Battery, BarChart, Settings } from "lucide-react";
import Link from "next/link";

export const ServicesContent = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white text-gray-800">
      
      {/* Hero Mini */}
      <section className="pt-40 pb-20 bg-gray-50 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-secondary mb-6">{t("services.hero.title")}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("services.hero.subtitle")}</p>
      </section>

      {/* Services List */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <div className="space-y-24">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="flex flex-col md:flex-row gap-12 items-center">
               <div className="md:w-1/3 flex justify-center">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
                    <span className="text-5xl md:text-7xl font-heading font-black text-gray-200">0{i}</span>
                 </div>
               </div>
               <div className="md:w-2/3">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">{t(`services.s${i}.title`)}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{t(`services.s${i}.text`)}</p>
                  <div className="flex gap-4 text-sm font-bold text-primary uppercase tracking-wider">
                     {t(`services.s${i}.tags`)}
                  </div>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-16 text-center">{t("services.prices.title")}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/10 p-10 rounded-3xl border border-white/20 hover:bg-white/15 transition-colors">
                 <h3 className="text-2xl font-bold font-heading mb-6 text-primary">{t(`services.prices.${i}.title`)}</h3>
                 <p className="text-white/80 leading-relaxed text-lg">{t(`services.prices.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gray-50 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-gray-900">{t("services.cta.text")}</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-gray-900 font-bold px-12 py-5 rounded-full hover:scale-105 transition-transform">
            {t("services.cta.btn")} <Zap size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};
