"use client";

import { useLanguage } from "./LanguageProvider";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export const ContactContent = () => {
  const { t, language } = useLanguage();

  return (
    <div className="w-full bg-slate-50 text-gray-800 pb-20">
      
      {/* Hero Mini */}
      <section className="pt-40 pb-20 bg-white text-center px-6 border-b border-gray-100">
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-secondary mb-6">{t("contact.hero.title")}</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">{t("contact.hero.subtitle")}</p>
      </section>

      <section className="py-20 container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Form UI */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("contact.form.name")}</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("contact.form.email")}</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("contact.form.phone")}</label>
                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("contact.form.type")}</label>
                <select className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${language === 'ar' ? 'bg-[left_1rem_center]' : ''}`}>
                  <option>{t("contact.form.type.opt1")}</option>
                  <option>{t("contact.form.type.opt2")}</option>
                  <option>{t("contact.form.type.opt3")}</option>
                  <option>{t("contact.form.type.opt4")}</option>
                  <option>{t("contact.form.type.opt5")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t("contact.form.msg")}</label>
                <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
              </div>
              <button className="bg-secondary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors mt-2">
                {t("contact.form.btn")} <Send size={18} />
              </button>
            </form>
          </div>

          {/* Info & WhatsApp */}
          <div className="flex flex-col gap-10">
            <div>
               <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900">{t("contact.info.title")}</h2>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary shrink-0"><Phone size={24} /></div>
                    <span className="text-lg font-bold">{t("contact.info.phone")}</span>
                 </div>
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary shrink-0"><Mail size={24} /></div>
                    <span className="text-lg font-bold">{t("contact.info.email")}</span>
                 </div>
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary shrink-0"><MapPin size={24} /></div>
                    <span className="text-lg font-bold leading-tight">{t("contact.info.address")}</span>
                 </div>
               </div>
               <div className="mt-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <p className="font-bold text-gray-800">{t("contact.info.hours")}</p>
               </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl mt-auto">
               <h3 className="text-xl font-bold font-heading mb-4 text-gray-900">{t("contact.wa.text")}</h3>
               <a href="https://wa.me/212602606041" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/30">
                 <MessageCircle size={24} />
                 {t("contact.wa.btn")}
               </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
