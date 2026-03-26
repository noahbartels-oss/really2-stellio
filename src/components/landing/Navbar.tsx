"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Stellio</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Preise
            </a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              FAQ
            </a>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Anmelden
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Jetzt starten</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-3 pt-2">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 px-2 py-1">
              Features
            </a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 px-2 py-1">
              Preise
            </a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 px-2 py-1">
              FAQ
            </a>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="w-full">
                Anmelden
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="w-full">
                Jetzt starten
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
