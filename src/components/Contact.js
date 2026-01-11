'use client';

import { useMemo, useState } from "react";

export default function Contact() {
  const [note, setNote] = useState("We'll reply with next steps.");
  const resetAfterMs = useMemo(() => 3500, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    console.log("Lead:", payload);
    setNote("Thanks! We received your details. (Demo: check console.)");
    form.reset();
    setTimeout(() => setNote("We'll reply with next steps."), resetAfterMs);
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="rounded-3xl bg-white/75 glass ring-soft shadow-soft p-6 sm:p-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Get KueBot for your business</h2>
            <p className="mt-3 text-slate-600">
              Share your WhatsApp number + catalog/menu and we'll deploy your personalized KueBot.
            </p>

            <div className="mt-5 grid gap-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-white ring-soft p-4">
                <div className="font-bold text-slate-900">What to send us</div>
                <ul className="mt-2 space-y-1">
                  <li>• Your WhatsApp number</li>
                  <li>• Your catalog/menu (photo / PDF / CSV / list)</li>
                  <li>• Any rules (delivery, pickup, timings, etc.)</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white ring-soft p-4">
                <div className="font-bold text-slate-900">What you get</div>
                <ul className="mt-2 space-y-1">
                  <li>• KueBot (AI agent) on WhatsApp</li>
                  <li>• Live Orders Dashboard</li>
                  <li>• Simple customer updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 text-white p-6">
            <div className="text-sm font-bold">Quick contact form</div>
            <p className="mt-2 text-sm text-white/80">This is front-end only (replace with your backend later).</p>

            <form onSubmit={onSubmit} className="mt-4 grid gap-3">
              <input required name="name" className="rounded-xl bg-white/10 ring-1 ring-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="Your name" />
              <input required name="business" className="rounded-xl bg-white/10 ring-1 ring-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="Business name" />
              <input required name="phone" className="rounded-xl bg-white/10 ring-1 ring-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="WhatsApp / phone" />
              <textarea name="message" rows={3} className="rounded-xl bg-white/10 ring-1 ring-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="Optional message (what do you sell? what should KueBot help with?)" />

              <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
                Request setup
              </button>

              <p className="text-xs text-white/70">{note}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}