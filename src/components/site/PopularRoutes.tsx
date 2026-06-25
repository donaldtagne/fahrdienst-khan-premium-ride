import { Link } from "@tanstack/react-router";
import { Plane, MapPin, ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/routes-data";
import { useI18n } from "@/lib/i18n";

export function PopularRoutes({ limit }: { limit?: number }) {
  const { lang } = useI18n();
  const list = limit ? ROUTES.slice(0, limit) : ROUTES;
  return (
    <div className="grid grid-cols-1 gap-3">
      {list.map((r) => {
        const Icon = r.category === "airport" ? Plane : MapPin;
        return (
          <Link
            key={r.slug}
            to="/strecken/$slug"
            params={{ slug: r.slug }}
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/25 hover:bg-white/[0.06]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[oklch(0.82_0.12_85)]/15 text-[oklch(0.82_0.12_85)]">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">
                  {r.from} → {r.to}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {r.km} km · {r.minutes} min
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="font-display text-xl text-gradient-platinum">{r.priceEUR} €</div>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                {lang === "de" ? "Details" : "View"}
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}