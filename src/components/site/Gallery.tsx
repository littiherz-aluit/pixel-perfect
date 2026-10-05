import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const go = useCallback(
    (d: number) => setIdx((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx, go]);

  const current = idx === null ? null : images[idx];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`group overflow-hidden rounded-2xl shadow-soft ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            aria-label={`Ampliar: ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
        <div className="grid aspect-[4/3] place-items-center rounded-2xl border-2 border-dashed border-brand/40 p-4 text-center text-sm text-muted-foreground">
          [Espacio para sumar más fotos]
        </div>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4"
          onClick={() => setIdx(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            const end = e.changedTouches[0]?.clientX;
            if (touchX.current !== null && end !== undefined && Math.abs(end - touchX.current) > 50) go(end < touchX.current ? 1 : -1);
            touchX.current = null;
          }}
        >
          <img src={current.src} alt={current.alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setIdx(null)} aria-label="Cerrar" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-background text-foreground">
            <X />
          </button>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Foto anterior" className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-background text-foreground">
            <ChevronLeft />
          </button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Foto siguiente" className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-background text-foreground">
            <ChevronRight />
          </button>
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-charcoal-foreground">{(idx ?? 0) + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
