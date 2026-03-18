"use client";

import { useLanguage } from "./LanguageProvider";

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-secondary text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-start">
        <div>
          <h3 className="text-2xl font-bold tracking-wider mb-2">WADNOUN AD <span className="text-primary">SARL</span></h3>
          <p className="text-white/70 max-w-sm leading-relaxed">
            Travaux d'Électrification, Postes de Transformation, Éclairage Public, Distribution Et Controle Électrique, Économie d'Énergie
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-end">
          <p className="text-white/90">Copyright © {new Date().getFullYear()} WADNOUN AD SARL.</p>
          <p className="text-white/60 text-sm">{language === 'fr' ? "Tous droits réservés." : "جميع الحقوق محفوظة."}</p>
        </div>
      </div>
    </footer>
  );
};
