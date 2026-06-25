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
      {/* Map illustration — redesigned for readability */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.11_0.025_260)]">
        <div className="relative aspect-[4/3] w-full">
          {/* Subtle radial glow behind the map */}
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 45% 50%, oklch(0.82 0.12 85 / 0.08) 0%, transparent 65%)" }} />

          {/* Clean SVG base */}
          <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
            {/* Rhine river — brighter, readable */}
            <path d="M 60 10 Q 130 70 110 130 T 150 250 L 170 290" stroke="oklch(0.60 0.12 240 / 0.45)" strokeWidth="2.5" fill="none" />
            {/* A6 / A61 highways stylized */}
            <path d="M 0 180 Q 200 160 400 140" stroke="oklch(1 0 0 / 0.10)" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
            <path d="M 180 0 Q 170 150 190 300" stroke="oklch(1 0 0 / 0.10)" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
            {/* Connection lines between cities */}
            <g stroke="oklch(0.82 0.12 85 / 0.12)" strokeWidth="1" strokeDasharray="4 4">
              <line x1="170" y1="140" x2="220" y2="165" />
              <line x1="170" y1="140" x2="280" y2="185" />
              <line x1="170" y1="140" x2="150" y2="90" />
              <line x1="170" y1="140" x2="208" y2="215" />
              <line x1="170" y1="140" x2="100" y2="54" />
            </g>
          </svg>

          {/* Frankenthal — highlighted home base */}
          <div className="absolute" style={{ left: "42.5%", top: "46.5%" }}>
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.82_0.12_85)] opacity-25" style={{ width: 28, height: 28, margin: -14 }} />
              <div className="relative grid h-3.5 w-3.5 place-items-center rounded-full border border-white/30 bg-[oklch(0.82_0.12_85)] shadow-[0_0_12px_oklch(0.82_0.12_85_/_0.45)]" />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/15 bg-[oklch(0.15_0.03_260)]/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-foreground shadow-lg backdrop-blur-sm">
                Frankenthal
              </div>
            </div>
          </div>

          {/* Surrounding cities — readable badges */}
          {[
            { name: "Mannheim", x: "55%", y: "55%", sub: "~18 km" },
            { name: "Heidelberg", x: "70%", y: "62%", sub: "~28 km" },
            { name: "Worms", x: "37.5%", y: "30%", sub: "~22 km" },
            { name: "Speyer", x: "52%", y: "72%", sub: "~15 km" },
            { name: "Ludwigshafen", x: "46%", y: "52%", sub: "~12 km" },
            { name: "FRA Airport", x: "25%", y: "18%", sub: "~85 km" },
          ].map((p) => (
            <div key={p.name} className="absolute" style={{ left: p.x, top: p.y }}>
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="h-2.5 w-2.5 rounded-full border border-white/30 bg-white/80 shadow-sm" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                  <span className="rounded-md border border-white/10 bg-[oklch(0.18_0.04_260)]/90 px-2 py-0.5 text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm">
                    {p.name}
                  </span>
                  <span className="ml-1 rounded-md border border-white/10 bg-[oklch(0.82_0.12_85)]/15 px-1.5 py-0.5 text-[10px] font-medium text-[oklch(0.82_0.12_85)]">
                    {p.sub}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom legend */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[oklch(0.13_0.03_260)]/60 px-5 py-3 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.82_0.12_85)] shadow-[0_0_6px_oklch(0.82_0.12_85_/_0.5)]" />
            {t("area.region")}
          </div>
          <div className="text-[10px] text-muted-foreground">Rhein-Neckar Region</div>
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