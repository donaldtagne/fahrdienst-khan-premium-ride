import { ShieldCheck, FileCheck2, BadgeCheck, Clock4, CreditCard, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function TrustBadges() {
  const { t } = useI18n();
  const items = [
    { icon: ShieldCheck, title: t("trust.insurance.t"), desc: t("trust.insurance.d") },
    { icon: FileCheck2, title: t("trust.license.t"), desc: t("trust.license.d") },
    { icon: BadgeCheck, title: t("trust.uber.t"), desc: t("trust.uber.d") },
    { icon: Clock4, title: t("trust.247.t"), desc: t("trust.247.d") },
    { icon: CreditCard, title: t("trust.pay.t"), desc: t("trust.pay.d") },
    { icon: Award, title: t("trust.exp.t"), desc: t("trust.exp.d") },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-[oklch(0.82_0.12_85)]/40 hover:bg-white/[0.05]"
        >
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[oklch(0.82_0.12_85)]/5 blur-2xl transition-opacity group-hover:opacity-100" />
          <div className="relative flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[oklch(0.82_0.12_85)]/15 text-[oklch(0.82_0.12_85)]">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg text-foreground">{title}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}