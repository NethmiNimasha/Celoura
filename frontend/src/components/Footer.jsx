"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Heart, 
  Crown, 
  ShieldCheck, 
  Scissors, 
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { BUSINESS_INFO } from "../lib/celouraData";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-amber-500/20 bg-[#07070a] text-zinc-300">
      {/* Subtle top gold glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4 sm:grid-cols-2">
          {/* Column 1: Brand Story */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10">
                <Sparkles className="h-4 w-4 text-amber-300" />
              </div>
              <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-white">
                CELOURA
              </span>
            </Link>
            <p className="font-serif italic text-amber-300/90 text-sm">
              "{BUSINESS_INFO.tagline}"
            </p>
            <p className="text-xs leading-relaxed text-zinc-400">
              Celoura Fashion specializes in custom-made bridal Lehengas, royal velvet attire, and bespoke couture. Each garment is meticulously designed and tailored to your unique measurements, aesthetic preferences, and dreams.
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/20 hover:border-amber-400"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Master Couturier</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-300 font-bold">
              Haute Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/catalogue?category=Bridal+Lehengas" className="hover:text-amber-300 transition">
                  Royal Bridal Lehengas
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=Royal+Velvet" className="hover:text-amber-300 transition">
                  Italian Micro-Velvet Couture
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=Silk+%26+Zari" className="hover:text-amber-300 transition">
                  Pure Silk & Bullion Zari
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=Contemporary+Fusion" className="hover:text-amber-300 transition">
                  Contemporary Reception Ensembles
                </Link>
              </li>
              <li>
                <Link href="/catalogue?category=Festive+Pastel" className="hover:text-amber-300 transition">
                  Festive & Sangeet Collections
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-amber-300 font-semibold text-amber-400 transition flex items-center gap-1">
                  <span>Custom Dress Studio</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services & Workflow */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-300 font-bold">
              Bespoke Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/order" className="hover:text-amber-300 transition">
                  Submit Custom Measurements
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-amber-300 transition">
                  Live Order Status Tracking
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition">
                  Book Boutique Measurement Session
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-300 transition">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="h-3 w-3 text-amber-400" />
                  <span>Admin Order Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Boutique Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-300 font-bold">
              Boutique Atelier
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-amber-300 transition font-medium text-zinc-200">
                  {BUSINESS_INFO.displayPhone} / {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Daily: {BUSINESS_INFO.openingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2 rounded-xl border border-amber-500/20 bg-zinc-950/60 p-3 text-xs">
              <p className="text-amber-200/90 font-medium">Boutique Consultations:</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Walk-ins welcome or reserve your personalized bridal styling appointment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-zinc-800/80 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>© 2026 Celoura Fashion. All rights reserved. Registered Fashion Atelier, Sri Lanka.</p>
          <div className="flex items-center gap-6">
            <span className="text-amber-300/80">Black & Gold Haute Couture Edition</span>
            <span>•</span>
            <Link href="/contact" className="hover:text-amber-300 transition">Privacy & Fitting Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
