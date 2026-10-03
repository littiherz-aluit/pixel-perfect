import { createFileRoute, Link } from "@tanstack/react-router";
import { Bus, Tent, PartyPopper, MapPinned, ArrowRight, MessageCircle } from "lucide-react";
import heroLogo from "@/assets/hero-logo.png.asset.json";
import flota from "@/assets/flota.jpeg.asset.json";
import microAntiguo from "@/assets/micro-antiguo.jpeg.asset.json";
import microActual from "@/assets/micro-actual.jpeg.asset.json";
import { Reveal, Counter } from "@/components/site/Reveal";
import { InstitutionsMarquee } from "@/components/site/Institutions";
import { waLink } from "@/lib/site";

const TITLE = "Kaitibus – Micros Escolares | Tres generaciones en la ruta";
const DESC =
  "Transporte escolar, campamentos, excursiones, eventos y viajes recreativos en Buenos Aires. Una empresa familiar con más de 30 años de trayectoria.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

const SERVICES = [
  { icon: Bus, title: "Transporte escolar", text: "Traslados diarios para instituciones educativas con puntualidad y seguridad." },
  { icon: Tent, title: "Campamentos y excursiones", text: "Acompañamos salidas educativas y campamentos con atención personalizada." },
  { icon: PartyPopper, title: "Eventos y cumpleaños", text: "Traslados para celebraciones y eventos especiales, para grupos grandes o chicos." },
  { icon: MapPinned, title: "Viajes especiales", text: "Viajes recreativos de corta distancia, con la experiencia de más de tres décadas." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden">
        <img src={flota.url} alt="Flota de micros escolares Kaitibus rojos y blancos estacionados" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-site relative py-20 text-center text-primary-foreground">
          <h1 className="sr-only">Kaitibus – Micros Escolares</h1>
          <img
            src={heroLogo.url}
            alt="Kaitibus"
            className="hero-in mx-auto w-[78%] max-w-[520px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
          />
          <p className="hero-in text-shadow-soft mx-auto mt-8 max-w-2xl text-lg font-medium sm:text-xl md:text-2xl" style={{ animationDelay: "150ms" }}>
            Transporte escolar y viajes recreativos con la confianza de una familia, desde hace más de 30 años.
          </p>
          <div className="hero-in mt-10 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: "300ms" }}>
            <Link to="/contacto" className="btn btn-primary">Solicitar información</Link>
            <Link to="/servicios" className="btn btn-outline-light">Ver servicios</Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-foreground/70 pt-2">
            <span className="scroll-dot h-2 w-1 rounded-full bg-primary-foreground" />
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="bg-charcoal text-charcoal-foreground">
        <div className="container-site grid gap-8 py-12 text-center sm:grid-cols-3">
          {[
            { big: <Counter to={30} prefix="+" />, label: "años", text: "de trayectoria acompañando familias e instituciones" },
            { big: <Counter to={3} />, label: "generaciones", text: "de una misma familia al frente del servicio" },
            { big: <>Seguro</>, label: "y puntual", text: "atención personalizada en cada viaje" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <p className="font-display text-4xl font-bold text-brand sm:text-5xl">
                {s.big} <span className="text-2xl text-charcoal-foreground sm:text-3xl">{s.label}</span>
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm opacity-80">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* QUÉ HACEMOS */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">Qué hacemos</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ofrecemos servicios de traslado seguros y puntuales, adaptados a cada institución y cada familia.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <article className="group h-full rounded-3xl border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-brand hover:shadow-lift">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-primary-foreground">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/servicios" className="btn btn-primary">
              Conocé todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-brand">Tres generaciones en la ruta</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Una historia de familia</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Con más de 30 años de trayectoria, nos consolidamos gracias al compromiso, la responsabilidad y la confianza de quienes nos eligen. Fundada por nuestros abuelos, hoy la continúan sus hijos y nietos, manteniendo los mismos valores que le dieron origen.
            </p>
            <Link to="/nosotros" className="btn btn-outline mt-8">Conocé nuestra historia</Link>
          </Reveal>
          <Reveal delay={150} className="relative pb-10 sm:pb-16">
            <img src={microAntiguo.url} alt="Micro escolar Mercedes-Benz antiguo de la familia, en un campo" loading="lazy" className="aspect-[4/3] w-[88%] rounded-3xl object-cover shadow-soft" />
            <img src={microActual.url} alt="Micro escolar actual de Kaitibus" loading="lazy" className="absolute bottom-0 right-0 aspect-[4/3] w-[52%] rounded-3xl border-4 border-cream object-cover shadow-lift" />
          </Reveal>
        </div>
      </section>

      {/* INSTITUCIONES */}
      <section className="py-20">
        <div className="container-site">
          <Reveal className="text-center">
            <h2 className="text-3xl sm:text-4xl">Instituciones que confían en nosotros</h2>
          </Reveal>
        </div>
        <div className="mt-10"><InstitutionsMarquee /></div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-site flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="text-2xl sm:text-3xl">¿Necesitás coordinar un traslado?</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contacto" className="btn bg-background text-foreground hover:shadow-lift">Contactanos</Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
