import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUp, Mail, MapPin, Menu, MessageCircle, Phone, Clock, X } from "lucide-react";
import logo from "@/assets/logo.jpeg.asset.json";
import { SITE, waLink } from "@/lib/site";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-all duration-300 ${scrolled ? "shadow-soft" : ""}`}
    >
      <div
        className={`container-site flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
      >
        <Link to="/" className="flex shrink-0 items-center" aria-label="Kaitibus, ir al inicio">
          <img
            src={logo.url}
            alt="Kaitibus – Micros Escolares"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`}
          />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-4 py-2 font-display text-sm font-medium text-foreground transition-colors duration-200 hover:text-brand"
              activeProps={{ className: "bg-primary !text-primary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/contacto" className="btn btn-primary ml-3 !min-h-11 text-sm">
            Solicitar información
          </Link>
        </nav>
        <button
          className="grid h-12 w-12 place-items-center rounded-full text-foreground hover:bg-muted lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        className={`overflow-hidden border-t bg-background transition-[max-height] duration-300 lg:hidden ${open ? "max-h-96" : "max-h-0 border-transparent"}`}
      >
        <nav className="container-site flex flex-col gap-1 py-3" aria-label="Móvil">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              className="flex min-h-12 items-center rounded-2xl px-4 font-display font-medium text-foreground"
              activeProps={{ className: "bg-primary !text-primary-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/contacto" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
            Solicitar información
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-2xl bg-background p-2">
            <img src={logo.url} alt="Kaitibus – Micros Escolares" className="h-20 w-auto" loading="lazy" />
          </div>
          <p className="mt-4 font-display text-lg font-semibold">Tres generaciones en la ruta</p>
        </div>
        <div>
          <h2 className="text-base">Secciones</h2>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-brand">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base">Contacto</h2>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-brand" />{SITE.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-brand" />{SITE.email}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand" />{SITE.address}</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-brand" />{SITE.hours}</li>
          </ul>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
            <MessageCircle className="h-5 w-5" /> Escribinos por WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-charcoal-foreground/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Kaitibus. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className={`grid h-11 w-11 place-items-center rounded-full bg-charcoal text-charcoal-foreground shadow-soft transition-all duration-300 ${show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-soft transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
