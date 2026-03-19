/**
 * Tiny event bus that bridges Lenis (in SmoothScroll) with LenisScrollBar
 * without creating circular imports or prop-drilling.
 */

type ScrollHandler = (scroll: number, limit: number) => void;
type ScrollToFn = (target: number, immediate?: boolean) => void;

const scrollHandlers = new Set<ScrollHandler>();

// Populated by SmoothScroll once Lenis is initialised
let _scrollTo: ScrollToFn = (target) =>
  window.scrollTo({ top: target, behavior: "smooth" });

/** Called by SmoothScroll on every Lenis scroll tick */
export function emitScrollProgress(scroll: number, limit: number) {
  scrollHandlers.forEach((fn) => fn(scroll, limit));
}

/** Called by SmoothScroll to register lenis.scrollTo */
export function registerScrollTo(fn: ScrollToFn) {
  _scrollTo = fn;
}

/** Subscribe to scroll progress (0 → 1). Returns unsubscribe fn. */
export function onScrollProgress(fn: ScrollHandler): () => void {
  scrollHandlers.add(fn);
  return () => scrollHandlers.delete(fn);
}

/** Programmatically scroll to an absolute pixel offset */
export function scrollTo(target: number, immediate = false) {
  _scrollTo(target, immediate);
}
