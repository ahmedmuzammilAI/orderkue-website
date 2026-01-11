'use client';

import { useMemo } from "react";
import Image from "next/image";
import logo from '../assets/logo.png';

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src={logo} 
              alt="OrderKue Logo" 
              width={40}
              height={40}
              className="rounded-2xl"
              style={{ filter: 'brightness(0)' }}
            />
            <div>
              <div className="font-extrabold">orderkue</div>
              <div className="text-sm text-slate-500">KueBot — Your Personalised Customer Service Agent on WhatsApp.</div>
            </div>
          </div>
          <div className="text-sm text-slate-500">© {year} orderkue</div>
        </div>
      </div>
    </footer>
  );
}