import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Shield, Star, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about.jpg";
import rav4Day from "@/assets/rav4-day.jpg.asset.json";
import rav4Night from "@/assets/rav4-night.jpg.asset.json";
import rav4Airport from "@/assets/rav4-airport.jpg.asset.json";
import rav4Cabin from "@/assets/rav4-cabin.jpg.asset.json";
import rav4Interior from "@/assets/rav4-interior.jpg.asset.json";

import rav4FrontSeats from "@/assets/rav4-front-seats.jpg.asset.json";
import rav4ServiceNight from "@/assets/rav4-service-night.png.asset.json";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { BookingForm } from "@/components/site/BookingForm";
import { ServiceCards } from "@/components/site/Services";
import { Particles } from "@/components/site/Particles";
import { CountUp } from "@/components/site/CountUp";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { PriceCalculator } from "@/components/site/PriceCalculator";
import { PopularRoutes } from "@/components/site/PopularRoutes";
import { TrustBadges } from "@/components/site/TrustBadges";
import { ServiceArea } from "@/components/site/ServiceArea";
import { BusinessSection } from "@/components/site/BusinessSection";
import { MobileCallBar } from "@/components/site/MobileCallBar";
import { Link } from "@tanstack/react-router";
import { useI18n, CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fahrdienst Khan – Premium Chauffeur & Taxi Frankenthal" },
      { name: "description", content: "Premium Fahrdienst Frankenthal: Flughafentransfer, Business Travel, Krankenfahrten, Privater Chauffeur. Diskret, pünktlich, 24/7. ☎ +49 174 3262459" },
      { name: "keywords", content: "Taxi Frankenthal, Fahrdienst Frankenthal, Flughafentransfer Frankenthal, Airport Transfer Frankenthal, Krankenfahrten Frankenthal, Business Transport Frankenthal, Chauffeur Frankenthal" },
      { property: "og:title", content: "Fahrdienst Khan – Premium Chauffeur Frankenthal" },
      { property: "og:description", content: "Premium Fahrdienst Frankenthal – Flughafentransfer, Business Travel, Krankenfahrten." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: rav4Day.url, fetchpriority: "high" },
    ],
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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <Header />
      <main className="flex-1">
        {/* HERO — cinematic */}
        <section ref={heroRef} className="relative min-h-[65vh] sm:min-h-[75vh] md:min-h-screen w-full overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
            <HeroSlideshow images={[rav4Day.url, rav4Night.url, rav4Airport.url, rav4ServiceNight.url]} />
          </motion.div>
          {/* gradients — softer so passengers/faces stay visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.025_260_/_0.15)] via-[oklch(0.08_0.025_260_/_0.35)] to-[oklch(0.08_0.025_260_/_0.92)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.025_260_/_0.7)] via-transparent to-transparent" />
          {/* vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, oklch(0.05 0.02 260 / 0.45) 100%)" }} />
          {/* ambient particles */}
          <Particles density={70} />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8">
            <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-foreground/90"
              >
                <Sparkles className="h-3 w-3 text-[oklch(0.82_0.12_85)]" />
                {t("hero.eyebrow")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-display text-5xl leading-[1.02] text-gradient-platinum sm:text-6xl lg:text-7xl xl:text-[88px]"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <Button asChild size="lg" className="h-13 rounded-full bg-white px-7 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
                  <a href="#booking">
                    {t("nav.book")} <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="attention-pulse h-13 rounded-full border-white/25 bg-white/5 px-7 text-foreground backdrop-blur hover:bg-white/10">
                  <a href={`tel:${CONTACT.phoneHref}`}>
                    <Phone className="h-4 w-4" /> {t("cta.call")}
                  </a>
                </Button>
                <Button asChild size="lg" className="h-13 rounded-full bg-[#25D366] px-7 text-white hover:bg-[#1DA851]">
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    {t("cta.whatsapp")}
                  </a>
                </Button>
              </motion.div>

              {/* trust strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.85 }}
                className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-7"
              >
                {[
                  { icon: Clock, text: t("hero.trust1") },
                  { icon: Shield, text: t("hero.trust2") },
                  { icon: Star, text: t("hero.trust3") },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 text-[oklch(0.82_0.12_85)]" strokeWidth={1.4} />
                    <span className="text-xs leading-tight text-foreground/75 sm:text-sm">{text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/50 lg:flex"
            >
              <span>{t("hero.scroll")}</span>
              <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* MARQUEE / SERVICES INTRO STRIP */}
        <section className="relative border-y border-white/5 bg-[oklch(0.10_0.03_260)] py-6 overflow-hidden">
          <div className="group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-x-10 whitespace-nowrap px-5 text-[10px] uppercase tracking-[0.28em] text-foreground/50 sm:text-[11px]">
              {["Airport Transfer","Business Travel","Medical Transport","Private Chauffeur","Corporate"].concat(["Airport Transfer","Business Travel","Medical Transport","Private Chauffeur","Corporate"]).map((s, idx) => (
                <span key={idx} className="flex items-center gap-x-10">
                  <span>{s}</span>
                  <span className="text-[oklch(0.82_0.12_85)]">·</span>
                </span>
              ))}
            </div>
            <div aria-hidden className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-x-10 whitespace-nowrap px-5 text-[10px] uppercase tracking-[0.28em] text-foreground/50 sm:text-[11px]">
              {["Airport Transfer","Business Travel","Medical Transport","Private Chauffeur","Corporate","Airport Transfer","Business Travel","Medical Transport","Private Chauffeur","Corporate"].map((s, idx) => (
                <span key={idx} className="flex items-center gap-x-10">
                  <span>{s}</span>
                  <span className="text-[oklch(0.82_0.12_85)]">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("services.subtitle")}</div>
              <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("services.title")}</h2>
            </Reveal>
            <Button asChild variant="ghost" className="rounded-full border border-white/10 px-5 text-foreground hover:bg-white/5">
              <a href="/services">{t("nav.services")} <ChevronRight className="h-4 w-4" /></a>
            </Button>
          </div>
          <ServiceCards limit={3} />
        </section>

        {/* WHY / STATS */}
        <section className="relative border-y border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <Reveal>
              <div className="text-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("why.subtitle")}</div>
                <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("why.title")}</h2>
              </div>
            </Reveal>
            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                { v: 10, suf: "+", l: t("about.stat1") },
                { v: 24, suf: "/7", l: t("about.stat3") },
                { v: 100, suf: "%", l: t("hero.trust2") },
                { v: 2000, suf: "+", l: t("about.stat4") },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-2xl glass p-8 text-center">
                    <div className="font-display text-5xl text-gradient-silver sm:text-6xl">
                      <CountUp to={s.v} suffix={s.suf} />
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FLEET SHOWCASE */}
        <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[oklch(0.6_0.18_255_/_0.3)] to-transparent blur-2xl" />
                <img
                  src={rav4FrontSeats.url}
                  alt="Toyota RAV4 Vorderer Innenraum"
                  width={1280}
                  height={1280}
                  loading="lazy"
                  className="relative rounded-3xl border border-white/10 object-cover shadow-elegant"
                  style={{ boxShadow: "var(--shadow-elegant)" }}
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex h-full flex-col justify-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("fleet.subtitle")}</div>
                <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("fleet.title")}</h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{t("fleet.desc")}</p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Toyota RAV4 Hybrid · Premium SUV",
                    "Premium Lederinterieur · Ambientebeleuchtung",
                    "WLAN · Wasser · Tageszeitungen auf Wunsch",
                    "Höchste Hygiene- & Sicherheitsstandards",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.82_0.12_85)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRICE CALCULATOR + POPULAR ROUTES */}
        <section className="relative border-y border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <Reveal>
              <div className="mb-12 text-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("routes.subtitle")}</div>
                <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("routes.title")}</h2>
              </div>
            </Reveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
              <Reveal>
                <PriceCalculator />
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <PopularRoutes limit={6} />
                  <div className="mt-6 text-center">
                    <Button asChild variant="ghost" className="rounded-full border border-white/10 px-5 text-foreground hover:bg-white/5">
                      <Link to="/strecken">
                        {t("routes.viewAll")} <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <Reveal>
            <div className="mb-14 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("trust.eyebrow")}</div>
              <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("trust.title")}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <TrustBadges />
          </Reveal>
        </section>

        {/* SERVICE AREA */}
        <section className="relative border-y border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <Reveal>
              <ServiceArea />
            </Reveal>
          </div>
        </section>

        {/* BUSINESS */}
        <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Reveal>
            <BusinessSection />
          </Reveal>
        </section>

        {/* ABOUT band */}
        <section className="relative border-y border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <Reveal>
              <div className="text-center">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("about.eyebrow")}</div>
                <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("about.title")}</h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{t("about.p1")}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{t("about.p2")}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— ★★★★★</div>
              <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("reviews.title")}</h2>
              <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-foreground/80">
                <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.2 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
                </svg>
                <span className="font-semibold">5,0</span>
                <span className="text-[oklch(0.82_0.12_85)] tracking-widest">★★★★★</span>
                <span className="text-foreground/60">· Google Bewertungen</span>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { key: "review1", name: "Markus Becker", initials: "MB", color: "#1a73e8", when: "vor 2 Wochen", reviews: 14, photo: "https://i.pravatar.cc/128?img=12" },
              { key: "review2", name: "Anna Schneider", initials: "AS", color: "#e8710a", when: "vor 1 Monat", reviews: 7, photo: "https://i.pravatar.cc/128?img=47" },
              { key: "review3", name: "Thomas Wagner", initials: "TW", color: "#188038", when: "vor 3 Monaten", reviews: 22, photo: "https://i.pravatar.cc/128?img=33" },
            ].map((r, i) => (
              <Reveal key={r.key} delay={i * 0.1}>
                <figure className="relative flex h-full flex-col rounded-2xl glass p-7">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.photo}
                      alt={r.name}
                      loading="lazy"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const next = t.nextElementSibling as HTMLElement | null;
                        if (next) next.style.display = "flex";
                      }}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
                    />
                    <div
                      className="hidden h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ring-2 ring-white/10"
                      style={{ backgroundColor: r.color }}
                      aria-hidden="true"
                    >
                      {r.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-foreground/95">{r.name}</p>
                        <span className="text-[10px] text-foreground/50">· Local Guide</span>
                      </div>
                      <p className="text-xs text-foreground/55">{r.reviews} Rezensionen</p>
                    </div>
                    <svg className="h-5 w-5 shrink-0 opacity-90" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.2 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-[oklch(0.82_0.12_85)]">
                      {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                    </div>
                    <span className="text-xs text-foreground/55">{r.when}</span>
                  </div>
                  <blockquote className="mt-3 text-[15px] leading-relaxed text-foreground/85">{t(r.key)}</blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="relative border-y border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-8 lg:py-32">
            <Reveal>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("booking.subtitle")}</div>
                <h2 className="mt-4 font-display text-5xl text-gradient-platinum sm:text-6xl">{t("booking.title")}</h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                  {t("hero.subtitle")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="attention-pulse h-12 rounded-full bg-white px-6 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
                    <a href={`tel:${CONTACT.phoneHref}`}><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
                  </Button>
                  <Button asChild size="lg" className="h-12 rounded-full bg-[#25D366] px-6 text-white hover:bg-[#1DA851]">
                    <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">{t("cta.whatsapp")}</a>
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl glass-strong p-7 sm:p-9" style={{ boxShadow: "var(--shadow-elegant)" }}>
                <BookingForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <Reveal>
            <h2 className="text-center font-display text-5xl text-gradient-platinum sm:text-6xl">{t("faq.title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="mt-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                    {t(`faq.q${i}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{t(`faq.a${i}`)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden border-t border-white/5 bg-[oklch(0.06_0.02_260)]">
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <Particles density={40} />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-36">
            <MapPin className="h-8 w-8 text-[oklch(0.82_0.12_85)]" />
            <Reveal>
              <h2 className="font-display text-5xl text-gradient-platinum sm:text-6xl">{t("hero.title")}</h2>
            </Reveal>
            <p className="max-w-xl text-foreground/70">{CONTACT.address}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="attention-pulse h-13 rounded-full bg-white px-7 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
                <a href={`tel:${CONTACT.phoneHref}`}><Phone className="h-5 w-5" /> {CONTACT.phone}</a>
              </Button>
              <Button asChild size="lg" className="h-13 rounded-full bg-[#25D366] px-7 text-white hover:bg-[#1DA851]">
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}