"use client";

import { useLanguage } from "./LanguageProvider";
import { Sun, Wind, Activity, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export const HomeContent = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white text-gray-800">
      
      {/* Notre Mission */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary mb-8">{t("home.mission.title")}</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              {t("home.mission.text")}
            </p>
          </div>
        </div>
      </section>

      {/* Nos Domaines */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-gray-900 mb-16">{t("home.domains.title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Sun className="text-primary w-12 h-12 mb-6" />
            <h3 className="text-xl font-bold mb-4 font-heading">{t("home.domains.1.title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("home.domains.1.text")}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Wind className="text-primary w-12 h-12 mb-6" />
            <h3 className="text-xl font-bold mb-4 font-heading">{t("home.domains.2.title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("home.domains.2.text")}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Activity className="text-primary w-12 h-12 mb-6" />
            <h3 className="text-xl font-bold mb-4 font-heading">{t("home.domains.3.title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("home.domains.3.text")}</p>
          </div>
        </div>
      </section>

      {/* Pourquoi WadNoun */}
      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-16">{t("home.why.title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex flex-col">
                <h3 className="text-xl font-bold mb-4 font-heading text-primary">{t(`home.why.${i}.title`)}</h3>
                <p className="text-white/80 leading-relaxed">{t(`home.why.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-gray-900 mb-16">{t("home.process.title")}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <CheckCircle className="text-primary shrink-0 w-8 h-8" />
                <span className="text-lg font-bold text-gray-800">{t(`home.process.${i}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center text-gray-900 mb-16">{t("home.tests.title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-colors">
              <p className="italic text-gray-700 mb-6 leading-relaxed flex-grow">"{t(`home.tests.${i}.text`)}"</p>
              <div className="font-bold text-sm text-secondary">{t(`home.tests.${i}.author`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-gray-900 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">{t("home.cta.title")}</h2>
          <p className="text-xl mb-10 font-medium">{t("home.cta.text")}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-10 py-5 rounded-full hover:bg-gray-800 transition-transform hover:scale-105">
            {t("home.cta.btn")} <ChevronRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};
