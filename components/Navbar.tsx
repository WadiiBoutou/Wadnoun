"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLanguage(language === "fr" ? "ar" : "fr");
  
  // Fix text color constraints: If not on homepage, always use dark text unless scrolled overriding
  const isDarkCondition = scrolled || pathname !== "/";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-white/10 py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4">
          <img src="/LOGO-1.png" alt="WadNoun SARL" className="h-10 md:h-12 w-auto object-contain drop-shadow-sm" />
          <span className={`font-heading font-bold text-lg md:text-xl tracking-wider ${isDarkCondition ? "text-secondary" : "text-white"}`}>
            WADNOUN AD <span className="text-primary">SARL</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`font-bold hover:text-primary transition-colors ${isDarkCondition ? "text-gray-800" : "text-white"}`}>{t("nav.home")}</Link>
          <Link href="/a-propos" className={`font-bold hover:text-primary transition-colors ${isDarkCondition ? "text-gray-800" : "text-white"}`}>{t("nav.about")}</Link>
          <Link href="/services" className={`font-bold hover:text-primary transition-colors ${isDarkCondition ? "text-gray-800" : "text-white"}`}>{t("nav.services")}</Link>
          <Link href="/contact" className={`font-bold hover:text-primary transition-colors ${isDarkCondition ? "text-gray-800" : "text-white"}`}>{t("nav.contact")}</Link>
          
          <button onClick={toggleLang} className={`flex items-center gap-2 font-bold hover:text-primary transition-colors ${isDarkCondition ? "text-gray-800" : "text-white"}`}>
            <Globe size={20} />
            {language === "fr" ? "عربي" : "Français"}
          </button>
        </div>

        {/* Mobile */}
        <button className={`md:hidden ${isDarkCondition ? 'text-gray-800' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-6 px-6 flex flex-col gap-4 text-center border-t border-gray-100">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-800 font-bold text-lg py-2">{t("nav.home")}</Link>
          <Link href="/a-propos" onClick={() => setIsOpen(false)} className="text-gray-800 font-bold text-lg py-2">{t("nav.about")}</Link>
          <Link href="/services" onClick={() => setIsOpen(false)} className="text-gray-800 font-bold text-lg py-2">{t("nav.services")}</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-gray-800 font-bold text-lg py-2">{t("nav.contact")}</Link>
          <button onClick={() => { toggleLang(); setIsOpen(false); }} className="text-primary font-bold text-lg py-2">
            {language === "fr" ? "Changer en Arabe" : "تغيير إلى الفرنسية"}
          </button>
        </div>
      )}
    </nav>
  );
};
