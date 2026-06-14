import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n, CONTACT } from "@/lib/i18n";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-navy text-primary-foreground font-display text-lg font-semibold">K</span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-navy">Fahrdienst Khan</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Premium Chauffeur</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-navy"
              activeProps={{ className: "text-navy" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border/70 p-0.5 text-xs font-medium sm:flex">
            <button
              onClick={() => setLang("de")}
              className={`rounded-full px-2.5 py-1 transition ${lang === "de" ? "bg-navy text-primary-foreground" : "text-muted-foreground"}`}
            >
              DE
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition ${lang === "en" ? "bg-navy text-primary-foreground" : "text-muted-foreground"}`}
            >
              EN
            </button>
          </div>

          <Button asChild size="sm" className="hidden bg-navy text-primary-foreground hover:bg-navy-deep sm:inline-flex">
            <a href={`tel:${CONTACT.phoneHref}`}>
              <Phone className="h-4 w-4" />
              {t("cta.call")}
            </a>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
                activeProps={{ className: "bg-muted text-navy" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-3">
              <div className="flex items-center rounded-full border border-border/70 p-0.5 text-xs">
                <button
                  onClick={() => setLang("de")}
                  className={`rounded-full px-3 py-1 ${lang === "de" ? "bg-navy text-primary-foreground" : "text-muted-foreground"}`}
                >
                  Deutsch
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-full px-3 py-1 ${lang === "en" ? "bg-navy text-primary-foreground" : "text-muted-foreground"}`}
                >
                  English
                </button>
              </div>
              <Button asChild size="sm" className="bg-navy text-primary-foreground">
                <a href={`tel:${CONTACT.phoneHref}`}>
                  <Phone className="h-4 w-4" /> {t("cta.call")}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}