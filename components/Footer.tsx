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
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-6">{t("footer.services")}</h4>
            <div className="flex flex-col gap-3">
              <Link href="/a-propos" className="text-white/40 hover:text-primary transition-colors">{t("nav.about")}</Link>
              <Link href="/services" className="text-white/40 hover:text-primary transition-colors">{t("nav.services")}</Link>
              <Link href="/contact" className="text-white/40 hover:text-primary transition-colors">{t("nav.contact")}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-6">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3 text-white/40">
              <span>{t("footer.email")}</span>
              <span
                className={language === "ar" ? "block w-full text-right" : "block"}
                style={{ direction: "ltr", unicodeBidi: "embed" }}
              >
                {t("footer.phone")}
              </span>
              <span>{t("footer.address")}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} WADNOUN AD SARL. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
