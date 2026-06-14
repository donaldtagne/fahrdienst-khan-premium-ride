import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero } from "@/components/site/PageLayout";
import aboutImg from "@/assets/about-interior.png.asset.json";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Über uns – Fahrdienst Khan Frankenthal" },
      { name: "description", content: "Fahrdienst Khan: zuverlässiger, professioneller und kundenorientierter Premium-Fahrdienst in Frankenthal." },
      { property: "og:title", content: "Über Fahrdienst Khan" },
      { property: "og:description", content: "Ihr Premium-Chauffeur in Frankenthal und der Region Rhein-Neckar." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <PageLayout>
      <PageHero eyebrow={t("about.eyebrow")} title={t("about.title")} subtitle={t("about.p1")} />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <img src={aboutImg.url} alt="Luxury chauffeur interior" width={1280} height={960} loading="lazy" className="rounded-2xl object-cover" style={{ boxShadow: "var(--shadow-elegant)" }} />
        <div>
          <p className="text-base leading-relaxed text-muted-foreground">{t("about.p2")}</p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { v: "10+", l: t("about.stat1") },
              { v: "2 000+", l: t("about.stat2") },
              { v: "365", l: t("about.stat3") },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-3xl text-foreground">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}