import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen (or above it, e.g. after a fast scroll / anchor jump): show immediately.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e && (e.isIntersecting || e.boundingClientRect.top < 0)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${Math.min(delay, 240)}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  );
}
