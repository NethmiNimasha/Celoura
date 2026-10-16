"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Scissors, 
  Search, 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  Crown,
  User,
  ShoppingBag
} from "lucide-react";
import { BUSINESS_INFO } from "../lib/celouraData";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Haute Catalogue", href: "/catalogue" },
    { name: "Custom Dress Order", href: "/order" },
    { name: "Track Order", href: "/track" },
    { name: "Boutique & Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="hidden sm:block border-b border-amber-500/15 bg-black/90 px-4 py-1.5 text-xs text-amber-200/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>Celoura Bespoke Haute Couture</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-amber-400/70" />
              <span>Kirindiwela, Sri Lanka</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-amber-400/70" />
              <span>Mon-Sun: {BUSINESS_INFO.openingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`} 
              className="flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>{BUSINESS_INFO.displayPhone}</span>
            </a>
            <span className="text-zinc-600">|</span>
            <Link 
              href="/admin" 
              className="flex items-center gap-1 text-zinc-400 hover:text-amber-300 transition-colors"
            >
              <ShieldCheck className="h-3 w-3 text-amber-500/80" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full border-b transition-all duration-300 ${
          isScrolled 
            ? "border-amber-500/30 bg-[#07070a]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3" 
            : "border-amber-500/20 bg-[#08080c]/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-amber-400/50 bg-black/90 p-0.5 shadow-gold-sm transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 group-hover:shadow-gold-md overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="Celoura Fashion Logo"
                width={48}
                height={48}
                className="h-full w-full object-cover rounded-full"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-white group-hover:text-amber-200 transition-colors">
                  CELOURA
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <p className="font-cinzel text-[9px] uppercase tracking-[0.35em] text-amber-300/80">
                Haute Couture & Tailoring
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-all hover:text-amber-300 ${
                    isActive ? "text-amber-300 font-semibold" : "text-zinc-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-gold-sm" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:border-amber-400 hover:text-white"
            >
              <User className="h-3.5 w-3.5 text-amber-400" />
              <span>Account</span>
            </Link>

            <Link
              href="/order"
              className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-xs uppercase tracking-wider text-black font-bold"
            >
              <Scissors className="h-3.5 w-3.5" />
              <span>Custom Order</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/order"
              className="btn-gold flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs uppercase tracking-wider text-black font-bold"
            >
              <Scissors className="h-3 w-3" />
              <span>Order</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/30 bg-zinc-900 text-amber-300 hover:border-amber-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-amber-500/20 bg-[#0b0b10] px-4 py-5 lg:hidden">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive 
                        ? "bg-amber-400/10 text-amber-300 border border-amber-500/30 font-semibold" 
                        : "text-zinc-300 hover:bg-zinc-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200"
                >
                  <User className="h-4 w-4 text-amber-400" />
                  <span>Customer Dashboard</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm text-zinc-200"
                >
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}