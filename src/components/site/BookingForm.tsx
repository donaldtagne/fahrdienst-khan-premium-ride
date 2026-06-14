import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useI18n, CONTACT } from "@/lib/i18n";
import { Send } from "lucide-react";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const label = lang === "de" ? "Fahrtanfrage" : "Ride request";
    const msg = `*${label} – Fahrdienst Khan*\n\n` +
      `${t("booking.name")}: ${data.name || "-"}\n` +
      `${t("booking.phone")}: ${data.phone || "-"}\n` +
      `${t("booking.pickup")}: ${data.pickup || "-"}\n` +
      `${t("booking.destination")}: ${data.destination || "-"}\n` +
      `${t("booking.date")}: ${data.date || "-"} ${data.time || ""}\n` +
      `${t("booking.passengers")}: ${data.passengers || "1"}\n` +
      (data.notes ? `${t("booking.notes")}: ${data.notes}\n` : "");

    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(t("booking.success"));
    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  };

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
      {!compact && (
        <div>
          <Label htmlFor="notes" className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("booking.notes")}
          </Label>
          <Textarea id="notes" name="notes" rows={3} maxLength={500} className="rounded-lg border-white/10 bg-white/5 text-foreground focus-visible:border-white/30 focus-visible:ring-white/20" />
        </div>
      )}
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