import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.55_0.2_255_/_0.25)] blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.6_0.18_280_/_0.18)] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.12_85)]" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-5xl leading-[1.05] text-gradient-platinum sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}