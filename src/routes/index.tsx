import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Shield, Star, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import aboutImg from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { BookingForm } from "@/components/site/BookingForm";
import { ServiceCards } from "@/components/site/Services";
import { useI18n, CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fahrdienst Khan – Taxi & Premium Chauffeur Frankenthal" },
      { name: "description", content: "Taxi Frankenthal · Flughafentransfer · Krankenfahrten · Firmenfahrten. Pünktlich, zuverlässig, 24/7. Jetzt buchen: +49 174 3262459." },
      { property: "og:title", content: "Fahrdienst Khan – Taxi & Chauffeur Frankenthal" },
      { property: "og:description", content: "Premium Fahrdienst Frankenthal – Flughafentransfer, Krankenfahrten, Firmenfahrten." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Fahrdienst Khan",
          telephone: "+49 174 3262459",
          areaServed: "Frankenthal, Rhein-Neckar",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kaulaverling 33",
            postalCode: "67227",
            addressLocality: "Frankenthal",
            addressCountry: "DE",
          },
          openingHours: "Mo-Su 00:00-23:59",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Luxury chauffeur car Frankenthal" className="h-full w-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, oklch(0.16 0.05 260 / 0.92) 0%, oklch(0.18 0.05 260 / 0.78) 45%, oklch(0.16 0.05 260 / 0.4) 100%)" }} />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-28">
            <div className="text-primary-foreground">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary-foreground/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {t("hero.eyebrow")}
              </div>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-xl text-base text-primary-foreground/80 sm:text-lg">{t("hero.subtitle")}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gold text-navy-deep hover:bg-gold/90 h-12 px-6">
                  <a href={`tel:${CONTACT.phoneHref}`}>
                    <Phone className="h-5 w-5" /> {t("cta.call")} · {CONTACT.phone}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10">
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    {t("cta.whatsapp")}
                  </a>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { icon: Clock, text: t("hero.trust1") },
                  { icon: Shield, text: t("hero.trust2") },
                  { icon: Star, text: t("hero.trust3") },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex flex-col items-start gap-2 border-l border-primary-foreground/15 pl-3">
                    <Icon className="h-5 w-5 text-gold" />
                    <span className="text-xs leading-tight text-primary-foreground/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <div className="mb-5">
                <h2 className="font-display text-2xl text-navy">{t("booking.title")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("booking.subtitle")}</p>
              </div>
              <BookingForm compact />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">— {t("services.subtitle")}</div>
              <h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">{t("services.title")}</h2>
            </div>
            <Button asChild variant="ghost" className="text-navy hover:bg-navy/5">
              <a href="/services">{t("nav.services")} <ChevronRight className="h-4 w-4" /></a>
            </Button>
          </div>
          <ServiceCards />
        </section>

        {/* ABOUT */}
        <section className="bg-secondary/40">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="relative">
              <img src={aboutImg} alt="Luxury car interior" loading="lazy" width={1280} height={960} className="rounded-2xl object-cover shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }} />
              <div className="absolute -bottom-6 -right-6 hidden rounded-xl border border-border bg-card p-5 shadow-card sm:block" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">5.0 · Uber Partner</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">— {t("about.eyebrow")}</div>
              <h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">{t("about.title")}</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t("about.p1")}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("about.p2")}</p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { v: "10+", l: t("about.stat1") },
                  { v: "2 000+", l: t("about.stat2") },
                  { v: "365", l: t("about.stat3") },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-display text-3xl text-navy">{s.v}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">— ★★★★★</div>
            <h2 className="mt-3 font-display text-4xl text-navy sm:text-5xl">{t("reviews.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {["review1", "review2", "review3"].map((k, i) => (
              <figure key={k} className="rounded-xl border border-border bg-card p-7" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-base italic leading-relaxed text-foreground/80">"{t(k)}"</blockquote>
                <figcaption className="mt-5 text-sm font-medium text-navy">— {["M. Becker", "A. Schneider", "T. Wagner"][i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary/40">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <h2 className="text-center font-display text-4xl text-navy sm:text-5xl">{t("faq.title")}</h2>
            <Accordion type="single" collapsible className="mt-10">
              {[1, 2, 3, 4].map((i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-left text-base font-medium text-navy hover:no-underline">
                    {t(`faq.q${i}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{t(`faq.a${i}`)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy-deep">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center text-primary-foreground sm:px-6 lg:px-8">
            <MapPin className="h-8 w-8 text-gold" />
            <h2 className="font-display text-3xl sm:text-5xl">{t("hero.title")}</h2>
            <p className="max-w-xl text-primary-foreground/75">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gold text-navy-deep hover:bg-gold/90 h-12 px-6">
                <a href={`tel:${CONTACT.phoneHref}`}><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">{t("cta.whatsapp")}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
