import { Check } from "lucide-react";
import { INSTITUTIONS } from "@/lib/site";

export function InstitutionsMarquee() {
  const items = [...INSTITUTIONS, ...INSTITUTIONS];
  return (
    <div className="marquee relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <ul className="marquee-track flex gap-4">
        {items.map((name, i) => (
          <li
            key={i}
            aria-hidden={i >= INSTITUTIONS.length}
            className="flex shrink-0 items-center gap-2 rounded-full border bg-card px-5 py-3 font-display text-sm font-medium shadow-soft"
          >
            <Check className="h-4 w-4 text-brand" /> {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
