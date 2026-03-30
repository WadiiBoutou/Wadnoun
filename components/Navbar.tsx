"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const PISTACHIO = "var(--color-primary)";

const drawerSweepGradient =
  "linear-gradient(to right, rgb(var(--color-primary-rgb) / 0.8), rgb(var(--color-primary-rgb) / 0.592) 19%, rgb(var(--color-primary-rgb) / 0.43) 34%, rgb(var(--color-primary-rgb) / 0.306) 47%, rgb(var(--color-primary-rgb) / 0.157) 65%, rgb(var(--color-primary-rgb) / 0.06) 80%, rgb(var(--color-primary-rgb) / 0) 98%)";

const TRANSITION = "color 0.3s ease, filter 0.3s ease";

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => setLanguage(language === "fr" ? "ar" : "fr");
  const closeDrawer = () => setIsDrawerOpen(false);

  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(80);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light");

  const isDark = navTheme === "dark";
  const elemColor = isDark ? "var(--color-accent-contrast)" : "rgb(var(--color-white-rgb))";

  useEffect(() => {
    const measure = () => {
      const el = navRef.current;
      if (!el) return;
      const h = el.offsetHeight || 80;
      setNavHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-navbar]");
    if (!sections.length) return;

    const NAV_TOP_OFFSET = 16;
    const NAV_HEIGHT = navHeight || 80;
    const SCAN_LINE = NAV_TOP_OFFSET + NAV_HEIGHT / 2;

    const intersectingMap = new Map<HTMLElement, "light" | "dark">();

    const evaluateTheme = () => {
      let activeTheme: "light" | "dark" = "light";

      for (const [el, theme] of intersectingMap) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= SCAN_LINE && rect.bottom >= SCAN_LINE) {
          activeTheme = theme;
          break;
        }
      }

      setNavTheme((prev) => (prev === activeTheme ? prev : activeTheme));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            intersectingMap.set(el, (el.dataset.navbar as "light" | "dark") ?? "light");
          } else {
            intersectingMap.delete(el);
          }
        });
        evaluateTheme();
      },
      {
        rootMargin: `0px 0px -${window.innerHeight - SCAN_LINE * 2}px 0px`,
        threshold: [0, 0.1],
      }
    );

    sections.forEach((s) => observer.observe(s));

    const handleScroll = () => evaluateTheme();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lenis-scroll", handleScroll, { passive: true });
    evaluateTheme();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lenis-scroll", handleScroll);
    };
  }, [navHeight, pathname]);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    const isArabic = language === "ar";
    const drawerStartX = isArabic ? "-100%" : "100%";
    const navItemStartX = isArabic ? -40 : 40;

    if (isDrawerOpen) {
      gsap.set(overlayRef.current, { display: "block", opacity: 0 });
      gsap.set(drawerRef.current, { x: drawerStartX, opacity: 0, scale: 0.97 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(drawerRef.current, { x: "0%", opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(
        ".nav-item",
        { x: navItemStartX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.09, ease: "power3.out", delay: 0.28 }
      );
    } else {
      gsap.to(drawerRef.current, { x: drawerStartX, opacity: 0, scale: 0.97, duration: 0.45, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }).then(() => {
        gsap.set(overlayRef.current, { display: "none" });
      });
    }
  }, [isDrawerOpen, language]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="contents">
      <nav ref={navRef} className="fixed left-0 right-0 top-4 z-50 h-20 flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <div className="pointer-events-auto" style={{ color: elemColor, transition: TRANSITION }}>
          <button
            type="button"
            onClick={toggleLang}
            className="text-[11px] hover:opacity-70 transition-opacity tracking-widest font-bold"
            style={{ filter: isDark ? "drop-shadow(0 0 8px rgb(var(--color-black-rgb) / 0.18))" : "drop-shadow(0 0 8px rgb(var(--color-white-rgb) / 0.3))" }}
            aria-label={language === "fr" ? "Switch to Arabic" : "Passer en français"}
          >
            <span className={language === "fr" ? "opacity-100" : "opacity-40"}>FR</span>
            <span className="mx-2 opacity-30">|</span>
            <span className={language === "ar" ? "opacity-100" : "opacity-40"}>AR</span>
          </button>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <Link href="/" className="block w-[120px] h-[90px] transition-transform hover:scale-105">
            <Image
              src="/LOGO-1.png"
              alt="WadNoun SARL"
              width={120}
              height={90}
              className="w-full h-full object-contain"
              style={{ transition: TRANSITION, filter: "none" }}
            />
          </Link>
        </div>

        <div className="pointer-events-auto" style={{ color: elemColor, transition: TRANSITION }}>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="hover:opacity-70 transition-opacity"
            style={{ filter: isDark ? "drop-shadow(0 0 8px rgb(var(--color-black-rgb) / 0.18))" : "drop-shadow(0 0 8px rgb(var(--color-white-rgb) / 0.3))" }}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        className="fixed inset-0 bg-black/55 z-[69] cursor-pointer"
        style={{ display: "none" }}
        onClick={closeDrawer}
        onKeyDown={(e) => e.key === "Escape" && closeDrawer()}
      >
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%",
            height: "100%",
            opacity: 0.64,
            background: drawerSweepGradient,
            animation: "drawer-gradient-sweep 5s linear infinite",
            transform: language === "ar" ? "scaleX(-1)" : "none",
          }}
        />
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            width: "100%",
            height: "100%",
            opacity: 0.64,
            background: drawerSweepGradient,
            animation: "drawer-gradient-sweep 5s linear infinite",
            transform: language === "ar" ? "scaleX(-1)" : "none",
            animationDelay: "2.5s",
          }}
        />
      </div>

      <div
        ref={drawerRef}
        className="fixed z-[80] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{
          top: "1.5rem",
          left: language === "ar" ? "1.5rem" : "auto",
          right: language === "ar" ? "auto" : "1.5rem",
          bottom: "1.5rem",
          width: "min(400px, calc(100vw - 3rem))",
          backgroundColor: PISTACHIO,
          transform: language === "ar" ? "translateX(-110%)" : "translateX(110%)",
          opacity: 0,
        }}
      >
        <nav
          dir={language === "ar" ? "rtl" : "ltr"}
          className={`relative flex flex-col justify-center flex-grow px-10 pt-6 z-10 ${language === "ar" ? "text-right" : "text-left"}`}
        >
          {navLinks.map((link, i) => (
            (() => {
              const isActive = isActiveLink(link.href);
              return (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeDrawer}
              className={`nav-item flex items-center justify-between group font-heading font-semibold text-4xl py-5 opacity-0 transition-all duration-300 hover:pl-3 ${
                isActive ? "text-white" : "text-accent-contrast"
              } ${
                i < navLinks.length - 1 ? "border-b border-black/15" : ""
              }`}
            >
              {link.label}
              <span
                className={`text-xs font-sans font-normal tracking-widest transition-colors ${
                  isActive
                    ? "text-white/70 group-hover:text-white"
                    : "text-black/30 group-hover:text-black/60"
                }`}
              >
                0{i + 1}
              </span>
            </Link>
              );
            })()
          ))}
        </nav>

        <div className="relative z-10 px-10 pb-7 flex items-center justify-between">
          <span className="text-[11px] font-bold text-black/30 tracking-widest uppercase">WadNoun SARL</span>
          <span className="text-[11px] text-black/30">© {new Date().getFullYear()}</span>
        </div>
      </div>

      <button
        onClick={closeDrawer}
        aria-label="Close menu"
        className="fixed z-[81] flex items-center justify-center rounded-sm shadow-lg hover:scale-110 transition-transform"
        style={{
          backgroundColor: PISTACHIO,
          top: "50%",
          left: language === "ar" ? `calc(min(400px, calc(100vw - 3rem)) + 1.5rem + 10px)` : "auto",
          right: language === "ar" ? "auto" : `calc(min(400px, calc(100vw - 3rem)) + 1.5rem + 10px)`,
          transform: "translateY(-50%)",
          width: "34px",
          height: "34px",
          visibility: isDrawerOpen ? "visible" : "hidden",
          pointerEvents: isDrawerOpen ? "auto" : "none",
          opacity: isDrawerOpen ? 1 : 0,
        }}
      >
        <X className="w-4 h-4 text-accent-contrast" strokeWidth={2.5} />
      </button>
    </div>
  );
};

