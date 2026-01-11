'use client';

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import chatPreview from "../assets/chatPreview.png";

export default function Hero() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });
  const [cursor, setCursor] = useState({ cx: 0.5, cy: 0.35, active: false });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = Math.min(1, Math.max(0, x / rect.width));
    const cy = Math.min(1, Math.max(0, y / rect.height));
    const px = cx * 2 - 1;
    const py = cy * 2 - 1;
    const max = 7;
    const ry = px * max;
    const rx = -py * max;
    setCursor({ cx, cy, active: true });
    setTilt({ rx, ry, s: 1.02 });
  };

  const onLeave = () => {
    setCursor((c) => ({ ...c, active: false }));
    setTilt({ rx: 0, ry: 0, s: 1 });
  };

  const parallaxX = (cursor.cx - 0.5) * -10;
  const parallaxY = (cursor.cy - 0.5) * -12;

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-52 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-200 via-sky-200 to-violet-200 blur-3xl opacity-70"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/75 glass ring-soft px-3 py-1.5 text-xs font-semibold text-slate-700">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Human-centered. Simple. Built for real businesses.
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Meet <span className="text-slate-900">KueBot</span> —
            <span className="block">Your Personalised Customer Service Agent on WhatsApp.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            <span className="font-semibold text-slate-900">KueBot</span> lives on your WhatsApp Business and becomes your customer service + sales agent.{" "}
            <span className="font-semibold text-slate-900">Customers chat like they're messaging a friend.</span>{" "}
            It understands intent, suggests the right items, and prepares orders — smoothly.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-xl">
            <div className="rounded-2xl bg-white/75 glass ring-soft p-4">
              <div className="text-sm font-bold">Personalized help</div>
              <div className="text-xs text-slate-500 mt-1">Feels like a staff member</div>
            </div>
            <div className="rounded-2xl bg-white/75 glass ring-soft p-4">
              <div className="text-sm font-bold">Smart suggestions</div>
              <div className="text-xs text-slate-500 mt-1">Guides choices in chat</div>
            </div>
            <div className="rounded-2xl bg-white/75 glass ring-soft p-4">
              <div className="text-sm font-bold">Fast setup</div>
              <div className="text-xs text-slate-500 mt-1">WhatsApp + catalog</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/get-started" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
              Get KueBot on my WhatsApp
            </Link>
            <a href="#KueBot" className="inline-flex items-center justify-center rounded-xl bg-white/75 glass ring-soft px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white transition-colors">
              What KueBot can do
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Retail, services, home businesses, restaurants — anywhere customers already message you.
          </p>
        </div>
        <div className="relative flex justify-center lg:justify-end lg:-translate-x-4">
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/45 blur-3xl opacity-60"></div>
            <div className="absolute left-[55%] top-[48%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/40 blur-3xl opacity-45"></div>
          </div>
          <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave} className="group w-[420px] max-w-full overflow-hidden rounded-3xl bg-white/80 glass ring-soft shadow-soft cursor-pointer transition-shadow duration-300 hover:shadow-2xl" style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`, transformStyle: "preserve-3d", transition: "transform 140ms ease-out" }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white/70">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-semibold">WhatsApp · KueBot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500/80"></span>
                <span className="text-xs text-slate-500">Live</span>
              </div>
            </div>
            <div className="relative p-3 bg-[#ECE5DD]">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(380px circle at ${cursor.cx * 100}% ${cursor.cy * 100}%, rgba(255,255,255,0.40), transparent 55%)`, mixBlendMode: "soft-light" }}></div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-md"></div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm" style={{ transform: cursor.active ? `translate3d(${parallaxX}px, ${parallaxY}px, 0)` : "translate3d(0,0,0)", transition: cursor.active ? "transform 80ms ease-out" : "transform 300ms ease-out", willChange: "transform" }}>
                <Image src={chatPreview} alt="KueBot WhatsApp chat preview" className="w-full max-h-[520px] object-cover object-top transition-all duration-500 brightness-[0.98] saturate-[0.98] group-hover:brightness-[1.04] group-hover:saturate-[1.05]" style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
              </div>
              <div className="pointer-events-none absolute inset-x-10 bottom-6 h-10 rounded-full bg-black/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-40"></div>
            </div>
            <div className="px-4 py-3 text-xs text-slate-600 bg-white/70">
              Customers ask naturally. KueBot clarifies, recommends, and prepares the order — you stay in control.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}