import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageLayout";
import { CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – Fahrdienst Khan" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG." },
      { property: "og:url", content: "/impressum" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <PageLayout>
      <PageHero title="Impressum" />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 space-y-4 text-foreground/80">
        <h2 className="font-display text-2xl text-navy">Angaben gemäß § 5 TMG</h2>
        <p>
          {CONTACT.name}<br />
          Kaulaverling 33<br />
          67227 Frankenthal<br />
          Deutschland
        </p>
        <h3 className="font-display text-xl text-navy pt-4">Kontakt</h3>
        <p>
          Telefon: <a href={`tel:${CONTACT.phoneHref}`} className="text-navy underline">{CONTACT.phone}</a><br />
          E-Mail: <a href={`mailto:${CONTACT.email}`} className="text-navy underline">{CONTACT.email}</a>
        </p>
        <h3 className="font-display text-xl text-navy pt-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>{CONTACT.name}, Kaulaverling 33, 67227 Frankenthal</p>
        <h3 className="font-display text-xl text-navy pt-4">Haftungsausschluss</h3>
        <p className="text-sm text-muted-foreground">
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        </p>
      </section>
    </PageLayout>
  );
}