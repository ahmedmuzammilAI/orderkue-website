'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function Navbar() {
  const pathname = usePathname();
  const isOnHomePage = pathname === '/';

  const handleNavClick = (href) => {
    if (!isOnHomePage) {
      window.location.href = '/' + href;
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl bg-white/75 glass ring-soft shadow-soft">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src={logo} 
                alt="OrderKue Logo" 
                width={48}
                height={48}
                className="h-12 w-auto object-contain"
                style={{ filter: 'brightness(0)' }}
              />
              <div className="leading-tight">
                <div className="font-extrabold tracking-tight text-lg">orderkue</div>
                <div className="text-xs text-slate-500 -mt-0.5">Order on WhatsApp</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a 
                href="#KueBot" 
                onClick={(e) => {
                  if (!isOnHomePage) {
                    e.preventDefault();
                    handleNavClick('#KueBot');
                  }
                }}
                className="hover:text-slate-900"
              >
                KueBot
              </a>
              <a 
                href="#features"
                onClick={(e) => {
                  if (!isOnHomePage) {
                    e.preventDefault();
                    handleNavClick('#features');
                  }
                }}
                className="hover:text-slate-900"
              >
                Features
              </a>
              <a 
                href="#how"
                onClick={(e) => {
                  if (!isOnHomePage) {
                    e.preventDefault();
                    handleNavClick('#how');
                  }
                }}
                className="hover:text-slate-900"
              >
                How it works
              </a>
              <a 
                href="#usecases"
                onClick={(e) => {
                  if (!isOnHomePage) {
                    e.preventDefault();
                    handleNavClick('#usecases');
                  }
                }}
                className="hover:text-slate-900"
              >
                Use cases
              </a>
              <a 
                href="#faq"
                onClick={(e) => {
                  if (!isOnHomePage) {
                    e.preventDefault();
                    handleNavClick('#faq');
                  }
                }}
                className="hover:text-slate-900"
              >
                FAQ
              </a>
              <a 
                href="#contact"
                onClick={(e) => {
                  if (!isOnHomePage) {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }
                }}
                className="hover:text-slate-900"
              >
                Contact
              </a>
            </nav>

            <Link
              href="/get-started"
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}