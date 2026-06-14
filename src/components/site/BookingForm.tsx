import { useState } from "react";
import { toast } from "sonner";
import { useI18n, CONTACT } from "@/lib/i18n";

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
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label={t("booking.pickup")} name="pickup" required placeholder="Frankenthal …" />
        <Field label={t("booking.destination")} name="destination" required placeholder="Flughafen Frankfurt …" />
      </div>
      <div className="grid gap-7 sm:grid-cols-3">
        <Field label={t("booking.date")} name="date" type="date" required />
        <Field label={t("booking.time")} name="time" type="time" required />
        <Field label={t("booking.passengers")} name="passengers" type="number" min="1" max="8" defaultValue="1" required />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label={t("booking.name")} name="name" required maxLength={100} />
        <Field label={t("booking.phone")} name="phone" type="tel" required maxLength={30} />
      </div>
      {!compact && (
        <Field label={t("booking.notes")} name="notes" />
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] text-black transition-all hover:bg-white/85 disabled:opacity-60"
      >
        {t("booking.submit")}
      </button>
    </form>
  );
}

function Field({
  label, name, type = "text", ...rest
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="block text-[9px] font-medium uppercase tracking-[0.3em] text-white/45 transition-colors group-focus-within:text-white"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        {...rest}
        className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
      />
    </div>
  );
}