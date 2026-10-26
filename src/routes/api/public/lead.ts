import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { forwardLead } from "@/lib/lead.server";

const leadSchema = z.object({
  service: z.string().min(1).max(160),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(["Morning", "Midday", "Afternoon", "Evening"]),
  name: z.string().min(1).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(200),
  street: z.string().min(1).max(300),
  city: z.string().max(120).optional().default(""),
  zip: z.string().max(20).optional().default(""),
  note: z.string().max(2000).optional().default(""),
  smsConsent: z.boolean(),
});

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "Invalid JSON body" },
            { status: 400 },
          );
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Invalid lead data" },
            { status: 400 },
          );
        }

        try {
          await forwardLead(parsed.data);
          return Response.json({ ok: true });
        } catch (err) {
          console.error("Lead delivery failed:", err);
          return Response.json(
            { ok: false, error: "Could not deliver lead" },
            { status: 502 },
          );
        }
      },
    },
  },
});
