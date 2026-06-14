import { Plane, HeartPulse, Package, Users, Briefcase, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const SERVICE_KEYS = ["airport", "business", "medical", "courier", "private", "corporate"] as const;

const ICONS = {
  airport: Plane,
  medical: HeartPulse,
  courier: Package,
  private: Users,
  business: Briefcase,
  corporate: Building2,
} as const;

export function ServiceCards() {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_KEYS.map((k, i) => {
        const Icon = ICONS[k];
        return (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/25"
          >
            {/* glow */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.6 0.18 255 / 0.18), transparent 60%)" }} />
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-white/5 blur-2xl transition-transform duration-700 group-hover:scale-150" />
            <div className="relative">
              <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 text-foreground transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(150,190,255,0.4)]">
                <Icon className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <h3 className="mt-6 font-display text-2xl text-gradient-platinum">{t(`service.${k}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`service.${k}.desc`)}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}