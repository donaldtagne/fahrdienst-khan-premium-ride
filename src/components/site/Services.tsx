import { Plane, HeartPulse, Package, Users, Briefcase, Building2, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n, CONTACT } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [openKey, setOpenKey] = useState<(typeof SERVICE_KEYS)[number] | null>(null);
  const ActiveIcon = openKey ? ICONS[openKey] : null;
  return (
    <>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICE_KEYS.map((k, i) => {
        const Icon = ICONS[k];
        return (
          <motion.button
            type="button"
            onClick={() => setOpenKey(k)}
            key={k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl glass p-8 text-left transition-all duration-500 hover:-translate-y-2 hover:border-white/25 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                {t("service.detailsHint")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>

    <Dialog open={openKey !== null} onOpenChange={(o) => !o && setOpenKey(null)}>
      <DialogContent className="max-w-lg">
        {openKey && ActiveIcon && (
          <>
            <DialogHeader>
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0">
                <ActiveIcon className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <DialogTitle className="font-display text-2xl">{t(`service.${openKey}.title`)}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                {t(`service.${openKey}.desc`)}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("service.howTitle")}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {t(`service.${openKey}.how`)}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button asChild className="flex-1">
                <a href={`tel:${CONTACT.phoneHref}`}>
                  <Phone className="h-4 w-4" /> {t("service.ctaCall")}
                </a>
              </Button>
              <Button asChild className="flex-1 bg-[#25D366] text-white hover:bg-[#1DA851]">
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> {t("service.ctaWhatsapp")}
                </a>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}