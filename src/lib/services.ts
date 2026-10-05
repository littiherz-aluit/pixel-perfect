import { Bus, Tent, PartyPopper, MapPinned, type LucideIcon } from "lucide-react";
import flota from "@/assets/flota.jpeg.asset.json";
import microActual from "@/assets/micro-actual.jpeg.asset.json";
import microFrente from "@/assets/micro-frente.jpeg.asset.json";
import microAntiguo from "@/assets/micro-antiguo.jpeg.asset.json";

export const SERVICE_OPTIONS = [
  "Transporte escolar",
  "Campamentos y excursiones",
  "Eventos y cumpleaños",
  "Viajes especiales",
  "Otro / Consulta general",
] as const;
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export type Service = {
  title: ServiceOption;
  icon: LucideIcon;
  short: string;
  long: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    title: "Transporte escolar",
    icon: Bus,
    short: "Traslados diarios para instituciones educativas con puntualidad y seguridad.",
    long: "Traslados diarios seguros y puntuales entre el hogar y la institución educativa, con choferes de confianza y unidades revisadas periódicamente.",
    image: microActual.url,
    alt: "Micro escolar Kaitibus rojo y blanco listo para el recorrido",
  },
  {
    title: "Campamentos y excursiones",
    icon: Tent,
    short: "Acompañamos salidas educativas y campamentos con atención personalizada.",
    long: "Acompañamos a instituciones y grupos en salidas educativas y recreativas, con logística pensada para cada destino y edad.",
    image: flota.url,
    alt: "Varios micros escolares Kaitibus estacionados juntos",
  },
  {
    title: "Eventos y cumpleaños",
    icon: PartyPopper,
    short: "Traslados para celebraciones y eventos especiales, para grupos grandes o chicos.",
    long: "Traslados especiales para cumpleaños, fiestas y eventos, con la puntualidad y seguridad de siempre.",
    image: microFrente.url,
    alt: "Frente de un micro escolar Kaitibus con el cartel Escolares",
  },
  {
    title: "Viajes especiales",
    icon: MapPinned,
    short: "Viajes recreativos de corta distancia, con la experiencia de más de tres décadas.",
    long: "Viajes a medida para grupos, clubes y familias que necesitan un servicio flexible y personalizado.",
    image: microAntiguo.url,
    alt: "Micro escolar clásico de la familia en un campo verde",
  },
];

export const GALLERY = [
  { src: microAntiguo.url, alt: "Micro escolar clásico Mercedes-Benz de los primeros años de la empresa" },
  { src: flota.url, alt: "Flota actual de micros escolares Kaitibus" },
  { src: microActual.url, alt: "Micro escolar Kaitibus actual, vista lateral" },
  { src: microFrente.url, alt: "Frente de un micro escolar Kaitibus" },
  // Sumá más fotos acá: { src: "...", alt: "..." }
];
