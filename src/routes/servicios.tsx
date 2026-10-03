import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

const t = "Servicios – Kaitibus Micros Escolares";
const d = "Transporte escolar, campamentos, eventos y viajes especiales en Buenos Aires.";
export const Route = createFileRoute("/servicios")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] }),
  component: () => <ComingSoon title="Nuestros servicios" subtitle="Traslados seguros y puntuales, pensados para cada institución, familia y ocasión." />,
});
