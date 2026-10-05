import { Link } from "@tanstack/react-router";
import { MessageSquareText, ClipboardList, Smile, Quote, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { waLink } from "@/lib/site";

const STEPS = [
  { icon: MessageSquareText, title: "Contanos qué necesitás", text: "Escribinos por WhatsApp o completá el formulario con los datos de tu grupo y el traslado." },
  { icon: ClipboardList, title: "Armamos la propuesta", text: "Te enviamos una propuesta pensada para tu institución, evento o viaje." },
  { icon: Smile, title: "Viajamos tranquilos", text: "Coordinamos cada detalle para que el día del viaje solo te ocupes de disfrutar." },
];

export function HowWeWork({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "bg-cream py-20" : "py-20 sm:py-28"}>
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Cómo trabajamos</h2>
          {!compact && <p className="mt-4 text-lg text-muted-foreground">Tres pasos simples para coordinar tu traslado.</p>}
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <li className="relative h-full rounded-3xl border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand">
                <span className="absolute right-6 top-5 font-display text-5xl font-bold text-brand/15">{i + 1}</span>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-brand">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg">{i + 1}. {s.title}</h3>
                {!compact && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Lo que dicen las familias</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 100}>
              {/* Reemplazá con testimonios reales */}
              <figure className="h-full rounded-3xl border-2 border-dashed border-brand/40 bg-card p-7">
                <Quote className="h-8 w-8 text-brand" />
                <blockquote className="mt-4 italic text-muted-foreground">[Testimonio real a completar]</blockquote>
                <figcaption className="mt-5 font-display text-sm font-semibold">[Nombre · Institución o familia]</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCta({ title, text, cta = "Contactanos" }: { title: string; text?: string; cta?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-site flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl">{title}</h2>
          {text && <p className="mt-2 opacity-95">{text}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contacto" className="btn bg-background text-foreground hover:shadow-lift">{cta}</Link>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-charcoal text-charcoal-foreground">
      <div className="container-site py-16 text-center sm:py-24">
        <h1 className="hero-in text-4xl sm:text-5xl">{title}</h1>
        <p className="hero-in mx-auto mt-4 max-w-2xl text-lg opacity-85" style={{ animationDelay: "120ms" }}>{subtitle}</p>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-brand" />
      </div>
    </section>
  );
}
