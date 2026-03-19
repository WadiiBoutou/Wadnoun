"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { onScrollProgress, scrollTo } from "./lenis-bus";

const W = 14;   // --scrollbar-width
const P = 3;    // --scrollbar-padding
const THUMB_W = W - P * 2; // 8px

export const LenisScrollBar = () => {
  const [progress, setProgress] = useState(0);
  const [thumbH, setThumbH] = useState(60);
  const [viewH, setViewH] = useState(0);
  const [gutterVisible, setGutterVisible] = useState(false);

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartProgress = useRef(0);

  // Refs to avoid stale closures in rAF sync loop
  const progressRef = useRef(progress);
  const thumbHRef = useRef(thumbH);
  const viewHRef = useRef(viewH);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  useEffect(() => {
    thumbHRef.current = thumbH;
  }, [thumbH]);
  useEffect(() => {
    viewHRef.current = viewH;
  }, [viewH]);

  // ── Sizes ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const recalc = () => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight || 1;
      const nextThumbH = Math.min(200, Math.max(30, vh * (vh / docH)));
      setViewH(vh);
      setThumbH(nextThumbH);
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("resize", recalc);
    };
  }, []);

  // ── Progress from Lenis ───────────────────────────────────────────────────
  useEffect(() => {
    return onScrollProgress((scroll, limit) => {
      // Prefer Lenis values when available, but keep DOM fallback below as safety.
      const ratio = limit > 0 ? scroll / limit : 0;
      setProgress(ratio);
    });
  }, []);

  // DOM fallback sync (most reliable with ScrollTrigger pinned sections)
  useEffect(() => {
    let raf = 0;
    const EPS = 0.0006; // avoid setState each frame

    const loop = () => {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight || 1;
      const maxScroll = docH - vh;
      const nextRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      // Keep thumb height accurate as content loads (images/videos, pinned sections)
      const nextThumbH = Math.min(200, Math.max(30, vh * (vh / docH)));

      if (Math.abs(vh - viewHRef.current) > 1) setViewH(vh);
      if (Math.abs(nextThumbH - thumbHRef.current) > 1) setThumbH(nextThumbH);
      if (Math.abs(nextRatio - progressRef.current) > EPS) setProgress(nextRatio);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Computed thumb top ────────────────────────────────────────────────────
  const trackLen = Math.max(0, viewH - thumbH);
  const thumbTop = progress * trackLen;

  // ── Gutter hover ──────────────────────────────────────────────────────────
  const showGutter = useCallback(() => setGutterVisible(true), []);
  const hideGutter = useCallback(() => {
    if (!isDragging.current) setGutterVisible(false);
  }, []);

  // ── Gutter click — jump to position ──────────────────────────────────────
  const onGutterClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Ignore if a drag just finished
      if (isDragging.current) return;
      if (trackLen <= 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const newProgress = Math.max(0, Math.min(1, (clickY - thumbH / 2) / trackLen));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTo(newProgress * maxScroll);
    },
    [thumbH, trackLen]
  );

  // ── Thumb drag ────────────────────────────────────────────────────────────
  const onThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartProgress.current = progress;

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
        if (trackLen <= 0) return;
        const delta = ev.clientY - dragStartY.current;
        const newP = Math.max(0, Math.min(1, dragStartProgress.current + delta / trackLen));
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollTo(newP * maxScroll, true); // immediate — no smoothing during drag
      };

      const onUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        // Hide gutter if mouse is no longer over the scrollbar
        setGutterVisible(false);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [progress, trackLen]
  );

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: W,
        height: "100lvh",
        // Must stay above pinned/stacked sections so hover works everywhere.
        zIndex: 999999,
        // This element is small (14px wide). We allow pointer events here so
        // hover/click/drag reliably targets gutter + thumb.
        pointerEvents: "auto",
      }}
      onMouseEnter={showGutter}
      onMouseLeave={hideGutter}
    >
      {/*
        Gutter / Track
        ─ covers the full 14px strip
        ─ opacity 0 by default, 1 on hover (isGutterRollOver behaviour)
        ─ white semi-transparent background (#fffc) with left border
        ─ pointer-events: auto so it receives hover + click events
      */}
      <div
        onClick={onGutterClick}
        style={{
          position: "absolute",
          inset: 0,
          background: "#fffc",
          borderLeft: "1px solid #d9d9d9",
          opacity: gutterVisible ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "auto",
          cursor: "default",
          boxSizing: "border-box",
        }}
      />

      {/* Thumb hitbox (14px wide) for reliable dragging */}
      <div
        onMouseDown={onThumbMouseDown}
        style={{
          position: "absolute",
          left: 0,
          width: W,
          top: thumbTop,
          height: thumbH,
          pointerEvents: "auto",
          cursor: "ns-resize",
          zIndex: 2,
          userSelect: "none",
          transition: isDragging.current ? "none" : "top 0.08s linear",
          background: "transparent",
        }}
      >
        {/* Visible thumb (8px wide) */}
        <div
          style={{
            position: "absolute",
            left: P,
            width: THUMB_W,
            top: 0,
            height: "100%",
            background: "#1a1a1a",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
};
