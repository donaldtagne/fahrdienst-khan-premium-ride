import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n, CONTACT } from "@/lib/i18n";

export function Header({ transparent = false }: { transparent?: boolean }) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl"
      }
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-6 sm:px-8 lg:px-16">
        <Link to="/" className="flex items-center gap-4 shrink-0">
          <span className="grid h-11 w-11 place-items-center border border-white/15 bg-white/5 backdrop-blur font-display italic text-lg text-white">
            K
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[11px] font-semibold tracking-[0.32em] uppercase text-white">Fahrdienst Khan</span>
            <span className="mt-1.5 text-[9px] tracking-[0.4em] uppercase text-white/45">Premium Chauffeur</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-12 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white"
              activeProps={{ className: "text-white border-b border-white/40 pb-1" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden items-center overflow-hidden rounded-full border border-white/10 text-[9px] font-bold tracking-widest sm:flex">
            <button
              onClick={() => setLang("de")}
              className={`px-4 py-2 transition ${lang === "de" ? "bg-white text-black" : "text-white/55 hover:text-white"}`}
            >
              DE
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 transition ${lang === "en" ? "bg-white text-black" : "text-white/55 hover:text-white"}`}
            >
              EN
            </button>
          </div>

          <a
            href={`tel:${CONTACT.phoneHref}`}
            className="hidden bg-white px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.24em] text-black transition-all hover:bg-white/85 sm:inline-flex"
          >
            {t("cta.call")}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-white/15 text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70 hover:text-white"
                activeProps={{ className: "text-white" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/5 pt-3">
              <div className="flex items-center overflow-hidden rounded-full border border-white/10 text-[10px] font-bold tracking-widest">
                <button
                  onClick={() => setLang("de")}
                  className={`px-4 py-1.5 ${lang === "de" ? "bg-white text-black" : "text-white/55"}`}
                >
                  DE
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-4 py-1.5 ${lang === "en" ? "bg-white text-black" : "text-white/55"}`}
                >
                  EN
                </button>
              </div>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-black"
              >
                {t("cta.call")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}