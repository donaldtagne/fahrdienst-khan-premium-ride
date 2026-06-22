export type RoutePreset = {
  slug: string;
  from: string;
  to: string;
  km: number;
  minutes: number;
  priceEUR: number;
  category: "airport" | "city" | "longdistance" | "medical";
  highlights: { de: string; en: string }[];
};

// Festpreise ab Frankenthal. Quelle: interne Tarifkalkulation.
export const ROUTES: RoutePreset[] = [
  {
    slug: "frankenthal-flughafen-frankfurt",
    from: "Frankenthal",
    to: "Flughafen Frankfurt (FRA)",
    km: 85,
    minutes: 55,
    priceEUR: 95,
    category: "airport",
    highlights: [
      { de: "Flugüberwachung in Echtzeit", en: "Real-time flight tracking" },
      { de: "Meet & Greet am Terminal", en: "Meet & greet at the terminal" },
      { de: "Hilfe beim Gepäck", en: "Luggage assistance" },
    ],
  },
  {
    slug: "frankenthal-flughafen-stuttgart",
    from: "Frankenthal",
    to: "Flughafen Stuttgart (STR)",
    km: 175,
    minutes: 110,
    priceEUR: 245,
    category: "airport",
    highlights: [
      { de: "Flugüberwachung", en: "Flight tracking" },
      { de: "Direkte Verbindung ohne Umsteigen", en: "Direct ride, no transfers" },
    ],
  },
  {
    slug: "frankenthal-flughafen-hahn",
    from: "Frankenthal",
    to: "Flughafen Hahn (HHN)",
    km: 100,
    minutes: 80,
    priceEUR: 140,
    category: "airport",
    highlights: [
      { de: "Auch frühmorgens & nachts", en: "Available early morning & night" },
      { de: "Festpreis inkl. Maut", en: "Flat price incl. tolls" },
    ],
  },
  {
    slug: "frankenthal-mannheim",
    from: "Frankenthal",
    to: "Mannheim Hbf",
    km: 18,
    minutes: 25,
    priceEUR: 35,
    category: "city",
    highlights: [
      { de: "Pünktlich zum Zug", en: "On time for your train" },
      { de: "24/7 verfügbar", en: "Available 24/7" },
    ],
  },
  {
    slug: "frankenthal-heidelberg",
    from: "Frankenthal",
    to: "Heidelberg",
    km: 35,
    minutes: 40,
    priceEUR: 55,
    category: "city",
    highlights: [
      { de: "Direkt zu Klinik, Universität oder Altstadt", en: "Direct to clinic, university or old town" },
    ],
  },
  {
    slug: "frankenthal-ludwigshafen",
    from: "Frankenthal",
    to: "Ludwigshafen",
    km: 10,
    minutes: 18,
    priceEUR: 22,
    category: "city",
    highlights: [
      { de: "BASF, Klinikum, Hauptbahnhof", en: "BASF, clinic, central station" },
    ],
  },
  {
    slug: "frankenthal-worms",
    from: "Frankenthal",
    to: "Worms",
    km: 22,
    minutes: 25,
    priceEUR: 32,
    category: "city",
    highlights: [
      { de: "Geschäftstermine, Klinik, Bahnhof", en: "Business meetings, clinic, station" },
    ],
  },
  {
    slug: "frankenthal-speyer",
    from: "Frankenthal",
    to: "Speyer",
    km: 30,
    minutes: 35,
    priceEUR: 45,
    category: "city",
    highlights: [
      { de: "Diakonissen, Dom, Technik Museum", en: "Diakonissen clinic, cathedral, museum" },
    ],
  },
  {
    slug: "frankenthal-kaiserslautern",
    from: "Frankenthal",
    to: "Kaiserslautern",
    km: 55,
    minutes: 50,
    priceEUR: 80,
    category: "city",
    highlights: [
      { de: "Direkt ohne Umsteigen", en: "Direct ride, no transfers" },
    ],
  },
  {
    slug: "frankenthal-karlsruhe",
    from: "Frankenthal",
    to: "Karlsruhe",
    km: 75,
    minutes: 60,
    priceEUR: 110,
    category: "longdistance",
    highlights: [
      { de: "BGH, Klinikum, Hauptbahnhof", en: "Federal court, clinic, station" },
    ],
  },
];

export function getRoute(slug: string) {
  return ROUTES.find((r) => r.slug === slug);
}

// Per-km fallback when no preset matches
export const PRICE_BASE_EUR = 12;
export const PRICE_PER_KM_EUR = 1.6;

export function estimatePrice(km: number) {
  return Math.round(PRICE_BASE_EUR + km * PRICE_PER_KM_EUR);
}