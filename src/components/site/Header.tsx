import { Link } from "@tanstack/react-router";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n, CONTACT } from "@/lib/i18n";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-gradient-to-br from-white/15 to-white/5 font-display text-lg font-semibold text-gradient-platinum">K</span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-foreground">Fahrdienst Khan</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Premium Chauffeur</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="hidden h-9 w-9 items-center justify-center rounded-full glass sm:flex"
            aria-label="Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="hidden items-center rounded-full glass p-0.5 text-xs font-medium sm:flex">
            <button
              onClick={() => setLang("de")}
              className={`rounded-full px-2.5 py-1 transition ${lang === "de" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              DE
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
          </div>

          <Button asChild size="sm" className="hidden h-10 rounded-full bg-foreground px-4 text-background hover:bg-foreground/90 sm:inline-flex">
            <a href={`tel:${CONTACT.phoneHref}`}>
              <Phone className="h-4 w-4" />
              {t("cta.call")}
            </a>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md glass md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-white/5"
                activeProps={{ className: "bg-white/5 text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <div className="flex items-center rounded-full glass p-0.5 text-xs">
                <button
                  onClick={() => setLang("de")}
                  className={`rounded-full px-3 py-1 ${lang === "de" ? "bg-white text-[oklch(0.10_0.03_260)]" : "text-muted-foreground"}`}
                >
                  Deutsch
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-full px-3 py-1 ${lang === "en" ? "bg-white text-[oklch(0.10_0.03_260)]" : "text-muted-foreground"}`}
                >
                  English
                </button>
              </div>
              <Button asChild size="sm" className="rounded-full bg-white text-[oklch(0.10_0.03_260)]">
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