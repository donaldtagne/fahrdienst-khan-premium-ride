import { Link } from "@tanstack/react-router";
import { Briefcase, FileText, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function BusinessSection() {
  const { t } = useI18n();
  const perks = [
    { icon: FileText, label: t("biz.perk1") },
    { icon: Calendar, label: t("biz.perk2") },
    { icon: Users, label: t("biz.perk3") },
    { icon: Briefcase, label: t("biz.perk4") },
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.18_0.05_260)] via-[oklch(0.13_0.035_260)] to-[oklch(0.10_0.025_260)] p-8 sm:p-12">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[oklch(0.82_0.12_85)]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[oklch(0.55_0.18_255)]/10 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">— {t("biz.eyebrow")}</div>
          <h3 className="mt-4 font-display text-4xl text-gradient-platinum sm:text-5xl">{t("biz.title")}</h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{t("biz.desc")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-[oklch(0.10_0.03_260)] hover:bg-white/90">
              <Link to="/geschaeftskunden">
                {t("biz.cta")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[oklch(0.82_0.12_85)]/15 text-[oklch(0.82_0.12_85)]">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-foreground/85">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}