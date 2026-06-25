import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useI18n, CONTACT } from "@/lib/i18n";
import logoAsset from "@/assets/logo-fahrdienst-khan.png.asset.json";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-white/10 bg-[oklch(0.06_0.02_260)] text-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.12_85_/_0.5)] to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center">
            <img
              src={logoAsset.url}
              alt="Fahrdienst Khan Logo"
              className="h-16 w-auto object-contain"
            />
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
            <li><Link to="/strecken" className="hover:text-foreground">{t("nav.routes")}</Link></li>
            <li><Link to="/geschaeftskunden" className="hover:text-foreground">{t("nav.business")}</Link></li>
            <li><Link to="/impressum" className="hover:text-foreground">{t("footer.impressum")}</Link></li>
            <li><Link to="/datenschutz" className="hover:text-foreground">{t("footer.privacy")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Fahrdienst Khan. {t("footer.rights")}
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{t("footer.payment")}</span>
            <div className="flex items-center gap-3">
              {/* Mastercard */}
              <svg viewBox="0 0 38 24" width="38" height="24" className="rounded" aria-label="Mastercard">
                <rect width="38" height="24" rx="4" fill="#1a1a1a"/>
                <circle cx="15" cy="12" r="7" fill="#eb001b" opacity="0.9"/>
                <circle cx="23" cy="12" r="7" fill="#f79e1b" opacity="0.9"/>
                <path d="M19 6.5a7 7 0 0 1 0 11 7 7 0 0 1 0-11z" fill="#ff5f00"/>
              </svg>
              {/* Visa */}
              <svg viewBox="0 0 38 24" width="38" height="24" className="rounded" aria-label="Visa">
                <rect width="38" height="24" rx="4" fill="#1a1a1a"/>
                <text x="6" y="17" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fontStyle="italic" fill="#fff">VISA</text>
              </svg>
              {/* PayPal */}
              <svg viewBox="0 0 38 24" width="38" height="24" className="rounded" aria-label="PayPal">
                <rect width="38" height="24" rx="4" fill="#1a1a1a"/>
                <text x="4" y="16" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#fff">Pay</text>
                <text x="20" y="16" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#009cde">Pal</text>
              </svg>
              {/* Cash / Bar */}
              <div className="flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] font-semibold text-foreground/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                Bar
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}