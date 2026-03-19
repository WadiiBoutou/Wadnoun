"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";

function getPageLabel(pathname: string) {
  if (pathname === "/") return "Accueil";
  if (pathname.startsWith("/services")) return "Services";
  if (pathname.startsWith("/a-propos")) return "À Propos";
  if (pathname.startsWith("/contact")) return "Contact";
  return "WadNoun SARL";
}

export const PageLoader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const label = useMemo(() => getPageLabel(pathname || "/"), [pathname]);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      const el = document.getElementById("global-page-loader");
      if (el) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => setIsLoading(false),
        });
      } else {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    if (!isLoading) return;
    const tl = gsap.fromTo(
      "#loader-page-label",
      { scale: 0.88, opacity: 0.2, filter: "blur(6px)" },
      {
        scale: 1.06,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
      }
    );
    return () => {
      tl.kill();
    };
  }, [isLoading, label]);

  if (!isLoading) return null;

  return (
    <div
      id="global-page-loader"
      className="fixed inset-0 z-[999999] flex items-center justify-center"
      style={{
        backgroundImage: "url(/loading.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative flex flex-col items-center justify-center px-6 text-center">
        <p
          id="loader-page-label"
          className="font-heading font-extrabold uppercase tracking-[0.4em] text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 3rem)",
          }}
        >
          {label}
        </p>
        <p className="mt-4 text-xs md:text-sm tracking-[0.35em] uppercase text-black/70">
          Chargement...
        </p>
      </div>
    </div>
  );
};
