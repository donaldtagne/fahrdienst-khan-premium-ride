import { useMemo, useState } from "react";
import { Calculator, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES, PRICE_BASE_EUR, PRICE_PER_KM_EUR, estimatePrice } from "@/lib/routes-data";
import { useI18n, CONTACT } from "@/lib/i18n";

export function PriceCalculator() {
  const { t, lang } = useI18n();
  const [slug, setSlug] = useState<string>(ROUTES[0].slug);
  const [customKm, setCustomKm] = useState<number>(0);
  const [pax, setPax] = useState<number>(1);
  const [night, setNight] = useState(false);

  const route = ROUTES.find((r) => r.slug === slug);

  const price = useMemo(() => {
    const base = route ? route.priceEUR : estimatePrice(customKm);
    const paxSurcharge = pax > 4 ? 15 : 0;
    const nightSurcharge = night ? Math.round(base * 0.15) : 0;
    return base + paxSurcharge + nightSurcharge;
  }, [route, customKm, pax, night]);

  return (
    <div className="rounded-3xl glass-strong p-6 sm:p-8" style={{ boxShadow: "var(--shadow-elegant)" }}>
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.82_0.12_85)]/15 text-[oklch(0.82_0.12_85)]">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t("price.eyebrow")}</div>
          <h3 className="font-display text-2xl text-foreground">{t("price.title")}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("price.route")}
          </label>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground focus-visible:border-white/30 focus-visible:outline-none"
          >
            {ROUTES.map((r) => (
              <option key={r.slug} value={r.slug} className="bg-[oklch(0.13_0.035_260)]">
                {r.from} → {r.to}
              </option>
            ))}
            <option value="" className="bg-[oklch(0.13_0.035_260)]">{t("price.other")}</option>
          </select>
        </div>

        {!route && (
          <div>
            <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t("price.km")}
            </label>
            <input
              type="number"
              min={1}
              value={customKm || ""}
              onChange={(e) => setCustomKm(Number(e.target.value))}
              className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground focus-visible:border-white/30 focus-visible:outline-none"
              placeholder="z. B. 50"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t("booking.passengers")}
            </label>
            <input
              type="number"
              min={1}
              max={8}
              value={pax}
              onChange={(e) => setPax(Math.max(1, Math.min(8, Number(e.target.value))))}
              className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground focus-visible:border-white/30 focus-visible:outline-none"
            />
          </div>
          <label className="flex cursor-pointer items-end gap-2 pb-2 text-xs text-foreground/80">
            <input
              type="checkbox"
              checked={night}
              onChange={(e) => setNight(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[oklch(0.82_0.12_85)]"
            />
            {t("price.night")}
          </label>
        </div>

        <div className="rounded-2xl border border-[oklch(0.82_0.12_85)]/30 bg-gradient-to-br from-[oklch(0.82_0.12_85)]/12 to-transparent p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t("price.flat")}</div>
              <div className="mt-1 font-display text-5xl text-gradient-platinum">{price} €</div>
              {route && (
                <div className="mt-1 text-xs text-foreground/60">
                  {route.km} km · {route.minutes} min
                </div>
              )}
              {!route && customKm > 0 && (
                <div className="mt-1 text-xs text-foreground/60">
                  {customKm} km · {PRICE_BASE_EUR} € + {PRICE_PER_KM_EUR} €/km
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 text-[10px] leading-relaxed text-foreground/55">
            {t("price.disclaimer")}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="h-11 flex-1 rounded-full bg-white text-[oklch(0.10_0.03_260)] hover:bg-white/90">
            <a href="#booking">
              {t("price.book")} <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 flex-1 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10">
            <a href={`tel:${CONTACT.phoneHref}`}>
              <Phone className="h-4 w-4" /> {lang === "de" ? "Anrufen" : "Call"}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}