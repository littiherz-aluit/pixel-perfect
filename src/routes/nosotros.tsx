import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Handshake, Users } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero, Testimonials, ClosingCta } from "@/components/site/Sections";
import { Gallery } from "@/components/site/Gallery";
import { InstitutionsMarquee } from "@/components/site/Institutions";
import { GALLERY } from "@/lib/services";
import microAntiguo from "@/assets/micro-antiguo.jpeg.asset.json";

const t = "Nosotros – Kaitibus, tres generaciones en la ruta";
const d = "Una empresa familiar con más de 30 años de trayectoria en transporte escolar y viajes recreativos.";
export const Route = createFileRoute("/nosotros")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] }),
  component: NosotrosPage,
});

const GENERATIONS = [
  { label: "Primera generación", who: "Los abuelos", text: "Fundaron la empresa con compromiso, responsabilidad y confianza." },
  { label: "Segunda generación", who: "Los hijos", text: "Continuaron el camino manteniendo los mismos valores." },
  { label: "Tercera generación", who: "Los nietos", text: "Hoy siguen en la ruta con el mismo compromiso de siempre." },
];

const VALUES = [
  { icon: HeartHandshake, title: "Compromiso", text: "Con cada familia e institución que nos elige, viaje tras viaje." },
  { icon: ShieldCheck, title: "Responsabilidad", text: "Puntualidad y seguridad en cada recorrido, sin excepciones." },
  { icon: Handshake, title: "Confianza", text: "La que construimos con quienes nos eligen desde hace generaciones." },
];

function NosotrosPage() {
  return (
    <>
      <PageHero title="Nuestra historia" subtitle="Tres generaciones de una misma familia, más de 30 años en la ruta." />

      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">De abuelos a nietos</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>Con más de 30 años de trayectoria, nos hemos consolidado gracias al compromiso, la responsabilidad y la confianza de quienes nos eligen.</p>
              <p>Fundada por nuestros abuelos, hoy la empresa continúa en manos de sus hijos y nietos, quienes mantienen el mismo compromiso y los valores que dieron origen a este proyecto.</p>
              <p>A lo largo de los años acompañamos a muchas personas, brindando un servicio seguro, puntual y de calidad.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img src={microAntiguo.url} alt="Micro escolar clásico de la familia, de los primeros años de la empresa" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="text-center"><h2 className="text-3xl sm:text-4xl">Tres generaciones</h2></Reveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            <div className="absolute left-7 top-0 h-full w-1 rounded-full bg-brand/20 md:left-0 md:top-7 md:h-1 md:w-full" aria-hidden />
            {GENERATIONS.map((g, i) => (
              <Reveal key={g.label} delay={i * 150}>
                <li className="relative flex gap-5 md:block">
                  <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground shadow-lift">
                    {i + 1}
                  </div>
                  <div className="md:mt-6">
                    <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand">{g.label}</p>
                    <h3 className="mt-1 flex items-center gap-2 text-xl"><Users className="h-5 w-5 text-brand" />{g.who}</h3>
                    <p className="mt-2 text-muted-foreground">{g.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="text-center"><h2 className="text-3xl sm:text-4xl">Nuestros valores</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <article className="group h-full rounded-3xl border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-brand hover:shadow-lift">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-primary-foreground">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="text-center"><h2 className="text-3xl sm:text-4xl">Un poco de nuestra historia en imágenes</h2></Reveal>
          <div className="mt-12"><Gallery images={GALLERY} /></div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site">
          <Reveal className="text-center"><h2 className="text-3xl sm:text-4xl">Instituciones que confían en nosotros</h2></Reveal>
        </div>
        <div className="mt-10"><InstitutionsMarquee /></div>
      </section>

      <div className="bg-cream"><Testimonials /></div>

      <ClosingCta title="Sumate a nuestra historia" text="Conocé nuestros servicios o escribinos directamente." />
    </>
  );
}
