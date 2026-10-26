import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, ClipboardCheck, ShieldCheck, CircleCheck, Star as StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "@/assets/chimcrew-logo.png";
import ba1fc7 from "@/assets/ba-1fc7fa5bf0.webp.asset.json";
import ba3be2 from "@/assets/ba-3be2a9a317.webp.asset.json";
import ba6bae from "@/assets/ba-6bae688f8c.webp.asset.json";
import ba1b16 from "@/assets/ba-1b164621bb.webp.asset.json";
import ba473b from "@/assets/ba-473b62b325.webp.asset.json";
import ba93f4 from "@/assets/ba-93f419a5c8.webp.asset.json";
import ba1560 from "@/assets/ba-1560bc2258.webp.asset.json";
import ba4ab4 from "@/assets/ba-4ab43462b8.webp.asset.json";
import ba6fa3 from "@/assets/ba-6fa3a0cba0.webp.asset.json";
import bac3a4 from "@/assets/ba-c3a460bea1.webp.asset.json";
import crew1Asset from "@/assets/crew-real-4.jpg.asset.json";
import crew2Asset from "@/assets/crew-real-5.jpg.asset.json";
import crew3Asset from "@/assets/crew-real-6.jpg.asset.json";
import crew4Asset from "@/assets/crew-real-7.jpg.asset.json";
const crew1 = crew1Asset.url;
const crew2 = crew2Asset.url;
const crew3 = crew3Asset.url;
const crew4 = crew4Asset.url;
import whyCrew from "@/assets/why-crew-truck.jpg.asset.json";
import certBadge from "@/assets/certified-chimney-sweep.svg.asset.json";

const PHONE = "(614) 683-5763";
const TEL = "tel:+16146835763";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chimney Sweep in Columbus, OH | ChimCrew — Cleaning from $79" },
      {
        name: "description",
        content:
          "Professional chimney sweep and cleaning in Columbus & Central Ohio, starting at $79. CSIA certified, fully insured, 18+ years. Schedule online or call (614) 683-5763.",
      },
      { property: "og:title", content: "Chimney Sweep in Columbus, OH | ChimCrew" },
      {
        property: "og:description",
        content:
          "Chimney cleaning starting at $79 from a local Ohio crew trusted for over 18 years. Schedule service or call (614) 683-5763.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Landing />,
});

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

function BookingForm({ id }: { id: string }) {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [service, setService] = useState("Chimney Sweeping");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Morning");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [note, setNote] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [dateError, setDateError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const times: [string, string][] = [
    ["Morning", "8–11 AM"], ["Midday", "11 AM–2 PM"],
    ["Afternoon", "2–5 PM"], ["Evening", "5–7 PM"],
  ];

  const onSubmit = async (e: { preventDefault: () => void; currentTarget: Element }) => {
    e.preventDefault();
    const formEl = (e.currentTarget as HTMLElement).closest("form");
    if (formEl && !formEl.reportValidity()) return;
    if (step === 0) {
      const selected = new Date(`${date}T12:00:00`);
      if (selected.getDay() === 6 || date < localToday) {
        setDateError("Please choose a Sunday–Friday date that has not passed.");
        return;
      }
    }
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/public/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, date, time, name, phone, email, street, city, zip, note, smsConsent }),
      });
      if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "lead_submit", service, appointment_date: date, appointment_time: time });
      setFinished(true);
    } catch {
      setSubmitError("We couldn't send your request. Please call (614) 683-5763 and we'll schedule you right away.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
    <div id={id} className="border border-foreground bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center border border-foreground bg-primary text-primary-foreground">
          <ClipboardCheck className="size-5" strokeWidth={2.4} aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">ChimCrew · 60-second booking</p>
          <h2 className="text-xl font-bold uppercase leading-tight">Schedule Service Online</h2>
        </div>
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
        <ShieldCheck className="mr-1 inline size-3.5 align-[-2px] text-primary" aria-hidden="true" /> No extra charge · nights · weekends · holidays
      </p>

      {!finished ? (
        <form data-conversion="booking-form" onSubmit={(e) => e.preventDefault()} onKeyDown={(e) => { if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") { e.preventDefault(); void onSubmit(e); } }} noValidate={false} className="mt-5">
          <div className="flex justify-between" aria-label={`Step ${step + 1} of 3`}>
            {["Service", "Contact", "Address"].map((label, i) => (
              <div key={label} className={`flex-1 border-b-2 pb-2 text-[10px] font-black uppercase tracking-widest ${i > 0 ? "px-2" : ""} ${i === 2 ? "text-right" : ""} ${i <= step ? "border-foreground text-foreground" : "border-border text-muted-foreground/50"}`} aria-current={i === step ? "step" : undefined}>
                0{i + 1} {label}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="mt-6 space-y-4">
              <label className="block text-xs font-medium uppercase text-foreground">
                Service needed <span className="text-destructive">*</span>
                <select required name="service" value={service} onChange={(e) => setService(e.target.value)} className="booking-field mt-1 w-full normal-case">
                  <option>Chimney Sweeping</option>
                  <option>Chimney Inspection</option>
                  <option>Chimney Repair</option>
                  <option>Gas Fireplace Repair</option>
                  <option>Masonry &amp; Rebuilds</option>
                  <option>Chimney Cap &amp; Crown</option>
                  <option>Waterproofing</option>
                </select>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium uppercase text-foreground">
                  Appointment date <span className="text-destructive">*</span>
                  <input required type="date" name="date" min={localToday} value={date} onChange={(e) => { setDate(e.target.value); setDateError(""); }} className="booking-field mt-1 w-full" />
                  <span className="mt-1.5 block normal-case text-muted-foreground">Sun–Fri · Closed Saturdays</span>
                  {dateError && <span role="alert" className="mt-1 block normal-case text-destructive">{dateError}</span>}
                </label>
                <fieldset>
                  <legend className="text-xs font-medium uppercase text-foreground">Appointment time <span className="text-destructive">*</span></legend>
                  <div className="mt-1 grid grid-cols-3 gap-2">
                    {times.map(([label, hours]) => (
                      <label key={label} className="cursor-pointer">
                        <input type="radio" name="time" value={label} checked={time === label} onChange={() => setTime(label)} className="peer sr-only" />
                        <span className="flex min-h-12 flex-col items-center justify-center border border-border px-1 text-center text-xs normal-case leading-tight peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-ring">
                          <strong>{label}</strong><span className="text-[11px]">{hours}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium uppercase">Full name <span className="text-destructive">*</span>
                  <input required name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="booking-field mt-1 w-full normal-case" />
                </label>
                <label className="block text-xs font-medium uppercase">Phone number <span className="text-destructive">*</span>
                  <input required name="phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="booking-field mt-1 w-full normal-case" />
                </label>
              </div>
              <label className="block text-xs font-medium uppercase">Email <span className="text-destructive">*</span>
                <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="booking-field mt-1 w-full normal-case" />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-4">
              <label className="block text-xs font-medium uppercase">Street address <span className="text-destructive">*</span>
                <input required name="street" autoComplete="street-address" placeholder="123 Main St" value={street} onChange={(e) => setStreet(e.target.value)} className="booking-field mt-1 w-full normal-case" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium uppercase">City (optional)
                  <input name="city" autoComplete="address-level2" placeholder="Columbus" value={city} onChange={(e) => setCity(e.target.value)} className="booking-field mt-1 w-full normal-case" />
                </label>
                <label className="block text-xs font-medium uppercase">ZIP code
                  <input name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="43215" value={zip} onChange={(e) => setZip(e.target.value)} className="booking-field mt-1 w-full normal-case" />
                </label>
              </div>
              <label className="block text-xs font-medium uppercase">Note (optional)
                <textarea name="note" rows={2} placeholder="Anything we should know?" value={note} onChange={(e) => setNote(e.target.value)} className="booking-field mt-1 w-full resize-y normal-case" />
              </label>
              <label className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <input type="checkbox" name="smsConsent" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-1 size-4 shrink-0 accent-primary" />
                <span>I consent to receive text messages related to my service request from ChimCrew. Reply STOP at any time to opt out. Message and data rates may apply.</span>
              </label>
            </div>
          )}

          {submitError && (
            <p role="alert" className="mt-4 border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {submitError}
            </p>
          )}
          <div className="mt-5 flex gap-2">
            {step > 0 && <Button type="button" variant="outline" disabled={submitting} onClick={() => setStep(step - 1)} className="h-12 rounded-none border-border bg-transparent px-4 font-semibold uppercase shadow-none"><ArrowLeft className="size-4" /> Back</Button>}
            <Button type="button" onClick={(e) => void onSubmit(e)} id={step === 2 ? "booking-submit" : undefined} data-conversion={step === 2 ? "form-submit" : undefined} disabled={step === 2 && submitting} className="btn-primary h-12 flex-1 rounded-none text-sm font-semibold">
              {step === 2 ? (submitting ? <>Sending…</> : <><CalendarCheck className="size-4" /> Submit booking</>) : <>Continue <ArrowRight className="size-4" /></>}
            </Button>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground"><CircleCheck className="size-3.5 shrink-0 text-destructive" /> No card. No spam.</p>
        </form>
      ) : (
        <div className="mt-6 border-t-4 border-primary py-8 text-center" role="status">
          <h3 className="text-2xl font-extrabold">Request received!</h3>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Thanks{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""} — your booking details are in. We'll confirm your appointment by email shortly.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Need us sooner? Call{" "}
            <a href={TEL} data-conversion="phone-cta" className="font-bold text-foreground underline decoration-primary decoration-2 underline-offset-2">
              {PHONE}
            </a>
          </p>
          <Button type="button" variant="ghost" onClick={() => { setFinished(false); setStep(2); }} className="mx-auto mt-3 flex">Edit details</Button>
        </div>
      )}
    </div>
    <div className="mt-3 flex items-center gap-3 border border-border bg-card px-4 py-3">
      <svg viewBox="0 0 24 24" className="size-7 shrink-0" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-base font-extrabold leading-none">4.8</span>
          <span className="flex gap-0.5" aria-label="Rated 4.8 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className={`size-3.5 ${i < 4 ? "fill-primary text-primary" : "fill-primary/40 text-primary/40"}`} />
            ))}
          </span>
          <span className="text-sm font-bold leading-none">(91)</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Google verified reviews</p>
      </div>
    </div>
    </div>
  );
}

const TRUST = [
  "18+ years experience",
  "CSIA certified",
  "Fully insured",
  "5-star rated",
  "Family owned",
];

const PROJECTS = [
  { before: ba1fc7.url, after: ba3be2.url, title: "Full chimney rebuild", city: "Dublin, OH" },
  { before: ba6fa3.url, after: ba1560.url, title: "Crown & top rebuild", city: "Columbus, OH" },
  { before: ba473b.url, after: ba93f4.url, title: "Chase to brick rebuild", city: "Gahanna, OH" },
  { before: bac3a4.url, after: ba4ab4.url, title: "Rebuild & flashing", city: "Hilliard, OH" },
  { before: ba6bae.url, after: ba1b16.url, title: "Crown rebuild + new cap", city: "Westerville, OH" },
];

const PROBLEMS = [
  {
    t: "Soot or creosote buildup",
    d: "Visible buildup inside the fireplace or chimney can be a sign that it is time for professional cleaning.",
  },
  {
    t: "Smoke coming back inside",
    d: "Poor airflow or chimney buildup can cause smoke to enter the home instead of venting properly.",
  },
  {
    t: "Strong fireplace odors",
    d: "Persistent smoky odors can be caused by buildup inside the chimney.",
  },
  {
    t: "It has been over a year",
    d: "Regular inspection and cleaning can help identify chimney issues before they become larger repairs.",
  },
];

const BENEFITS = [
  "18+ years of chimney experience",
  "CSIA-certified professionals",
  "Licensed & fully insured",
  "Family-owned Ohio company",
  "Clear explanations before repairs",
  "Respectful, professional service",
];

const REVIEWS = [
  { q: "Smokeshelf was packed with 20 years of debris. They got it all out and the fireplace draws like new.", n: "Rashid H.", c: "Columbus, OH", p: "Yelp" },
  { q: "Showed up in that wild yellow truck right on time. Inspection was thorough, no pressure to upsell. Will use again next year.", n: "Brandon S.", c: "Dublin, OH", p: "Yelp" },
  { q: "Punctual, polite, and explained everything they were doing. My wife actually said 'finally a contractor who shows up'.", n: "Derek H.", c: "Hilliard, OH", p: "Google" },
  { q: "Annual sweep + Level 2 inspection. Tech was on time, wore booties, vacuumed everything. Got the report by email that night.", n: "Mike R.", c: "Grove City, OH", p: "Google" },
  { q: "Honest crew. Showed me video of the inside of my flue — no upsell, just told me to book a sweep next year.", n: "Andre J.", c: "Gahanna, OH", p: "Google" },
  { q: "Booked online at 11pm, got a text confirmation in the morning, swept the same week. Smooth operation.", n: "Damian C.", c: "Clintonville, OH", p: "Yelp" },
];

const CITIES = [
  "Columbus",
  "Dublin",
  "Westerville",
  "Worthington",
  "Hilliard",
  "Upper Arlington",
  "Gahanna",
  "Reynoldsburg",
  "Grove City",
  "Pickerington",
  "Powell",
  "New Albany",
  "Delaware",
  "Bexley",
];

const FAQ = [
  {
    q: "How much does a chimney sweep cost?",
    a: "Chimney sweep service starts at $79. Final pricing may depend on the chimney, condition and services required.",
  },
  {
    q: "How often should I have my chimney cleaned?",
    a: "For most homes that use the fireplace regularly, once a year is the usual recommendation. If you burn often or notice odors or smoke, have it looked at sooner.",
  },
  {
    q: "Can ChimCrew inspect my chimney during the visit?",
    a: "Yes. Our technician inspects the chimney as part of the visit and tells you what they found, with photos when it helps.",
  },
  {
    q: "Do you serve areas outside Columbus?",
    a: "We cover Columbus and the surrounding Central Ohio communities, including Dublin, Westerville, Hilliard, Gahanna, Powell, Delaware and more.",
  },
  {
    q: "Are you insured?",
    a: "Yes. ChimCrew is licensed and fully insured, and our technicians are CSIA certified.",
  },
];

function Star() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" />
    </svg>
  );
}

export type Hero = {
  badge: string;
  headline: string;
  deal?: string;
  dealNote?: string;
  copy: string;
  primaryCta?: string;
  trust: string[];
};

const SWEEP_HERO: Hero = {
  badge: "From $79 · Columbus, OH",
  headline: "Chimney Sweep in Columbus, OH",
  copy: "Professional chimney cleaning from a local Ohio crew homeowners have trusted for over 18 years. Keep your chimney clean, safe and ready to use with experienced ChimCrew professionals.",
  trust: ["CSIA certified", "Fully insured", "5-star rated", "Family owned"],
};

export function Landing({ hero = SWEEP_HERO }: { hero?: Hero }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-1 px-4 py-1.5">
          <p className="eyebrow">Serving Columbus, Ohio &amp; surrounding areas — licensed &amp; insured</p>
          <p className="eyebrow hidden sm:block">★ 5-star rated · Google · Yelp · Angi</p>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
          <img src={logo} alt="ChimCrew" width={455} height={340} className="h-11 w-auto sm:h-12" />
          <div className="flex items-center gap-2">
            <a
              href={TEL}
              data-conversion="phone-cta"
              className="hidden border border-border px-4 py-2.5 text-sm font-bold sm:inline-flex"
            >
              {PHONE}
            </a>
            <a href="#book" data-conversion="primary-cta" className="btn-primary text-xs sm:text-sm">
              Schedule service
            </a>
          </div>
        </div>
      </header>

      {/* Hero + booking (split) */}
      <section id="book" className="scroll-mt-4 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:py-14 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <p className="inline-block border border-foreground bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              {hero.badge}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            {hero.deal && (
              <div className="mt-4 inline-block border border-foreground bg-primary px-3 py-2 text-primary-foreground">
                <p className="font-heading text-xl font-bold leading-tight sm:text-2xl">{hero.deal}</p>
                {hero.dealNote && <p className="mt-1 text-xs font-medium sm:text-sm">{hero.dealNote}</p>}
              </div>
            )}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.copy}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {hero.trust.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-1.5 border border-border bg-card px-2 py-1 text-[11px] font-medium uppercase tracking-wide"
                >
                  <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {hero.primaryCta && (
                <a href="#booking-form" data-conversion="hero-schedule-cta" className="btn-primary">
                  {hero.primaryCta}
                </a>
              )}
              <a href={TEL} data-conversion="phone-cta" className="btn-outline">
                Call now {PHONE}
              </a>
            </div>
          </div>
          <BookingForm id="booking-form" />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4">
          <img
            src={certBadge.url}
            alt="Certified Chimney Sweep badge"
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            className="size-14 sm:size-16"
          />
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST.map((t) => (
              <li key={t} className="eyebrow flex items-center gap-2">
                <span className="text-primary">
                  <Star />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow className="text-muted-foreground">Before &amp; After</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Recent Projects
          </h2>
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3">
            {PROJECTS.map((p) => (
              <figure
                key={p.title}
                className="w-[300px] shrink-0 snap-start border border-border bg-card sm:w-[340px]"
              >
                <div className="flex">
                  {[
                    { src: p.before, tag: "Before", cls: "bg-card text-foreground" },
                    { src: p.after, tag: "After", cls: "bg-primary text-primary-foreground" },
                  ].map((h) => (
                    <div key={h.tag} className="relative w-1/2">
                      <img
                        src={h.src}
                        alt={`${p.title} ${h.tag.toLowerCase()} — ${p.city}`}
                        width={400}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/5] w-full object-cover"
                      />
                      <span
                        className={`absolute left-2 top-2 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${h.cls}`}
                      >
                        {h.tag}
                      </span>
                    </div>
                  ))}
                </div>
                <figcaption className="p-4">
                  <p className="font-heading text-base font-bold">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.city}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-y border-foreground bg-ink py-12 text-ink-foreground sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow className="text-ink-foreground/60">Chimney sweep · Columbus</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Does Your Chimney Need Cleaning?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PROBLEMS.map((p, i) => (
              <div key={p.t} className="border border-ink-foreground/15 p-5">
                <span className="eyebrow text-primary">0{i + 1}</span>
                <h3 className="mt-1 text-lg font-bold">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-foreground/70">{p.d}</p>
              </div>
            ))}
          </div>
          <a href="#book" data-conversion="primary-cta" className="btn-primary mt-6 w-full sm:w-auto">
            Schedule your chimney sweep
          </a>
        </div>
      </section>

      {/* Crew */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow className="text-muted-foreground">Meet our crew</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            The ChimCrew Team
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Real photos of the ChimCrew team working on Ohio homes — the same kind of crew that
            shows up when you book your service.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[crew1, crew2, crew3, crew4].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="ChimCrew technicians working on an Ohio chimney"
                width={975}
                height={1300}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 640px) 25vw, 50vw"
                className="aspect-[3/4] w-full border border-border object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="border-y border-border bg-card py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
          <img
            src={whyCrew.url}
            alt="ChimCrew crew member standing by the ChimCrew truck in Columbus"
            width={1320}
            height={1724}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[3/4] w-full border border-border object-cover"
          />
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why Columbus Homeowners Choose{" "}
              <span className="bg-ink px-2 text-primary">ChimCrew</span>
            </h2>
            <ul className="mt-5 space-y-2.5">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 border-b border-border pb-2.5">
                  <span className="text-primary">
                    <Star />
                  </span>
                  <span className="font-semibold">{b}</span>
                </li>
              ))}
            </ul>
            <a href="#book" data-conversion="primary-cta" className="btn-primary mt-6 w-full sm:w-auto">
              Schedule service
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow className="text-muted-foreground">Real customers · Central Ohio</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Trusted by <span className="bg-ink px-2 text-primary">Columbus homeowners</span>.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Real feedback from homeowners across Columbus and Central Ohio who called ChimCrew for
            chimney cleaning, inspections and repairs.
          </p>
          <p className="mt-4 text-sm font-semibold">
            <span className="text-primary">★★★★★</span> 5-star rated across Google, Yelp &amp; Facebook
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <blockquote key={r.n} className="flex flex-col border border-foreground/80 bg-card p-5">
                <div className="flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-[15px] font-medium leading-relaxed">“{r.q}”</p>
                <footer className="mt-4 flex items-end justify-between gap-2 border-t border-border pt-3">
                  <div>
                    <div className="text-sm font-extrabold">{r.n}</div>
                    <div className="text-xs text-muted-foreground">{r.c}</div>
                  </div>
                  <span className="eyebrow border border-border bg-background px-2 py-1 text-[10px]">
                    {r.p} review
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 border border-foreground/80 bg-ink p-5 text-ink-foreground sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h3 className="text-xl font-extrabold sm:text-2xl">Ready to Schedule Your Chimney Sweep?</h3>
              <p className="mt-1 text-sm">
                Chimney Sweep Starting at <span className="font-extrabold text-primary">$79</span>
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <a href="#book" data-conversion="primary-cta" className="btn-primary">
                Schedule chimney service
              </a>
              <a href={TEL} data-conversion="call" className="text-sm font-semibold underline underline-offset-4">
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="border-y border-border bg-card py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Chimney Sweep Service Across Columbus &amp; Central Ohio
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            ChimCrew provides chimney cleaning and chimney services throughout Columbus and
            surrounding communities.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <li key={c} className="border border-border bg-background px-3 py-1.5 text-sm font-semibold">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow className="text-muted-foreground">How it works</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Chimney Service Made Simple
          </h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ["Schedule", "Call us or submit the short form."],
              [
                "We inspect & clean",
                "Our chimney professional visits the property and completes the scheduled service.",
              ],
              [
                "Know where you stand",
                "We explain what we found and let you know if anything needs attention.",
              ],
            ].map(([t, d], i) => (
              <li key={t} className="border border-border bg-card p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center bg-primary font-extrabold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-lg font-extrabold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Common Questions</h2>
          <div className="mt-5 divide-y divide-border border border-border bg-card">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-4">
                <summary className="cursor-pointer list-none font-bold [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-primary group-open:hidden">+</span>
                    <span className="hidden text-primary group-open:inline">−</span>
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-14 text-ink-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <img src={logo} alt="ChimCrew" width={455} height={340} loading="lazy" className="mx-auto h-14 w-auto" />
          <Eyebrow className="mt-5 text-primary">Columbus · Ohio</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Need Your Chimney Cleaned?
          </h2>
          <p className="mt-2 text-ink-foreground/80">
            Schedule professional chimney service with ChimCrew today.
          </p>
          <p className="mt-4 inline-block bg-primary px-3 py-1.5 text-lg font-extrabold text-primary-foreground">
            Chimney sweep starting at $79
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="#book" data-conversion="primary-cta" className="btn-primary">
              Schedule service
            </a>
            <a href={TEL} data-conversion="phone-cta" className="btn-outline text-primary">
              Call {PHONE}
            </a>
          </div>
          <p className="eyebrow mt-6 text-ink-foreground/60">
            CSIA certified · Fully insured · 18+ years experience
          </p>
        </div>
      </section>

      <footer className="bg-ink pb-24 text-center text-xs text-ink-foreground/50 sm:pb-6">
        © {new Date().getFullYear()} ChimCrew · Columbus, Ohio · Licensed &amp; insured
      </footer>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-card sm:hidden">
        <a
          href={TEL}
          data-conversion="phone-cta"
          className="py-3.5 text-center text-sm font-extrabold uppercase tracking-wide"
        >
          Call now
        </a>
        <a
          href="#book"
          data-conversion="primary-cta"
          className="bg-primary py-3.5 text-center text-sm font-extrabold uppercase tracking-wide text-primary-foreground"
        >
          Schedule service
        </a>
      </div>
    </div>
  );
}
