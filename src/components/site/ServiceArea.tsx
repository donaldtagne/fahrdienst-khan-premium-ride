import { MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const CITIES = [
  "Frankenthal", "Ludwigshafen", "Mannheim", "Heidelberg",
  "Worms", "Speyer", "Kaiserslautern", "Karlsruhe",
  "Bad Dürkheim", "Neustadt a. d. W.", "Hockenheim", "Schwetzingen",
];

const AIRPORTS = [
  { name: "Frankfurt (FRA)", km: 85 },
  { name: "Stuttgart (STR)", km: 175 },
  { name: "Hahn (HHN)", km: 100 },
  { name: "Karlsruhe/Baden-Baden (FKB)", km: 95 },
];

export function ServiceArea() {
  const { t } = useI18n();
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      {/* Map illustration */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.18_0.04_260)] to-[oklch(0.10_0.025_260)]">
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-60">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.82 0.12 85)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.82 0.12 85)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* River Rhine stylized */}
          <path d="M 80 20 Q 140 80 120 140 T 160 260 L 180 295" stroke="oklch(0.55 0.18 240 / 0.35)" strokeWidth="3" fill="none" />
          {/* Roads */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="0" y1={40 + i * 32} x2="400" y2={20 + i * 35} stroke="oklch(1 0 0 / 0.04)" strokeWidth="1" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 38} y1="0" x2={60 + i * 35} y2="300" stroke="oklch(1 0 0 / 0.04)" strokeWidth="1" />
          ))}
          {/* Glow over Frankenthal */}
          <circle cx="170" cy="140" r="120" fill="url(#glow)" />
        </svg>
        {/* City pins */}
        <div className="absolute left-[42%] top-[45%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.82_0.12_85)] opacity-30" style={{ width: 24, height: 24, margin: -12 }} />
            <div className="relative grid h-3 w-3 place-items-center rounded-full bg-[oklch(0.82_0.12_85)] ring-4 ring-[oklch(0.82_0.12_85)]/30" />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium tracking-wide text-foreground backdrop-blur-sm">
              Frankenthal
            </div>
          </div>
        </div>
        {[
          { name: "Mannheim", x: "55%", y: "55%" },
          { name: "Heidelberg", x: "70%", y: "62%" },
          { name: "Worms", x: "38%", y: "30%" },
          { name: "Speyer", x: "52%", y: "72%" },
          { name: "FRA", x: "25%", y: "18%" },
        ].map((p) => (
          <div key={p.name} className="absolute" style={{ left: p.x, top: p.y }}>
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div className="h-2 w-2 rounded-full bg-foreground/60 ring-2 ring-foreground/10" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-foreground/70">{p.name}</div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.12_85)]" />
          {t("area.region")}
        </div>
      </div>

      {/* Cities + airports */}
      <div className="flex flex-col justify-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("area.eyebrow")}</div>
        <h3 className="mt-4 font-display text-4xl text-gradient-platinum sm:text-5xl">{t("area.title")}</h3>
        <p className="mt-4 text-base text-muted-foreground">{t("area.desc")}</p>

        <div className="mt-7">
          <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t("area.citiesLabel")}</div>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-foreground/85">
                <MapPin className="h-3 w-3 text-[oklch(0.82_0.12_85)]" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t("area.airportsLabel")}</div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {AIRPORTS.map((a) => (
              <li key={a.name} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
                <span className="text-foreground/85">{a.name}</span>
                <span className="text-muted-foreground">{a.km} km</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}