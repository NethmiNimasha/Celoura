"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Check
} from "lucide-react";
import { BUSINESS_INFO } from "../lib/celouraData";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative mt-20 border-t border-amber-500/20 bg-[#060608] text-zinc-300">
      {/* Subtle top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          
          {/* Column 1: Brand Logo & Tagline (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/50 bg-black/90 p-0.5 shadow-gold-sm transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 group-hover:shadow-gold-md overflow-hidden shrink-0">
                <Image
                  src="/logo.png"
                  alt="Celoura Fashion Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-cinzel text-2xl font-bold tracking-[0.15em] text-white group-hover:text-amber-200 transition-colors">
                  Celoura
                </span>
                <p className="font-cinzel text-[8.5px] uppercase tracking-[0.35em] text-amber-300/80">
                  Custom Dresses · Your Style
                </p>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              From timeless lehengas to elegant evening gowns, we craft custom-made couture dresses celebrating your authentic elegance.
            </p>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="font-cinzel text-sm font-semibold tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-amber-300 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-amber-300 transition-colors">
                  Custom Order
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-amber-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect With Us (3 cols) */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="font-cinzel text-sm font-semibold tracking-wider text-white">
              Connect With Us
            </h4>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1 text-zinc-400">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 transition-all hover:border-amber-400 hover:text-amber-300"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 transition-all hover:border-amber-400 hover:text-amber-300"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 transition-all hover:border-amber-400 hover:text-amber-300"
                aria-label="Pinterest"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.498-.698-2.435-2.889-2.435-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 transition-all hover:border-amber-400 hover:text-amber-300"
                aria-label="TikTok"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>

            {/* Contact Info List */}
            <div className="space-y-2 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-amber-300 transition-colors">
                  {BUSINESS_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-amber-300 transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Join Our Newsletter (3 cols) */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="font-cinzel text-sm font-semibold tracking-wider text-white">
              Join Our Newsletter
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Be the first to know about new designs, exclusive offers and more.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="relative flex items-center rounded-lg border border-zinc-800 bg-[#0d0d12] focus-within:border-amber-400/60 transition-colors">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 items-center justify-center rounded-md border-l border-zinc-800 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-colors mr-1 shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5">
                  Thank you! You have been subscribed.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar with Gold Cursive Script */}
        <div className="mt-14 border-t border-zinc-800/80 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>© 2025 Celoura Fashion. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-amber-300/90 font-serif italic text-sm tracking-wide">
            <span className="font-script text-lg text-amber-300">Your Dream Dress, Our Creation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
