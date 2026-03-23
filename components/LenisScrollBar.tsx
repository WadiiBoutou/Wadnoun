"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { onScrollProgress, scrollTo } from "./lenis-bus";

const W = 14;   // --scrollbar-width
const P = 3;    // --scrollbar-padding
const THUMB_W = W - P * 2; // 8px
const PISTACHIO = "#c8e63a";

export const LenisScrollBar = () => {
  const [thumbH, setThumbH] = useState(60);
  const [gutterVisible, setGutterVisible] = useState(false);

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartProgress = useRef(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const viewHRef = useRef(0);
  const trackLenRef = useRef(0);

  // ── Sync Sizes ───────────────────────────────────────────────────────────
  useEffect(() => {
    const recalc = () => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight || 1;
      const nextThumbH = Math.min(200, Math.max(30, vh * (vh / docH)));
      
      viewHRef.current = vh;
      setThumbH(nextThumbH);
      trackLenRef.current = Math.max(0, vh - nextThumbH);
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  // ── Sync Animation Loop (Perfect Sync) ───────────────────────────────────
  useEffect(() => {
    let raf = 0;

    const loop = () => {
      if (!isDragging.current && thumbRef.current) {
        // Sync progress from window.scrollY for DOM-perfect alignment with Lenis
        const docH = document.documentElement.scrollHeight || 1;
        const maxScroll = docH - viewHRef.current;
        const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        
        progressRef.current = ratio;
        
        const top = ratio * trackLenRef.current;
        thumbRef.current.style.transform = `translate3d(0, ${top}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Gutter Click (Jump) ──────────────────────────────────────────────────
  const onGutterClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging.current) return;
      
      const vh = viewHRef.current;
      const trackLen = trackLenRef.current;
      if (trackLen <= 0) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const newProgress = Math.max(0, Math.min(1, (clickY - thumbH / 2) / trackLen));
      const maxScroll = document.documentElement.scrollHeight - vh;
      
      scrollTo(newProgress * maxScroll);
    },
    [thumbH]
  );

  // ── Thumb Drag ────────────────────────────────────────────────────────────
  const onThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartProgress.current = progressRef.current;

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current || !thumbRef.current) return;
        const trackLen = trackLenRef.current;
        if (trackLen <= 0) return;

        const delta = ev.clientY - dragStartY.current;
        const newP = Math.max(0, Math.min(1, dragStartProgress.current + delta / trackLen));
        const maxScroll = document.documentElement.scrollHeight - viewHRef.current;
        
        // Update visual thumb immediately during drag
        const top = newP * trackLen;
        thumbRef.current.style.transform = `translate3d(0, ${top}px, 0)`;
        
        // Scroll the page immediately (immediate: true)
        scrollTo(newP * maxScroll, true);
      };

      const onUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setGutterVisible(false);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    []
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: W,
        height: "100lvh",
        zIndex: 999999,
        pointerEvents: "auto",
      }}
      onMouseEnter={() => setGutterVisible(true)}
      onMouseLeave={() => { if (!isDragging.current) setGutterVisible(false); }}
    >
      {/* Track */}
      <div
        onClick={onGutterClick}
        style={{
          position: "absolute",
          inset: 0,
          background: "#fffc",
          borderLeft: "1px solid #d9d9d9",
          opacity: gutterVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          cursor: "default",
        }}
      />

      {/* Thumb */}
      <div
        ref={thumbRef}
        onMouseDown={onThumbMouseDown}
        style={{
          position: "absolute",
          left: 0,
          width: W,
          height: thumbH,
          cursor: "ns-resize",
          zIndex: 2,
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: P,
            width: THUMB_W,
            top: 0,
            bottom: 0,
            background: "#1a1a1a",
            borderRadius: 999,
            boxShadow: `inset 0 0 0 1px ${PISTACHIO}`,
          }}
        />
      </div>
    </div>
  );
};
