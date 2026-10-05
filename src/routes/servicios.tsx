import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/site/Reveal";
import { HowWeWork, ClosingCta, PageHero } from "@/components/site/Sections";

const t = "Servicios – Kaitibus Micros Escolares";
const d = "Transporte escolar, campamentos, excursiones, eventos y viajes especiales en Buenos Aires.";
export const Route = createFileRoute("/servicios")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] }),
  component: ServiciosPage,
});

const FAQ = [
  { q: "¿Qué servicios ofrecen?", a: "Transporte escolar diario, campamentos y excursiones, traslados para eventos y cumpleaños, y viajes especiales a medida para grupos." },
  { q: "¿Cómo pido un presupuesto?", a: "Completá el formulario de Contacto o escribinos por WhatsApp contándonos qué necesitás. Te respondemos a la brevedad con una propuesta." },
  { q: "¿Para qué tipo de grupos trabajan?", a: "Trabajamos con colegios, institutos, clubes, municipios, familias y organizadores de eventos, para grupos grandes o chicos." },
  { q: "¿Cómo coordinamos un traslado?", a: "Una vez que aceptás la propuesta, coordinamos juntos horarios, recorrido y todos los detalles del viaje." },
  { q: "¿Pueden armar un viaje a medida?", a: "Sí. Contanos destino, cantidad de personas y fechas, y armamos la propuesta ideal para tu grupo." },
];

function ServiciosPage() {
  return (
    <>
      <PageHero title="Nuestros servicios" subtitle="Traslados seguros y puntuales, pensados para cada institución, familia y ocasión." />
      <section className="py-20 sm:py-28">
        <div className="container-site space-y-20 sm:space-y-28">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <img src={s.image} alt={s.alt} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
              </Reveal>
              <Reveal delay={100}>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-brand">
                  <s.icon className="h-7 w-7" />
                </div>
                <h2 className="mt-5 text-3xl sm:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.long}</p>
                <Link to="/contacto" search={{ servicio: s.title }} className="btn btn-primary mt-8">Pedir presupuesto</Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <HowWeWork compact={false} />
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-site max-w-3xl">
          <Reveal className="text-center"><h2 className="text-3xl sm:text-4xl">Preguntas frecuentes</h2></Reveal>
          <div className="mt-10 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border bg-card shadow-soft open:border-brand">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-semibold">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-5 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta title="¿Necesitás coordinar un traslado?" text="Contanos qué necesitás y armamos la propuesta ideal para tu grupo." />
    </>
  );
}
