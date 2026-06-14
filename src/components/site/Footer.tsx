import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n, CONTACT } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary-foreground/10 font-display text-lg">K</span>
            <div className="font-display text-xl">Fahrdienst Khan</div>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">{t("footer.tagline")}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Uber Partner
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            {t("nav.contact")}
          </div>
          <ul className="space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-primary-foreground">{CONTACT.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary-foreground">{CONTACT.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            {t("footer.legal")}
          </div>
          <ul className="space-y-3 text-sm text-primary-foreground/85">
            <li><Link to="/impressum" className="hover:text-primary-foreground">{t("footer.impressum")}</Link></li>
            <li><Link to="/datenschutz" className="hover:text-primary-foreground">{t("footer.privacy")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Fahrdienst Khan. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}