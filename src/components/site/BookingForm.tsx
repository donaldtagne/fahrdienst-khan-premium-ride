import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useI18n, CONTACT } from "@/lib/i18n";
import { Send, Check, Copy, ExternalLink, CalendarCheck } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { createReservation } from "@/lib/reservations.functions";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const submit = useServerFn(createReservation);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const sendWhatsapp = (fd.get("send_whatsapp") as string | null) === "on";
    const recurring = (fd.get("recurring") as string | null) === "on";
    const flight = (data.flight || "").trim();

    const extraNotes = [
      flight ? `Flugnummer: ${flight}` : "",
      recurring ? "Wiederkehrende Fahrt erwünscht" : "",
    ].filter(Boolean).join(" · ");
    const combinedNotes = [data.notes || "", extraNotes].filter(Boolean).join("\n");

    try {
      const res = await submit({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email || "",
          pickup: data.pickup,
          destination: data.destination,
          pickup_at: `${data.date}T${data.time}`,
          passengers: Number(data.passengers || 1),
          notes: combinedNotes,
        },
      });
      const url = `${window.location.origin}/reservierung/${res.token}`;
      setResult({ url });
      toast.success(t("booking.reserved"));

      if (sendWhatsapp) {
        const label = lang === "de" ? "Fahrtanfrage" : "Ride request";
        const msg = `*${label} – Fahrdienst Khan*\n\n` +
          `${t("booking.name")}: ${data.name}\n` +
          `${t("booking.phone")}: ${data.phone}\n` +
          `${t("booking.pickup")}: ${data.pickup}\n` +
          `${t("booking.destination")}: ${data.destination}\n` +
          `${t("booking.date")}: ${data.date} ${data.time}\n` +
          `${t("booking.passengers")}: ${data.passengers || "1"}\n` +
          (data.notes ? `${t("booking.notes")}: ${data.notes}\n` : "") +
          `\n${t("booking.openLink")}: ${url}`;
        window.open(
          `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`,
          "_blank",
          "noopener,noreferrer",
        );
      }
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : t("booking.error");
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.82_0.12_85)]/20 text-[oklch(0.82_0.12_85)]">
          <CalendarCheck className="h-7 w-7" />
        </div>
        <div>
          <h3 className="font-display text-2xl text-foreground">{t("booking.reserved")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("booking.reservedDesc")}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-left">
          <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("booking.yourLink")}
          </div>
          <div className="break-all text-xs text-foreground/90">{result.url}</div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-11 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(result.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              } catch {/* ignore */}
            }}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? t("booking.copied") : t("booking.copyLink")}
          </Button>
          <Button asChild className="flex-1 h-11 rounded-full bg-white text-[oklch(0.10_0.03_260)] hover:bg-white/90">
            <a href={result.url}>
              <ExternalLink className="h-4 w-4" />
              {t("booking.openLink")}
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("booking.pickup")} name="pickup" required placeholder="Frankenthal, ..." />
        <Field label={t("booking.destination")} name="destination" required placeholder="Flughafen Frankfurt" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={t("booking.date")} name="date" type="date" required />
        <Field label={t("booking.time")} name="time" type="time" required />
        <Field label={t("booking.passengers")} name="passengers" type="number" min="1" max="8" defaultValue="1" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("booking.name")} name="name" required maxLength={100} />
        <Field label={t("booking.phone")} name="phone" type="tel" required maxLength={30} />
      </div>
      <Field label={t("booking.email")} name="email" type="email" maxLength={200} />
      <Field label={t("booking.flight")} name="flight" placeholder="LH 1234" maxLength={20} />
      {!compact && (
        <div>
          <Label htmlFor="notes" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("booking.notes")}
          </Label>
          <Textarea id="notes" name="notes" rows={3} maxLength={500} className="rounded-lg border-white/10 bg-white/5 text-foreground focus-visible:border-white/30 focus-visible:ring-white/20" />
        </div>
      )}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          name="recurring"
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[oklch(0.82_0.12_85)]"
        />
        {t("booking.recurring")}
      </label>
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          name="send_whatsapp"
          defaultChecked
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[oklch(0.82_0.12_85)]"
        />
        {t("booking.alsoWhatsapp")}
      </label>
      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-12 rounded-full bg-white text-[oklch(0.10_0.03_260)] hover:bg-white/90 text-base font-medium"
      >
        <Send className="h-4 w-4" />
        {t("booking.submit")}
      </Button>
    </form>
  );
}

function Field({
  label, name, type = "text", ...rest
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={name} className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </Label>
      <Input id={name} name={name} type={type} className="h-11 rounded-lg border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-white/30 focus-visible:ring-white/20" {...rest} />
    </div>
  );
}