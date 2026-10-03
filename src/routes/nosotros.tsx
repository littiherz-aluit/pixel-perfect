import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

const t = "Nosotros – Kaitibus, tres generaciones en la ruta";
const d = "Una empresa familiar con más de 30 años de trayectoria en transporte escolar.";
export const Route = createFileRoute("/nosotros")({
  head: () => ({ meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] }),
  component: () => <ComingSoon title="Nuestra historia" subtitle="Tres generaciones de una misma familia, más de 30 años en la ruta." />,
});
