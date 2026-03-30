"use client";

import { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

export const SplineScene = ({ isArabic = false }: { isArabic?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineApp = useRef<Application | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const waitForCanvas = () => {
      const canvas = container.querySelector("canvas");
      if (!canvas) return;

      // ── WHEEL FIX (non-destructive) ────────────────────────────────────
      // We intercept at the container level with capture:true
      // This fires BEFORE the canvas listener, giving us first access
      let isForwarding = false;

      const onWheel = (e: WheelEvent) => {
        // Stop Spline from ever seeing this event on the canvas
        e.stopImmediatePropagation();

        if (isForwarding) return;
        isForwarding = true;

        // Re-dispatch as non-cancelable so Lenis/browser can process it
        const syntheticEvent = new WheelEvent("wheel", {
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaZ: e.deltaZ,
          deltaMode: e.deltaMode,
          ctrlKey: e.ctrlKey,
          bubbles: true,
          cancelable: false, // ← cannot be preventDefault'd by anyone
        });

        window.dispatchEvent(syntheticEvent);
        isForwarding = false;
      };

      // Attach to CONTAINER not canvas, with capture:true
      // This intercepts before Spline's internal listener on the canvas
      container.addEventListener("wheel", onWheel, {
        capture: true,
        passive: false, // needs to be false so stopImmediatePropagation works
      });

      // ── TOUCH FIX ─────────────────────────────────────────────────────
      let startX = 0, startY = 0;
      let intentDecided = false;
      let isScrollIntent = false;

      const onTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        intentDecided = false;
        isScrollIntent = false;
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!intentDecided) {
          const dx = Math.abs(e.touches[0].clientX - startX);
          const dy = Math.abs(e.touches[0].clientY - startY);
          if (dx > 8 || dy > 8) {
            isScrollIntent = dy > dx;
            intentDecided = true;
          }
        }
        if (isScrollIntent) {
          e.stopPropagation();
        }
      };

      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, {
        passive: true,
        capture: true,
      });

      return () => {
        container.removeEventListener("wheel", onWheel, { capture: true });
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchmove", onTouchMove, { capture: true });
      };
    };

    // Wait for Spline to inject its canvas into the DOM
    let cleanup: (() => void) | null = null;

    const mo = new MutationObserver(() => {
      const canvas = container.querySelector("canvas");
      if (canvas) {
        mo.disconnect();
        cleanup = (waitForCanvas() as any) ?? null;
      }
    });

    mo.observe(container, { childList: true, subtree: true });

    // Also try immediately in case canvas already exists
    cleanup = (waitForCanvas() as any) ?? null;

    return () => {
      mo.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 ${isArabic ? "-scale-x-100" : ""}`}>
      <Spline
        scene="/scene.splinecode"
        onLoad={(app) => {
          splineApp.current = app;
        }}
        className="w-full h-full object-cover scale-110 md:scale-105 bg-accent placeholder:bg-accent"
      />
    </div>
  );
};
