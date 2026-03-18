"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";

export const PageLoader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // When pathname changes, intercept screen immediately to cover page reflows/video loading
    setIsLoading(true);
    
    // Hold it for exactly 1 second to ensure heavy assets process securely, then elegantly fade out
    const timeoutId = setTimeout(() => {
      const el = document.getElementById("global-page-loader");
      if (el) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => setIsLoading(false)
        });
      } else {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div id="global-page-loader" className="fixed inset-0 z-[999999] bg-slate-50 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
         <div className="w-20 h-20 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
         <div className="absolute w-12 h-12 border-4 border-gray-200 border-b-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="mt-8 text-secondary font-heading font-bold tracking-[0.3em] uppercase animate-pulse">
        WadNoun SARL
      </p>
    </div>
  );
};
