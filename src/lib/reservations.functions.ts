import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CreateSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  pickup: z.string().trim().min(1).max(200),
  destination: z.string().trim().min(1).max(200),
  pickup_at: z.string().min(1),
  passengers: z.number().int().min(1).max(8),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator((d) => CreateSchema.parse(d))
  .handler(async ({ data }) => {
    const pickupDate = new Date(data.pickup_at);
    if (isNaN(pickupDate.getTime())) throw new Error("Ungültiges Datum");
    if (pickupDate.getTime() < Date.now() - 60_000) {
      throw new Error("Der Abholzeitpunkt liegt in der Vergangenheit");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email ? data.email : null,
        pickup: data.pickup,
        destination: data.destination,
        pickup_at: pickupDate.toISOString(),
        passengers: data.passengers,
        notes: data.notes ? data.notes : null,
      })
      .select("id, cancellation_token, pickup_at")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id, token: row.cancellation_token as string };
  });

export const getReservation = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ token: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("reservations")
      .select("id, name, phone, email, pickup, destination, pickup_at, passengers, notes, status, cancelled_at, created_at")
      .eq("cancellation_token", data.token)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Reservierung nicht gefunden");
    return row;
  });

export const cancelReservation = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ token: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from("reservations")
      .select("id, status, pickup_at")
      .eq("cancellation_token", data.token)
      .maybeSingle();
    if (fetchErr) throw new Error(fetchErr.message);
    if (!existing) throw new Error("Reservierung nicht gefunden");
    if (existing.status === "cancelled") {
      return { ok: true, alreadyCancelled: true as const };
    }
    const pickup = new Date(existing.pickup_at).getTime();
    const hoursUntil = (pickup - Date.now()) / (1000 * 60 * 60);
    if (hoursUntil < 24) {
      throw new Error(
        "Stornierung über die Webseite nur bis 24 Stunden vor Abholung möglich. Bitte rufen Sie uns an.",
      );
    }
    const { error: updErr } = await supabaseAdmin
      .from("reservations")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (updErr) throw new Error(updErr.message);
    return { ok: true, alreadyCancelled: false as const };
  });

export const listReservations = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ pin: z.string().trim().min(1) }).parse(d))
  .handler(async ({ data }) => {
    if (data.pin !== (process.env.ADMIN_PIN ?? "khan2025")) {
      throw new Error("Ungültiger PIN");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("reservations")
      .select("id, name, phone, email, pickup, destination, pickup_at, passengers, notes, status, cancelled_at, created_at, cancellation_token")
      .order("pickup_at", { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateReservationStatus = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["pending", "confirmed", "cancelled"]),
      pin: z.string().trim().min(1),
    }).parse(d)
  )
  .handler(async ({ data }) => {
    if (data.pin !== (process.env.ADMIN_PIN ?? "khan2025")) {
      throw new Error("Ungültiger PIN");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const update: { status: string; cancelled_at: string | null } = { status: data.status, cancelled_at: null };
    if (data.status === "cancelled") update.cancelled_at = new Date().toISOString();
    const { error } = await supabaseAdmin
      .from("reservations")
      .update(update)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });