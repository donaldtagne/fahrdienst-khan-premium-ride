import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Lock, MapPin, Phone, Unlock, Users, XCircle, Search, RefreshCw } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { listReservations, updateReservationStatus } from "@/lib/reservations.functions";

export const Route = createFileRoute("/reservierungen")({
  head: () => ({
    meta: [
      { title: "Reservierungen – Fahrdienst Khan" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ReservationsAdminPage,
});

function ReservationsAdminPage() {
  const { t, lang } = useI18n();
  const qc = useQueryClient();
  const [pin, setPin] = useState("");
  const [authPin, setAuthPin] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("admin_pin") : null
  );
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const fetchList = useServerFn(listReservations);
  const updateStatus = useServerFn(updateReservationStatus);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reservations", authPin],
    queryFn: () => fetchList({ data: { pin: authPin! } }),
    enabled: !!authPin,
    retry: false,
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: "pending" | "confirmed" | "cancelled" }) =>
      updateStatus({ data: { id: vars.id, status: vars.status, pin: authPin! } }),
    onSuccess: () => {
      toast.success(t("admin.statusUpdated"));
      qc.invalidateQueries({ queryKey: ["reservations", authPin] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    localStorage.setItem("admin_pin", pin.trim());
    setAuthPin(pin.trim());
    setPin("");
  };

  const logout = () => {
    localStorage.removeItem("admin_pin");
    setAuthPin(null);
    qc.removeQueries({ queryKey: ["reservations"] });
  };

  const locale = lang === "de" ? "de-DE" : "en-GB";

  const filtered = (data ?? []).filter((r) => (filter === "all" ? true : r.status === filter));

  const statusCount = (status: string) => (data ?? []).filter((r) => r.status === status).length;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {t("res.backHome")}
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.82_0.12_85)]">
                Fahrdienst Khan
              </div>
              <h1 className="mt-2 font-display text-3xl text-gradient-platinum sm:text-4xl">
                {t("admin.title")}
              </h1>
            </div>
            {authPin && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  className="h-10 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="h-10 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
                >
                  <Unlock className="h-4 w-4" /> {t("admin.logout")}
                </Button>
              </div>
            )}
          </div>

          {!authPin ? (
            <form
              onSubmit={handleLogin}
              className="mx-auto mt-12 max-w-sm rounded-2xl glass p-8 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.82_0.12_85)]/20 text-[oklch(0.82_0.12_85)]">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-xl text-foreground">{t("admin.loginTitle")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("admin.loginDesc")}</p>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={t("admin.pinPlaceholder")}
                className="mt-5 h-12 rounded-lg border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-white/30 focus-visible:ring-white/20"
              />
              <Button
                type="submit"
                className="mt-3 w-full h-12 rounded-full bg-white text-[oklch(0.10_0.03_260)] hover:bg-white/90"
              >
                <Lock className="h-4 w-4" /> {t("admin.enter")}
              </Button>
            </form>
          ) : (
            <>
              {error ? (
                <div className="mt-10 rounded-2xl glass p-10 text-center">
                  <XCircle className="mx-auto h-10 w-10 text-red-400" />
                  <h2 className="mt-4 font-display text-xl text-foreground">{t("admin.authError")}</h2>
                  <Button onClick={logout} variant="outline" className="mt-4 rounded-full">
                    {t("admin.logout")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition border ${
                          filter === f
                            ? "bg-white text-[oklch(0.10_0.03_260)] border-white"
                            : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10"
                        }`}
                      >
                        {t(`admin.filter.${f}`)} {f !== "all" && `(${statusCount(f)})`}
                      </button>
                    ))}
                  </div>

                  {isLoading ? (
                    <div className="mt-10 rounded-2xl glass p-10 text-center text-sm text-muted-foreground">
                      …
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="mt-10 rounded-2xl glass p-10 text-center text-sm text-muted-foreground">
                      {t("admin.noReservations")}
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-4">
                      {filtered.map((r) => {
                        const pickup = new Date(r.pickup_at);
                        const isPast = pickup.getTime() < Date.now();
                        return (
                          <div
                            key={r.id}
                            className={`rounded-2xl glass p-5 sm:p-6 transition ${
                              isPast ? "opacity-60" : ""
                            }`}
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <StatusBadge status={r.status} t={t} />
                                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                    {pickup.toLocaleDateString(locale, {
                                      weekday: "short",
                                      day: "numeric",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  {isPast && (
                                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">
                                      Vergangen
                                    </span>
                                  )}
                                </div>

                                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                                  <div className="flex items-center gap-2 text-foreground/90">
                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[oklch(0.82_0.12_85)]" />
                                    {r.pickup} → {r.destination}
                                  </div>
                                  <div className="flex items-center gap-2 text-foreground/90">
                                    <Users className="h-3.5 w-3.5 shrink-0 text-[oklch(0.82_0.12_85)]" />
                                    {r.passengers} Pers.
                                  </div>
                                  <div className="flex items-center gap-2 text-foreground/90">
                                    <Phone className="h-3.5 w-3.5 shrink-0 text-[oklch(0.82_0.12_85)]" />
                                    {r.phone}
                                  </div>
                                  {r.email && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">E-Mail</span>
                                      {r.email}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-foreground/70">
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Name</span>
                                    {r.name}
                                  </div>
                                  {r.notes && (
                                    <div className="sm:col-span-2 text-foreground/60">
                                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Notiz</span>{" "}
                                      {r.notes}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col gap-2 sm:items-end">
                                <div className="flex gap-2">
                                  {r.status !== "confirmed" && (
                                    <Button
                                      size="sm"
                                      onClick={() => statusMutation.mutate({ id: r.id, status: "confirmed" })}
                                      disabled={statusMutation.isPending}
                                      className="h-9 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/30"
                                    >
                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                      {t("admin.confirm")}
                                    </Button>
                                  )}
                                  {r.status !== "cancelled" && (
                                    <Button
                                      size="sm"
                                      onClick={() => statusMutation.mutate({ id: r.id, status: "cancelled" })}
                                      disabled={statusMutation.isPending}
                                      className="h-9 rounded-full bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30"
                                    >
                                      <XCircle className="h-3.5 w-3.5" />
                                      {t("admin.cancel")}
                                    </Button>
                                  )}
                                  {r.status !== "pending" && (
                                    <Button
                                      size="sm"
                                      onClick={() => statusMutation.mutate({ id: r.id, status: "pending" })}
                                      disabled={statusMutation.isPending}
                                      className="h-9 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30"
                                    >
                                      <Clock className="h-3.5 w-3.5" />
                                      {t("admin.pending")}
                                    </Button>
                                  )}
                                </div>
                                <Link
                                  to={`/reservierung/${r.cancellation_token}`}
                                  className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  <Search className="h-3 w-3" />
                                  {t("admin.viewDetails")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
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
    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${v.cls}`}>
      <Icon className="h-3 w-3" />
      {v.label}
    </div>
  );
}
