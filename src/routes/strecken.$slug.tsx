import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, MapPin, Clock, ArrowRight, Check, ChevronLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { MobileCallBar } from "@/components/site/MobileCallBar";
import { BookingForm } from "@/components/site/BookingForm";
import { Button } from "@/components/ui/button";
import { ROUTES, getRoute, type RoutePreset } from "@/lib/routes-data";
import { useI18n, CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/strecken/$slug")({
  head: ({ params }) => {
    const r = getRoute(params.slug);
    if (!r) return { meta: [{ title: "Strecke nicht gefunden" }] };
    const title = `Taxi ${r.from} → ${r.to} · Festpreis ${r.priceEUR} € – Fahrdienst Khan`;
    const desc = `Festpreis ${r.priceEUR} € für die Strecke ${r.from} nach ${r.to}. ${r.km} km, ca. ${r.minutes} Minuten. Pünktlich, diskret, 24/7 buchbar.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/strecken/${r.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Taxi & Chauffeur",
            provider: { "@type": "TaxiService", name: "Fahrdienst Khan", telephone: "+49 174 3262459" },
            areaServed: r.to,
            offers: { "@type": "Offer", price: r.priceEUR, priceCurrency: "EUR" },
            name: `Taxi ${r.from} → ${r.to}`,
          }),
        },
      ],
    };
  },
  loader: ({ params }): RoutePreset => {
    const r = getRoute(params.slug);
    if (!r) throw notFound();
    return r;
  },
  component: StreckeDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-8 text-center">
      <div>
        <h1 className="font-display text-3xl text-foreground">Strecke nicht gefunden</h1>
        <Link to="/strecken" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">← Zu allen Strecken</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-8 text-center">
      <div>
        <h1 className="font-display text-3xl text-foreground">Etwas ist schiefgelaufen</h1>
        <Link to="/strecken" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">← Zu allen Strecken</Link>
      </div>
    </div>
  ),
});

function StreckeDetail() {
  const r = Route.useLoaderData();
  const { t, lang } = useI18n();
  const related = ROUTES.filter((x) => x.slug !== r.slug && x.category === r.category).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.55_0.2_255_/_0.25)] blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Link to="/strecken" className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-3 w-3" /> {lang === "de" ? "Alle Strecken" : "All routes"}
            </Link>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.12_85)]" />
              {r.category === "airport" ? (lang === "de" ? "Flughafentransfer" : "Airport Transfer") : (lang === "de" ? "Stadtfahrt" : "City ride")}
            </div>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-gradient-platinum sm:text-5xl lg:text-6xl">
              Taxi {r.from} → {r.to}
            </h1>
            <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t("price.flat")}</div>
                <div className="mt-1 font-display text-6xl text-gradient-platinum">{r.priceEUR} €</div>
              </div>
              <div className="flex gap-6 text-sm text-foreground/80">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[oklch(0.82_0.12_85)]" /> {r.km} km</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[oklch(0.82_0.12_85)]" /> {r.minutes} min</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-full bg-white px-6 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
                <a href="#booking">{t("nav.book")} <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-foreground hover:bg-white/10">
                <a href={`tel:${CONTACT.phoneHref}`}><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-display text-3xl text-gradient-platinum sm:text-4xl">
                {lang === "de" ? "Was Sie bei dieser Fahrt erwarten dürfen" : "What's included on this ride"}
              </h2>
              <ul className="mt-6 space-y-4">
                {r.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[oklch(0.82_0.12_85)]/20 text-[oklch(0.82_0.12_85)]">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-foreground/85">{lang === "de" ? h.de : h.en}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="booking" className="rounded-3xl glass-strong p-6 sm:p-8" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <h3 className="mb-5 font-display text-2xl text-foreground">{t("booking.title")}</h3>
              <BookingForm compact />
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-white/5 bg-[oklch(0.09_0.025_260)]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                {lang === "de" ? "Weitere Strecken" : "More routes"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((x) => (
                  <Link
                    key={x.slug}
                    to="/strecken/$slug"
                    params={{ slug: x.slug }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/25"
                  >
                    <div className="text-sm text-foreground/85">{x.from} → {x.to}</div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="text-xs text-muted-foreground">{x.km} km · {x.minutes} min</div>
                      <div className="font-display text-xl text-gradient-platinum">{x.priceEUR} €</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileCallBar />
    </div>
  );
}