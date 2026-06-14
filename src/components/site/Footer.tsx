import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n, CONTACT } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-white/10 bg-[oklch(0.06_0.02_260)] text-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.12_85_/_0.5)] to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/5 font-display text-lg text-gradient-platinum">K</span>
            <div className="font-display text-xl text-gradient-platinum">Fahrdienst Khan</div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.22em] text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Uber Partner
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t("nav.contact")}
          </div>
          <ul className="space-y-3 text-sm text-foreground/85">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-foreground">{CONTACT.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">{CONTACT.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {t("footer.legal")}
          </div>
          <ul className="space-y-3 text-sm text-foreground/85">
            <li><Link to="/impressum" className="hover:text-foreground">{t("footer.impressum")}</Link></li>
            <li><Link to="/datenschutz" className="hover:text-foreground">{t("footer.privacy")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Fahrdienst Khan. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}