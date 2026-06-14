import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, CalendarX2, MapPin, Phone, Users, StickyNote, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { useI18n, CONTACT } from "@/lib/i18n";
import { cancelReservation, getReservation } from "@/lib/reservations.functions";

export const Route = createFileRoute("/reservierung/$token")({
  head: () => ({
    meta: [
      { title: "Reservierung – Fahrdienst Khan" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ReservationPage,
});

function ReservationPage() {
  const { token } = Route.useParams();
  const { t, lang } = useI18n();
  const qc = useQueryClient();
  const fetchRes = useServerFn(getReservation);
  const cancelRes = useServerFn(cancelReservation);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservation", token],
    queryFn: () => fetchRes({ data: { token } }),
    retry: false,
  });

  const [confirming, setConfirming] = useState(false);

  const mutation = useMutation({
    mutationFn: () => cancelRes({ data: { token } }),
    onSuccess: () => {
      toast.success(t("res.cancelled"));
      qc.invalidateQueries({ queryKey: ["reservation", token] });
      setConfirming(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const locale = lang === "de" ? "de-DE" : "en-GB";

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t("res.backHome")}
          </Link>

          {isLoading && (
            <div className="rounded-2xl glass p-10 text-center text-sm text-muted-foreground">
              …
            </div>
          )}

          {error && (
            <div className="rounded-2xl glass p-10 text-center">
              <CalendarX2 className="mx-auto h-10 w-10 text-muted-foreground" />
              <h1 className="mt-4 font-display text-3xl text-foreground">{t("res.notFound")}</h1>
            </div>
          )}

          {data && (
            <div className="rounded-2xl glass p-8 sm:p-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">
                Fahrdienst Khan
              </div>
              <h1 className="mt-3 font-display text-4xl text-gradient-platinum sm:text-5xl">
                {t("res.title")}
              </h1>

              <StatusBadge status={data.status} t={t} />

              <dl className="mt-8 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-2">
                <Row icon={Clock} label={t("booking.date")}>
                  {new Date(data.pickup_at).toLocaleString(locale, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </Row>
                <Row icon={Users} label={t("booking.passengers")}>{data.passengers}</Row>
                <Row icon={MapPin} label={t("booking.pickup")}>{data.pickup}</Row>
                <Row icon={MapPin} label={t("booking.destination")}>{data.destination}</Row>
                <Row icon={Phone} label={t("booking.phone")}>{data.phone}</Row>
                {data.email && <Row icon={Phone} label="E-Mail">{data.email}</Row>}
                {data.notes && (
                  <div className="sm:col-span-2">
                    <Row icon={StickyNote} label={t("booking.notes")}>{data.notes}</Row>
                  </div>
                )}
              </dl>

              <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row">
                {data.status !== "cancelled" ? (
                  confirming ? (
                    <>
                      <Button
                        onClick={() => mutation.mutate()}
                        disabled={mutation.isPending}
                        className="flex-1 h-12 rounded-full bg-red-500/90 text-white hover:bg-red-500"
                      >
                        <XCircle className="h-4 w-4" />
                        {t("res.cancelConfirm")}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setConfirming(false)}
                        className="h-12 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
                      >
                        ✕
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setConfirming(true)}
                      variant="outline"
                      className="flex-1 h-12 rounded-full border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4" />
                      {t("res.cancelBtn")}
                    </Button>
                  )
                ) : null}
                <Button asChild className="flex-1 h-12 rounded-full bg-white text-[oklch(0.10_0.03_260)] hover:bg-white/90">
                  <a href={`tel:${CONTACT.phoneHref}`}>
                    <Phone className="h-4 w-4" /> {t("res.callUs")}
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-[11px] text-muted-foreground">
                {t("res.created")}: {new Date(data.created_at).toLocaleString(locale)}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.82_0.12_85)]" />
      <div>
        <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm text-foreground/90">{children}</dd>
      </div>
    </div>
  );
}

function StatusBadge({ status, t }: { status: string; t: (k: string) => string }) {
  const map: Record<string, { icon: React.ComponentType<{ className?: string }>; cls: string; label: string }> = {
    pending: { icon: Clock, cls: "bg-amber-500/15 text-amber-200 border-amber-500/30", label: t("res.status.pending") },
    confirmed: { icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30", label: t("res.status.confirmed") },
    cancelled: { icon: XCircle, cls: "bg-red-500/15 text-red-200 border-red-500/30", label: t("res.status.cancelled") },
  };
  const v = map[status] ?? map.pending;
  const Icon = v.icon;
  return (
    <div className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${v.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {v.label}
    </div>
  );
}