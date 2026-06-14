import { Plane, HeartPulse, Package, Users, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const SERVICE_KEYS = ["airport", "medical", "courier", "private", "business"] as const;

const ICONS = {
  airport: Plane,
  medical: HeartPulse,
  courier: Package,
  private: Users,
  business: Briefcase,
} as const;

export function ServiceCards() {
  const { t } = useI18n();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_KEYS.map((k) => {
        const Icon = ICONS[k];
        return (
          <div
            key={k}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-navy/30"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full bg-navy/5 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl text-navy">{t(`service.${k}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`service.${k}.desc`)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}