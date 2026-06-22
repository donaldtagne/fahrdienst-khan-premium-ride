import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, FileText, Calendar, Users, Briefcase, Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { MobileCallBar } from "@/components/site/MobileCallBar";
import { PageHero } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { useI18n, CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/geschaeftskunden")({
  head: () => ({
    meta: [
      { title: "Geschäftskunden – Fahrdienst Khan Frankenthal" },
      { name: "description", content: "Premium Fahrdienst für Unternehmen: Rahmenverträge, Sammelrechnung mit MwSt., priorisierte Verfügbarkeit, fester Ansprechpartner." },
      { property: "og:title", content: "Geschäftskunden – Fahrdienst Khan" },
      { property: "og:description", content: "Maßgeschneiderte Mobilitätslösungen für Unternehmen, Konferenzen und Delegationen." },
    ],
    links: [{ rel: "canonical", href: "/geschaeftskunden" }],
  }),
  component: Geschaeftskunden,
});

function Geschaeftskunden() {
  const { t, lang } = useI18n();
  const features = [
    { icon: FileText, title: lang === "de" ? "Monatliche Sammelrechnung" : "Monthly consolidated invoice", desc: lang === "de" ? "Eine klare Rechnung pro Monat mit ausgewiesener MwSt. – passt direkt in Ihre Buchhaltung." : "One clear invoice per month with VAT – fits right into your bookkeeping." },
    { icon: Calendar, title: lang === "de" ? "Priorisierte Verfügbarkeit" : "Priority availability", desc: lang === "de" ? "Geschäftskunden werden bei Engpässen bevorzugt – auch kurzfristig." : "Business clients are prioritised even on short notice." },
    { icon: Users, title: lang === "de" ? "Fester Ansprechpartner" : "Dedicated contact", desc: lang === "de" ? "Eine Nummer, ein Gesicht, eine zuverlässige Abstimmung." : "One number, one face, reliable coordination." },
    { icon: Briefcase, title: lang === "de" ? "Rahmenvertrag & Konditionen" : "Framework contract & terms", desc: lang === "de" ? "Individuelle Konditionen ab regelmäßigem Fahrtaufkommen." : "Custom terms based on recurring volume." },
  ];
  const useCases = lang === "de"
    ? ["Flughafentransfers für Geschäftsreisen", "Pendelfahrten Büro ↔ Bahnhof / Hotel", "Konferenz- und Eventshuttle", "Empfang internationaler Gäste mit Namensschild", "Dauerfahrten für Geschäftsführung", "Kuriere für vertrauliche Dokumente"]
    : ["Airport transfers for business travel", "Shuttles office ↔ station / hotel", "Conference & event shuttle service", "Pickup of international guests with name sign", "Recurring rides for executives", "Courier for confidential documents"];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={lang === "de" ? "Für Unternehmen" : "For companies"}
          title={lang === "de" ? "Premium Mobilität für Geschäftskunden" : "Premium mobility for business clients"}
          subtitle={lang === "de"
            ? "Diskret, pünktlich, mit professioneller Abrechnung. Wir bewegen Ihr Team, Ihre Gäste und Ihre Dokumente in der Region Rhein-Neckar – und darüber hinaus."
            : "Discreet, punctual and professionally invoiced. We move your team, your guests and your documents in the Rhine-Neckar region – and beyond."}
        />

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.82_0.12_85)]/15 text-[oklch(0.82_0.12_85)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/5 bg-[oklch(0.09_0.025_260)]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">
                  — {lang === "de" ? "Einsatzbereiche" : "Use cases"}
                </div>
                <h2 className="mt-4 font-display text-4xl text-gradient-platinum sm:text-5xl">
                  {lang === "de" ? "Wofür Unternehmen uns buchen" : "Why companies book us"}
                </h2>
              </div>
              <ul className="space-y-3">
                {useCases.map((u) => (
                  <li key={u} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.82_0.12_85)]" />
                    <span className="text-sm text-foreground/85">{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-gradient-platinum sm:text-5xl">
            {lang === "de" ? "Lassen Sie uns sprechen" : "Let's talk"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {lang === "de"
              ? "Wir erstellen Ihnen ein individuelles Angebot innerhalb von 24 Stunden – kostenfrei und unverbindlich."
              : "We will send you a tailored proposal within 24 hours – free and without obligation."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
              <a href={`tel:${CONTACT.phoneHref}`}><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-foreground hover:bg-white/10">
              <a href={`mailto:${CONTACT.email}?subject=Geschäftskunden-Anfrage`}><Mail className="h-4 w-4" /> {CONTACT.email}</a>
            </Button>
            <Button asChild size="lg" className="h-12 rounded-full bg-[#25D366] px-6 text-white hover:bg-[#1DA851]">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">{t("cta.whatsapp")}</a>
            </Button>
          </div>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground">
            {lang === "de" ? "Kontaktseite öffnen" : "Open contact page"}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileCallBar />
    </div>
  );
}