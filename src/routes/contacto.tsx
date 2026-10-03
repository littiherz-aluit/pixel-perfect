import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

const t = "Contacto – Kaitibus Micros Escolares";
const d = "Escribinos y coordinemos el traslado para tu institución, evento o viaje.";
export const Route = createFileRoute("/contacto")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] }),
  component: () => <ComingSoon title="Contacto" subtitle={d} />,
});
