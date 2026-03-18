"use client";

import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

export const HoverEffect = ({
  items,
  className,
  t
}: {
  items: { key: string; icon: LucideIcon }[];
  className?: string;
  t: (key: string) => string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10", className)}>
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={item?.key}
            className="service-card relative group block p-2 h-full w-full opacity-0 translate-y-8"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-primary/10 rounded-3xl block z-0"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm group-hover:shadow-md transition-shadow h-full flex flex-col items-start overflow-hidden">
              {/* Decorative Corner Shape */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-secondary/5 text-secondary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-6 shadow-sm">
                <Icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t(`service.${item.key}`)}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t(`service.${item.key}.desc`)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
