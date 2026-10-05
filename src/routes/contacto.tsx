import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Check, ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SITE, waLink } from "@/lib/site";
import { SERVICES, SERVICE_OPTIONS, type ServiceOption } from "@/lib/services";
import { PageHero } from "@/components/site/Sections";
import { Reveal } from "@/components/site/Reveal";
import { HelpCircle } from "lucide-react";

const t = "Contacto – Kaitibus Micros Escolares";
const d = "Escribinos y coordinemos el traslado para tu institución, evento o viaje.";

export const Route = createFileRoute("/contacto")({
  validateSearch: (s: Record<string, unknown>): { servicio?: ServiceOption } => {
    const v = s["servicio"];
    return SERVICE_OPTIONS.includes(v as ServiceOption) ? { servicio: v as ServiceOption } : {};
  },
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] }),
  component: ContactoPage,
});

const ADDRESS_IS_PLACEHOLDER = SITE.address.startsWith("[");

function ContactoPage() {
  const { servicio } = Route.useSearch();
  return (
    <>
      <PageHero title="Contacto" subtitle={d} />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Hablemos</h2>
            <ul className="mt-6 space-y-4">
              {[
                { icon: Phone, label: "Teléfono / WhatsApp", value: SITE.phone },
                { icon: Mail, label: "Email", value: SITE.email },
                { icon: MapPin, label: "Dirección", value: SITE.address },
                { icon: Clock, label: "Horarios", value: SITE.hours },
              ].map((c) => (
                <li key={c.label} className="flex items-start gap-4 rounded-2xl border bg-card p-4 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-brand"><c.icon className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                    <p className="break-words font-medium">{c.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn mt-6 w-full bg-whatsapp text-primary-foreground hover:shadow-soft">
              <MessageCircle className="h-5 w-5" /> Escribinos por WhatsApp
            </a>
            <div className="mt-6 overflow-hidden rounded-3xl border shadow-soft">
              {ADDRESS_IS_PLACEHOLDER ? (
                <div className="grid aspect-[4/3] place-items-center bg-cream p-6 text-center text-muted-foreground">
                  <div><MapPin className="mx-auto h-8 w-8 text-brand" /><p className="mt-2">[El mapa aparece cuando cargues la dirección]</p></div>
                </div>
              ) : (
                <iframe
                  title="Ubicación de Kaitibus"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&output=embed`}
                  className="aspect-[4/3] w-full"
                  loading="lazy"
                />
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <QuoteWizard initial={servicio} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

type Data = { service: ServiceOption | ""; message: string; institution: string; full_name: string; phone: string; email: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(d: Data) {
  const e: Partial<Record<keyof Data, string>> = {};
  if (d.full_name.trim().length < 2) e.full_name = "Contanos tu nombre completo.";
  if (d.phone.replace(/\D/g, "").length < 6) e.phone = "Ingresá un teléfono válido.";
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Revisá el correo, parece incompleto.";
  return e;
}

function QuoteWizard({ initial }: { initial?: ServiceOption }) {
  const [step, setStep] = useState(initial ? 1 : 0);
  const [data, setData] = useState<Data>({ service: initial ?? "", message: "", institution: "", full_name: "", phone: "", email: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof Data, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const errors = validate(data);
  const set = (k: keyof Data, v: string) => setData((p) => ({ ...p, [k]: v }));
  const steps = ["¿Qué necesitás?", "Detalles", "Tus datos"];

  const waMsg = () =>
    `Hola Kaitibus, quisiera pedir un presupuesto.\nServicio: ${data.service || "-"}` +
    (data.institution ? `\nInstitución/grupo: ${data.institution}` : "") +
    (data.message ? `\nDetalle: ${data.message}` : "") +
    (data.full_name ? `\nNombre: ${data.full_name}` : "");

  async function submit() {
    setTouched({ full_name: true, phone: true, email: true });
    if (Object.keys(errors).length || !data.service) return;
    setStatus("sending");
    const { error } = await supabase.from("quote_requests").insert({
      service: data.service,
      message: data.message.trim().slice(0, 2000) || null,
      institution: data.institution.trim().slice(0, 200) || null,
      full_name: data.full_name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
    });
    // TODO: aviso por email al recibir una solicitud (se conecta cuando haya dominio de email).
    setStatus(error ? "error" : "done");
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center shadow-soft sm:p-12">
        <CheckCircle2 className="mx-auto h-16 w-16 text-whatsapp" />
        <h2 className="mt-4 text-2xl sm:text-3xl">¡Gracias! Te contactamos a la brevedad.</h2>
        <p className="mt-3 text-muted-foreground">Si querés agilizar, también podés mandarnos tu consulta por WhatsApp.</p>
        <a href={waLink(waMsg())} target="_blank" rel="noopener noreferrer" className="btn mt-6 bg-whatsapp text-primary-foreground">
          <MessageCircle className="h-5 w-5" /> Enviar por WhatsApp
        </a>
      </div>
    );
  }

  const field = "mt-1.5 w-full min-h-12 rounded-xl border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30";

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-soft sm:p-10">
      <h2 className="text-2xl sm:text-3xl">Solicitá tu presupuesto</h2>
      <p className="mt-2 text-muted-foreground">Completá el formulario con los datos de tu institución, club o evento y te contactamos a la brevedad.</p>

      <div className="mt-6">
        <div className="flex justify-between text-xs font-semibold text-muted-foreground">
          {steps.map((s, i) => <span key={s} className={i <= step ? "text-brand" : ""}>{i + 1}. {s}</span>)}
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}>
          <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      </div>

      <div className="mt-8">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-lg font-semibold">¿Qué necesitás?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((opt) => {
                const Icon = SERVICES.find((s) => s.title === opt)?.icon ?? HelpCircle;
                const active = data.service === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { set("service", opt); setStep(1); }}
                    aria-pressed={active}
                    className={`flex min-h-16 items-center gap-3 rounded-2xl border-2 p-4 text-left font-display font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-brand ${active ? "border-brand bg-accent" : "border-border"}`}
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-brand text-primary-foreground" : "bg-accent text-brand"}`}>
                      {active ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <p className="rounded-xl bg-accent px-4 py-2 text-sm">Servicio: <strong>{data.service}</strong></p>
            <label className="block">
              <span className="font-medium">Contanos qué necesitás</span>
              <textarea rows={5} maxLength={2000} value={data.message} onChange={(e) => set("message", e.target.value)} className={field} placeholder="Fecha, destino, cantidad de personas, horarios…" />
            </label>
            <label className="block">
              <span className="font-medium">Institución, club o grupo <span className="text-muted-foreground">(opcional)</span></span>
              <input maxLength={200} value={data.institution} onChange={(e) => set("institution", e.target.value)} className={field} />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            {([
              ["full_name", "Nombre completo", "text", "name"],
              ["phone", "Teléfono / WhatsApp", "tel", "tel"],
              ["email", "Correo electrónico", "email", "email"],
            ] as const).map(([k, label, type, ac]) => {
              const err = touched[k] && errors[k];
              const ok = touched[k] && !errors[k];
              return (
                <label key={k} className="block">
                  <span className="font-medium">{label} <span className="text-primary">*</span></span>
                  <input
                    type={type}
                    autoComplete={ac}
                    maxLength={k === "full_name" ? 120 : k === "phone" ? 40 : 200}
                    value={data[k]}
                    onChange={(e) => { set(k, e.target.value); setTouched((p) => ({ ...p, [k]: true })); }}
                    onBlur={() => setTouched((p) => ({ ...p, [k]: true }))}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${k}-err` : undefined}
                    className={`${field} ${err ? "border-destructive" : ok ? "border-whatsapp" : ""}`}
                  />
                  {err && <span id={`${k}-err`} className="mt-1 block text-sm text-destructive">{err}</span>}
                </label>
              );
            })}
            {status === "error" && (
              <p className="rounded-xl border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                No pudimos enviar tu solicitud. Probá de nuevo o escribinos por WhatsApp.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="btn btn-outline"><ArrowLeft className="h-4 w-4" /> Volver</button>
        ) : <span />}
        <div className="flex flex-col gap-3 sm:flex-row">
          {step > 0 && (
            <a href={waLink(waMsg())} target="_blank" rel="noopener noreferrer" className="btn border-2 border-whatsapp text-whatsapp">
              <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
            </a>
          )}
          {step === 1 && <button type="button" onClick={() => setStep(2)} className="btn btn-primary">Siguiente <ArrowRight className="h-4 w-4" /></button>}
          {step === 2 && (
            <button type="button" onClick={submit} disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
              {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</> : "Enviar solicitud"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
