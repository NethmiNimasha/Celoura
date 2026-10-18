"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Crown,
} from "lucide-react";
import { BUSINESS_INFO } from "../lib/celouraData";
import { getStoredUser } from "../lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Track user login state for dynamic navbar options
    const updateAuth = () => {
      setCurrentUser(getStoredUser());
    };
    updateAuth();
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateAuth);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="hidden sm:block border-b border-amber-500/15 bg-black/95 px-4 py-1.5 text-xs text-amber-200/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>Celoura Bespoke Haute Couture</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-amber-400/70" />
              <span>Akuressa, Sri Lanka</span>
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
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.15em] text-white group-hover:text-amber-200 transition-colors">
                  Celoura
                </span>
              </div>
              <p className="font-cinzel text-[8.5px] uppercase tracking-[0.3em] text-amber-300/80">
                Custom Dresses · Your Style
              </p>
            </div>
          </Link>

          {/* Navigation Items: Home and (Order if signed in / Signup if not) */}
          <div className="flex items-center gap-5 sm:gap-8">
            <Link
              href="/"
              className={`relative text-xs sm:text-sm font-medium tracking-wide transition-all hover:text-amber-300 ${
                pathname === "/" ? "text-amber-300 font-bold" : "text-zinc-300"
              }`}
              
            >
              Home
              {pathname === "/" && (
                <span className="absolute -bottom-1 sm:-bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-gold-sm" />
              )}
            </Link>

            {currentUser ? (
              <Link
                href="/order"
                className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  pathname === "/order"
                    ? "bg-amber-400 text-black shadow-gold-md ring-2 ring-amber-300"
                    : "btn-gold text-black shadow-gold-sm hover:scale-105"
                }`}
              >
                Order
              </Link>
            ) : (
              <Link
                href="/signup"
                className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  pathname === "/signup"
                    ? "bg-amber-400 text-black shadow-gold-md ring-2 ring-amber-300"
                    : "btn-gold text-black shadow-gold-sm hover:scale-105"
                }`}
              >
                Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}