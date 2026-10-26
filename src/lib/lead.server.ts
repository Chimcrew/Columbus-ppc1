// Server-only. This file is blocked from client bundles (*.server.ts),
// which keeps the Make.com webhook URL out of browser code.

const MAKE_WEBHOOK_URL =
  "https://hook.us2.make.com/rml3d7ty4d9h44vjawj8wcy33dpbm36u";

export type LeadPayload = {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  note: string;
  smsConsent: boolean;
};

// Sends each lead field as a separate value in the JSON body.
export async function forwardLead(lead: LeadPayload): Promise<void> {
  const body = {
    service: lead.service,
    appointment_date: lead.date,
    appointment_time: lead.time,
    full_name: lead.name,
    phone: lead.phone,
    email: lead.email,
    street_address: lead.street,
    city: lead.city,
    zip_code: lead.zip,
    note: lead.note,
    sms_consent: lead.smsConsent,
    source: "chimcrew-ppc-landing",
    submitted_at: new Date().toISOString(),
  };

  const res = await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Make webhook failed [${res.status}]: ${text}`);
  }
}
