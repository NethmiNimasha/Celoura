"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Scissors, 
  Crown, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Ruler, 
  Palette, 
  Eye, 
  Heart,
  ChevronRight,
  Gem,
  Award
} from "lucide-react";
import { BUSINESS_INFO, INITIAL_DESIGNS } from "../lib/celouraData";

export default function HomePage() {
  const [selectedDesignModal, setSelectedDesignModal] = useState(null);
  const featuredDesigns = INITIAL_DESIGNS.filter((d) => d.featured);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 pt-8 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-amber-500/10 py-1.5 pl-2 pr-4 text-xs font-semibold text-amber-300 shadow-gold-sm">
              <div className="relative h-6 w-6 rounded-full overflow-hidden border border-amber-400/60 shadow-sm shrink-0">
                <Image
                  src="/logo.png"
                  alt="Celoura Emblem"
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                />
              </div>
              <span>{BUSINESS_INFO.tagline}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Couture Lehengas, <br />
              <span className="gold-text-gradient">Handcrafted In Gold & Obsidian</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              Welcome to <strong className="text-amber-300 font-medium">Celoura Fashion</strong>. We design and tailor custom bridal Lehengas, royal velvet attire, and statement women's fashion in Kirindiwela, Sri Lanka. Submit your measurements, choose your silhouette, and track your outfit's creation in real time.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/order"
                className="btn-gold flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-gold-md"
              >
                <Scissors className="h-4 w-4" />
                <span>Design Custom Lehenga</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/catalogue"
                className="btn-gold-outline flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wider"
              >
                <Eye className="h-4 w-4 text-amber-400" />
                <span>Explore Catalogue</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-500/20">
              <div className="space-y-1">
                <p className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-300">500+</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Custom Outfits Handcrafted</p>
              </div>
              <div className="space-y-1">
                <p className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-300">100%</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Bespoke Fitting Guarantee</p>
              </div>
              <div className="space-y-1">
                <p className="font-cinzel text-2xl sm:text-3xl font-extrabold text-amber-300">4.9 ★</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Brides & Clients Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Haute Couture Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold Aura Glow behind image */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/40 via-amber-600/30 to-amber-300/40 opacity-70 blur-2xl animate-pulse" />
              
              {/* Main Card Frame */}
              <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-zinc-950 p-2.5 shadow-2xl">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero-lehenga.jpg"
                    alt="Celoura Royal Black and Gold Bridal Lehenga"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Floating Gold Couture Badge */}
                  <div className="absolute top-4 left-4 rounded-full border border-amber-400/60 bg-black/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-300 flex items-center gap-1.5 shadow-gold-sm">
                    <Crown className="h-3.5 w-3.5 text-amber-400" />
                    <span>Haute Couture Signature</span>
                  </div>

                  {/* Floating Bottom Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-amber-500/30 bg-black/85 backdrop-blur-md p-4 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-cinzel text-base font-bold text-white">The Royal Empress Lehenga</p>
                        <p className="text-xs text-amber-300/90">Obsidian Black Silk & 24K Zari Work</p>
                      </div>
                      <span className="font-cinzel text-sm font-bold text-amber-400">
                        LKR 185,000
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-zinc-800">
                      <Link
                        href="/order?design=CEL-DSG-01"
                        className="btn-gold w-full text-center py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black"
                      >
                        Customize This Design
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Haute Couture Designs Collection (FR-01, FR-02, FR-03) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
              <Sparkles className="h-3 w-3" />
              <span>Signature Gallery</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
              Featured Luxury Collections
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Each design is handcrafted with timeless zardozi, bullion zari, and royal velvet fabrics. Fully customizable to your measurements and color preference.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Designs Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredDesigns.map((design) => (
            <div 
              key={design.id}
              className="card-luxury overflow-hidden group flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-transparent opacity-80" />

                {/* Category badge */}
                <span className="absolute top-3 left-3 rounded-full border border-amber-400/30 bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-amber-300">
                  {design.category}
                </span>

                {/* Starting Price tag */}
                <span className="absolute top-3 right-3 rounded-full border border-amber-500/40 bg-amber-400/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-amber-200">
                  {design.priceFormatted}
                </span>
              </div>

              {/* Design Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition">
                    {design.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {design.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-zinc-300">
                    <span className="rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1">
                      {design.fabric}
                    </span>
                    <span className="rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-amber-300/80">
                      {design.color}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedDesignModal(design)}
                    className="flex-1 rounded-full border border-amber-500/30 bg-zinc-900/90 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-amber-400 hover:text-white"
                  >
                    View Details
                  </button>

                  <Link
                    href={`/order?design=${design.id}`}
                    className="btn-gold flex-1 text-center rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Custom Ordering Works (Section 7 in README) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
            <Scissors className="h-3 w-3" />
            <span>The Celoura Experience</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Bespoke Tailoring In 4 Refined Steps
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Enjoy an effortless journey from concept to couture fitting, backed by master Sri Lankan artisans.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Discover or Request",
              desc: "Browse our curated Lehenga catalogue or upload your dream silhouette and reference photos.",
              icon: Eye,
            },
            {
              step: "02",
              title: "Select Color & Style",
              desc: "Customize necklines, sleeve cuts, flare circumference, and choose from our royal color palette.",
              icon: Palette,
            },
            {
              step: "03",
              title: "Submit Measurements",
              desc: "Provide your measurements with our guided visual tool or book an in-person fitting at Kirindiwela.",
              icon: Ruler,
            },
            {
              step: "04",
              title: "Track & Fitting Handover",
              desc: "Follow every phase from Pending to In Progress, culminating in final handover or boutique collection.",
              icon: ShieldCheck,
            },
          ].map((item, idx) => (
            <div 
              key={item.step} 
              className="card-luxury p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10">
                    <item.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <span className="font-cinzel text-3xl font-black text-amber-500/20">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-cinzel text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
                <span>Phase {item.step} of 04</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-zinc-950 via-[#14141c] to-zinc-950 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl" />
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Have a unique bridal vision or special event?
          </h3>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
            Our atelier brings your sketches and Pinterest moodboards to life with authentic zardozi embroidery and royal velvet fabrics.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/order"
              className="btn-gold rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-gold-sm"
            >
              Start Custom Order Now
            </Link>
            <Link
              href="/contact"
              className="btn-gold-outline rounded-full px-8 py-3.5 text-xs font-semibold tracking-wider text-amber-300"
            >
              Book In-Person Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Artisanal Heritage & Fabric Excellence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <Image
              src="/images/velvet-lehenga.jpg"
              alt="Celoura Master Tailoring and Velvet Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-300">
                Atelier Heritage
              </span>
              <h4 className="font-cinzel text-xl font-bold text-white mt-1">
                Hand-Stitched In Kirindiwela
              </h4>
              <p className="text-xs text-zinc-300 mt-1">
                Combining centuries-old zardozi techniques with contemporary bridal silhouettes.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-widest">
              <Gem className="h-3 w-3" />
              <span>Couture Standards</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
              Why Sri Lankan Brides Choose Celoura
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Pure Raw Silk & Micro-Velvet",
                  desc: "We exclusively source premium grade raw silks, Italian velvets, and pure spun bullion zari threads for peerless drape and longevity.",
                },
                {
                  title: "Precision Custom Measurements",
                  desc: "Every choli neckline, waist curve, and lehenga hem is cut specifically to your proportions, including seam allowances for easy future adjustments.",
                },
                {
                  title: "Transparent Workflow & Tracking",
                  desc: "Watch your outfit progress through 6 structured statuses from order review to ready-for-fitting.",
                },
                {
                  title: "Direct Tailor Communication",
                  desc: "Speak directly with our senior couturiers via WhatsApp or visit our Kirindiwela studio for fabric touch-and-feel.",
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
              >
                <span>Have an existing order? Track its status</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique Location & Contact Spotlight (FR-11) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
        <div className="rounded-3xl border border-amber-500/30 bg-[#0e0e14] p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-400 font-bold">
                Visit Our Studio
              </span>
              <h2 className="font-cinzel text-3xl font-extrabold text-white mt-2">
                Celoura Fashion Boutique
              </h2>
              <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                Experience our fabrics in person, view finished bridal lehengas, and discuss your custom color scheme with our head designer.
              </p>

              <div className="mt-6 space-y-3 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Boutique Address:</strong>
                    <p className="text-zinc-400">{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white">Telephone:</strong>
                    <p className="text-zinc-400">
                      <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-amber-300">
                        {BUSINESS_INFO.displayPhone} / {BUSINESS_INFO.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="text-white">Opening Hours:</strong>
                    <p className="text-zinc-400">{BUSINESS_INFO.openingHours} (Open Daily)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-gold rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider text-black"
                >
                  Schedule Boutique Visit
                </Link>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="btn-gold-outline rounded-full px-6 py-3 text-xs font-semibold text-amber-300"
                >
                  Call Boutique
                </a>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-amber-500/20">
              <Image
                src="/images/bridal-gold.jpg"
                alt="Celoura Bridal Couture Showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="rounded-xl border border-amber-500/30 bg-black/85 backdrop-blur-md p-4 w-full">
                  <p className="font-cinzel text-xs uppercase tracking-wider text-amber-300">
                    Bespoke Fittings
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Private bridal appointments available every week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Design Details Modal (FR-03) */}
      {selectedDesignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/40 bg-[#0d0d12] shadow-2xl">
            <button
              onClick={() => setSelectedDesignModal(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-zinc-400 hover:text-white border border-zinc-700"
            >
              ✕
            </button>

            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[3/4] sm:aspect-auto">
                <Image
                  src={selectedDesignModal.image}
                  alt={selectedDesignModal.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
                    {selectedDesignModal.category}
                  </span>

                  <h3 className="font-cinzel text-xl font-bold text-white mt-3">
                    {selectedDesignModal.title}
                  </h3>

                  <p className="font-cinzel text-lg font-bold text-amber-400 mt-1">
                    {selectedDesignModal.priceFormatted}
                  </p>

                  <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                    {selectedDesignModal.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs border-t border-zinc-800 pt-3">
                    <p><strong className="text-zinc-200">Fabric:</strong> {selectedDesignModal.fabric}</p>
                    <p><strong className="text-zinc-200">Embroidery:</strong> {selectedDesignModal.embroidery}</p>
                    <p><strong className="text-zinc-200">Silhouette:</strong> {selectedDesignModal.silhouette}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex gap-3">
                  <Link
                    href={`/order?design=${selectedDesignModal.id}`}
                    onClick={() => setSelectedDesignModal(null)}
                    className="btn-gold w-full text-center rounded-full py-3 text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Customize This Outfit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
