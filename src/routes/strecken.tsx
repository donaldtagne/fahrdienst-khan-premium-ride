import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, MapPin, ArrowRight, Phone, Calculator } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { MobileCallBar } from "@/components/site/MobileCallBar";
import { PageHero } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes-data";
import { useI18n, CONTACT } from "@/lib/i18n";
import { PriceCalculator } from "@/components/site/PriceCalculator";

export const Route = createFileRoute("/strecken")({
  head: () => ({
    meta: [
      { title: "Strecken & Festpreise – Fahrdienst Khan Frankenthal" },
      { name: "description", content: "Festpreise für beliebte Strecken ab Frankenthal: Flughafen Frankfurt, Mannheim, Heidelberg, Stuttgart, Hahn und mehr. Transparent, ohne Überraschungen." },
      { property: "og:title", content: "Strecken & Festpreise – Fahrdienst Khan" },
      { property: "og:description", content: "Transparente Festpreise für Flughafentransfer und Stadtfahrten ab Frankenthal." },
    ],
    links: [{ rel: "canonical", href: "/strecken" }],
  }),
  component: StreckenIndex,
});

function StreckenIndex() {
  const { t, lang } = useI18n();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={lang === "de" ? "Strecken & Preise" : "Routes & Prices"}
          title={lang === "de" ? "Transparente Festpreise" : "Transparent flat prices"}
          subtitle={lang === "de"
            ? "Keine versteckten Kosten. Wählen Sie eine beliebte Strecke ab Frankenthal – Preis steht vorab fest."
            : "No hidden costs. Pick a popular route from Frankenthal – the price is fixed in advance."}
        />

        {/* Preisrechner */}
        <section id="rechner" className="relative border-b border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/80">
                <Calculator className="h-3 w-3" />
                {lang === "de" ? "Preisrechner" : "Price calculator"}
              </div>
              <h2 className="font-display text-4xl text-gradient-platinum sm:text-5xl">
                {lang === "de" ? "Preis sofort berechnen" : "Calculate price instantly"}
              </h2>
            </div>
            <PriceCalculator />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROUTES.map((r) => {
              const Icon = r.category === "airport" ? Plane : MapPin;
              return (
                <Link
                  key={r.slug}
                  to="/strecken/$slug"
                  params={{ slug: r.slug }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.82_0.12_85)]/15 text-[oklch(0.82_0.12_85)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-3xl text-gradient-platinum">{r.priceEUR} €</div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t("price.flat")}</div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{r.from}</div>
                    <div className="mt-1 font-display text-xl text-foreground">→ {r.to}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{r.km} km · {r.minutes} min</div>
                  </div>
                  <div className="mt-5 flex items-center gap-1 text-xs text-foreground/70 transition-colors group-hover:text-foreground">
                    {lang === "de" ? "Strecke ansehen" : "View route"}
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8">
            <h3 className="font-display text-2xl text-foreground sm:text-3xl">
              {lang === "de" ? "Ihre Strecke nicht dabei?" : "Route not listed?"}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {lang === "de"
                ? "Wir fahren deutschlandweit. Rufen Sie an und erhalten Sie sofort einen Festpreis."
                : "We drive nationwide. Call us for an instant flat price."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="h-11 rounded-full bg-white px-6 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
                <a href={`tel:${CONTACT.phoneHref}`}><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
              </Button>
              <Button asChild className="h-11 rounded-full bg-[#25D366] px-6 text-white hover:bg-[#1DA851]">
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">{t("cta.whatsapp")}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileCallBar />
    </div>
  );
}