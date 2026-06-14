import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageLayout";
import { ServiceCards } from "@/components/site/Services";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Leistungen – Fahrdienst Khan Frankenthal" },
      { name: "description", content: "Flughafentransfer, Krankenfahrten, Kurierdienste, Firmenfahrten und private Personenbeförderung in Frankenthal und Rhein-Neckar." },
      { property: "og:title", content: "Unsere Leistungen – Fahrdienst Khan" },
      { property: "og:description", content: "Premium Fahrdienst Leistungen in Frankenthal." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  return (
    <PageLayout>
      <PageHero eyebrow={t("services.subtitle")} title={t("services.title")} subtitle={t("hero.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ServiceCards />
      </section>
    </PageLayout>
  );
}