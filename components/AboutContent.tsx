"use client";

import { useLanguage } from "./LanguageProvider";
import { Check, Target, Compass, Zap, ShieldCheck } from "lucide-react";

export const AboutContent = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white text-gray-800 pb-20">
      
      {/* Hero Mini */}
      <section className="pt-40 pb-20 bg-gray-50 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-secondary mb-6">{t("about.hero.title")}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("about.hero.subtitle")}</p>
      </section>

      {/* History */}
      <section className="py-20 container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">{t("about.history.title")}</h2>
        <p className="text-lg text-gray-600 leading-relaxed font-medium">{t("about.history.text")}</p>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center">{t("about.values.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-start">
                  <div className="bg-primary/20 p-4 rounded-xl mb-6">
                     <Check className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 text-primary">{t(`about.values.${i}.title`)}</h3>
                  <p className="text-white/80 leading-relaxed">{t(`about.values.${i}.text`)}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Team & Certifications */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">{t("about.team.title")}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t("about.team.text")}</p>
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">{t("about.cert.title")}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t("about.cert.text")}</p>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-center text-gray-900 mb-16">{t("about.numbers.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                 <div className="text-4xl font-heading font-black text-secondary mb-2">{t(`about.numbers.v${i}`)}</div>
                 <div className="text-sm font-bold text-gray-500 uppercase">{t(`about.numbers.l${i}`)}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 container mx-auto px-6 text-center max-w-4xl">
        <Target className="w-16 h-16 text-primary mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-8">{t("about.vision.title")}</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-medium">{t("about.vision.text")}</p>
      </section>

    </div>
  );
};
