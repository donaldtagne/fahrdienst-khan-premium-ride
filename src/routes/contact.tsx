import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { PageLayout, PageHero } from "@/components/site/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useI18n, CONTACT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt – Fahrdienst Khan Frankenthal" },
      { name: "description", content: "Kontaktieren Sie Fahrdienst Khan in Frankenthal – telefonisch, per WhatsApp oder über das Kontaktformular. 24/7 erreichbar." },
      { property: "og:title", content: "Kontakt – Fahrdienst Khan" },
      { property: "og:description", content: "Erreichen Sie uns 24/7 in Frankenthal." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const subject = encodeURIComponent("Anfrage über Website");
    const body = encodeURIComponent(`Name: ${data.name}\nTelefon: ${data.phone}\n\n${data.message}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    toast.success(t("booking.success"));
    (e.target as HTMLFormElement).reset();
    setSending(false);
  };

  return (
    <PageLayout>
      <PageHero eyebrow={t("contact.subtitle")} title={t("contact.title")} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <InfoCard icon={Phone} label={t("contact.phone")}>
            <a href={`tel:${CONTACT.phoneHref}`} className="text-lg font-medium text-navy hover:underline">{CONTACT.phone}</a>
          </InfoCard>
          <InfoCard icon={MapPin} label={t("contact.address")}>
            <p className="text-foreground/80">{CONTACT.address}</p>
          </InfoCard>
          <InfoCard icon={Mail} label="Email">
            <a href={`mailto:${CONTACT.email}`} className="text-navy hover:underline">{CONTACT.email}</a>
          </InfoCard>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps?q=Kaulaverling+33,+67227+Frankenthal,+Germany&output=embed"
              loading="lazy"
              className="h-72 w-full"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 sm:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="font-display text-2xl text-navy">{t("contact.write")}</h2>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("booking.name")}</Label>
              <Input id="name" name="name" required maxLength={100} />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("booking.phone")}</Label>
              <Input id="phone" name="phone" type="tel" required maxLength={30} />
            </div>
            <div>
              <Label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("contact.message")}</Label>
              <Textarea id="message" name="message" rows={5} required maxLength={1000} />
            </div>
            <Button type="submit" disabled={sending} className="w-full h-12 bg-navy text-primary-foreground hover:bg-navy-deep">
              <Send className="h-4 w-4" /> {t("contact.send")}
            </Button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}

function InfoCard({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}