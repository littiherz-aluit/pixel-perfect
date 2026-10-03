// Datos de contacto: reemplazá los placeholders por los reales.
export const SITE = {
  phone: "[Tu teléfono]",
  email: "tu-email@kaitibus.com",
  address: "[Tu dirección]",
  hours: "Lunes a viernes de 8 a 18 hs",
  // Número en formato internacional sin "+" ni espacios, ej: 5491112345678
  whatsappNumber: "",
};

export const waLink = (msg = "Hola Kaitibus, quisiera pedir un presupuesto") =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export const INSTITUTIONS = [
  "Lycée Franco Argentino Jean Mermoz",
  "Escuela Italiana Cristoforo Colombo",
  "Club Atlético River Plate",
  "Instituto San Román",
  "Colegio St. Martin",
  "Instituto CREAR",
  "Instituto CREI",
  "Colegio Jacarandá",
  "Colegio Inmaculada Concepción",
  "Instituto Almafuerte",
  "Club Alemán",
  "Club Mitre",
  "Municipalidad de General San Martín",
];
