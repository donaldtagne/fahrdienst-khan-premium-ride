import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageLayout";
import { CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – Fahrdienst Khan" },
      { name: "description", content: "Informationen zum Umgang mit Ihren personenbezogenen Daten gemäß DSGVO." },
      { property: "og:url", content: "/datenschutz" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <PageLayout>
      <PageHero title="Datenschutzerklärung" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 space-y-6 text-foreground/80">
        <h2 className="font-display text-2xl text-foreground">1. Verantwortlicher</h2>
        <p>{CONTACT.name}, Kaulaverling 33, 67227 Frankenthal, Telefon: {CONTACT.phone}, E-Mail: {CONTACT.email}.</p>

        <h2 className="font-display text-2xl text-foreground">2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>Beim Besuch unserer Website werden automatisch Informationen vom Browser an unseren Server übermittelt und temporär in einem Logfile gespeichert (IP-Adresse, Datum, Uhrzeit, Browsertyp, Betriebssystem, Referrer). Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>

        <h2 className="font-display text-2xl text-foreground">3. Kontaktformular & Fahrtanfrage</h2>
        <p>Bei Nutzung unseres Formulars erheben wir die von Ihnen mitgeteilten Daten (Name, Telefonnummer, ggf. Abhol-/Zielort, Datum, Uhrzeit) ausschließlich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>

        <h2 className="font-display text-2xl text-foreground">4. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung. Beschwerden können Sie bei einer Datenschutz-Aufsichtsbehörde einreichen.</p>

        <h2 className="font-display text-2xl text-foreground">5. Google Maps</h2>
        <p>Diese Seite nutzt Google Maps zur Darstellung unseres Standorts. Anbieter ist Google Ireland Limited. Beim Aufruf wird Ihre IP-Adresse an Google übertragen.</p>
      </section>
    </PageLayout>
  );
}