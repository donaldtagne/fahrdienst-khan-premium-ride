import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Star, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import aboutImg from "@/assets/about.jpg";
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* HERO — cinematic editorial */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury chauffeur car Frankenthal"
            className="h-full w-full object-cover opacity-55"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        <Header transparent />

        <main className="relative z-20 mx-auto grid max-w-[1600px] items-center gap-16 px-6 pt-12 pb-40 sm:px-8 lg:grid-cols-12 lg:px-16 lg:pt-16">
          {/* Editorial content */}
          <div className="lg:col-span-7 max-w-3xl">
            <div className="mb-10 inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/45">
              <span className="h-px w-12 bg-white/30" />
              {t("hero.eyebrow")}
            </div>
            <h1 className="font-display text-5xl italic leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7rem]">
              {t("hero.line1")} <br />
              <span className="text-white/40">{t("hero.line2")}</span> {t("hero.line3")} <br />
              {t("hero.line4")}
            </h1>
            <p className="mt-10 max-w-xl text-lg font-light leading-relaxed text-white/65 sm:text-xl">
              {t("hero.subtitle")}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-16 gap-y-8">
              <Meta label={t("hero.metaAvailability")} value={t("hero.trust1")} />
              <Meta label={t("hero.metaSecurity")} value={t("hero.trust2")} />
              <Meta label={t("hero.metaPrice")} value={t("hero.trust3")} />
            </div>
          </div>

          {/* Booking architecture */}
          <div className="relative lg:col-span-5">
            <div
              className="relative border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl sm:p-12"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              <h2 className="font-display text-3xl italic text-white">{t("booking.title")}</h2>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/45">{t("booking.subtitle")}</p>
              <div className="mt-10">
                <BookingForm compact />
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/55 transition-colors hover:text-white"
                >
                  {t("cta.whatsapp")} →
                </a>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/35">
                  {t("hero.trust2")}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 hidden h-full w-full border border-white/10 sm:block" />
          </div>
        </main>

        {/* Bottom rail */}
        <div className="absolute bottom-10 left-6 z-20 hidden items-center gap-10 text-[10px] uppercase tracking-[0.4em] text-white/35 sm:left-8 lg:left-16 lg:flex">
          <span>Frankenthal</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-white/15" />
          <span>Ludwigshafen</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-white/15" />
          <span>Mannheim</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-white/15" />
          <span>Heidelberg</span>
        </div>
      </section>

      <main className="flex-1">

        {/* SERVICES */}
        <section className="mx-auto max-w-[1600px] px-6 py-24 sm:px-8 lg:px-16 lg:py-36">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/45">
                <span className="h-px w-10 bg-white/25" />
                {t("services.subtitle")}
              </div>
              <h2 className="mt-5 font-display text-4xl italic text-white sm:text-6xl">{t("services.title")}</h2>
            </div>
            <a
              href="/services"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
            >
              {t("nav.services")} <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <ServiceCards />
        </section>

        {/* ABOUT */}
        <section className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:px-16 lg:py-36">
            <div className="relative">
              <img src={aboutImg} alt="Luxury car interior" loading="lazy" width={1280} height={960} className="object-cover grayscale-[15%]" style={{ boxShadow: "var(--shadow-elegant)" }} />
              <div className="absolute -bottom-6 -right-6 hidden border border-white/10 bg-card p-6 sm:block" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">5.0 · Uber Partner</div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/45">
                <span className="h-px w-10 bg-white/25" />
                {t("about.eyebrow")}
              </div>
              <h2 className="mt-5 font-display text-4xl italic text-white sm:text-6xl">{t("about.title")}</h2>
              <p className="mt-8 text-base leading-relaxed text-white/65">{t("about.p1")}</p>
              <p className="mt-4 text-base leading-relaxed text-white/65">{t("about.p2")}</p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  { v: "10+", l: t("about.stat1") },
                  { v: "2 000+", l: t("about.stat2") },
                  { v: "365", l: t("about.stat3") },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-display text-4xl italic text-white">{s.v}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/50">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mx-auto max-w-[1600px] px-6 py-24 sm:px-8 lg:px-16 lg:py-36">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="text-[10px] uppercase tracking-[0.5em] text-white/45">★ ★ ★ ★ ★</div>
            <h2 className="mt-5 font-display text-4xl italic text-white sm:text-6xl">{t("reviews.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {["review1", "review2", "review3"].map((k, i) => (
              <figure key={k} className="border border-white/10 bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-5 font-display text-xl italic leading-relaxed text-white/85">"{t(k)}"</blockquote>
                <figcaption className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">— {["M. Becker", "A. Schneider", "T. Wagner"][i]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8 lg:px-16 lg:py-36">
            <h2 className="text-center font-display text-4xl italic text-white sm:text-6xl">{t("faq.title")}</h2>
            <Accordion type="single" collapsible className="mt-10">
              {[1, 2, 3, 4].map((i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                    {t(`faq.q${i}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/65">{t(`faq.a${i}`)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-navy-deep">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-24 text-center sm:px-8 lg:py-32">
            <MapPin className="h-7 w-7 text-white/60" />
            <h2 className="font-display text-4xl italic text-white sm:text-6xl">{t("hero.title")}</h2>
            <p className="max-w-xl text-white/65">{t("hero.subtitle")}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-black transition hover:bg-white/85"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition hover:bg-white/5"
              >
                {t("cta.whatsapp")}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{label}</span>
      <span className="text-sm font-medium tracking-wide text-white">{value}</span>
    </div>
  );
}
