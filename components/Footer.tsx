"use client";

import { useLanguage } from "./LanguageProvider";
import Link from "next/link";

export const Footer = () => {
  const { language, t } = useLanguage();
  
  return (
    <footer data-navbar="light" className="bg-[#0a0f0d] text-white py-20 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <div>
            <h3 className="text-2xl font-heading font-bold tracking-wider mb-4">WADNOUN AD <span className="text-primary">SARL</span></h3>
            <p className="text-white/40 leading-relaxed max-w-sm">
              {language === "fr" 
                ? "Spécialiste en infrastructure électrique au Maroc — électrification, postes de transformation, éclairage public, distribution et économie d'énergie."
                : "متخصص في البنية التحتية الكهربائية بالمغرب — تكهرب، محطات تحويل، إنارة عمومية، توزيع واقتصاد طاقة."
              }
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-6">{t("nav.services")}</h4>
            <div className="flex flex-col gap-3">
              <Link href="/a-propos" className="text-white/40 hover:text-primary transition-colors">{t("nav.about")}</Link>
              <Link href="/services" className="text-white/40 hover:text-primary transition-colors">{t("nav.services")}</Link>
              <Link href="/contact" className="text-white/40 hover:text-primary transition-colors">{t("nav.contact")}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-6">Contact</h4>
            <div className="flex flex-col gap-3 text-white/40">
              <span>contact@wadnoun.ma</span>
              <span>+212 602 60 60 41</span>
              <span>Agadir, Maroc</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} WADNOUN AD SARL. {language === 'fr' ? "Tous droits réservés." : "جميع الحقوق محفوظة."}</p>
        </div>
      </div>
    </footer>
  );
};
