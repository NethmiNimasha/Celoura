"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Scissors, 
  Gem, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Palette, 
  Star, 
  Sparkles, 
  X, 
  Phone, 
  MessageCircle,
  Eye,
  Check,
  Crown
} from "lucide-react";
import { BUSINESS_INFO, INITIAL_DESIGNS, GARMENT_TYPES } from "../lib/celouraData";

const CATEGORIES = [
  {
    title: "Frocks & Gowns",
    subtitle: "Tailored Evening & Party Frocks",
    image: "/images/frock-evening.jpg",
    href: "/catalogue?category=Frocks+%26+Gowns",
  },
  {
    title: "Saree Blouses",
    subtitle: "Handcrafted Aari & Zardozi Blouses",
    image: "/images/saree-blouse.jpg",
    href: "/catalogue?category=Saree+Blouses",
  },
  {
    title: "Designer Skirts",
    subtitle: "Flared Silk & Brocade Maxi Skirts",
    image: "/images/skirt-flare.jpg",
    href: "/catalogue?category=Designer+Skirts",
  },
  {
    title: "Couture Blouses",
    subtitle: "Corsets, Peplums & Crop Tops",
    image: "/images/blouse-designer.jpg",
    href: "/catalogue?category=Couture+Blouses",
  },
  {
    title: "Bridal Lehengas",
    subtitle: "Royal Gold & Velvet Ensembles",
    image: "/images/royal-bloom.jpg",
    href: "/catalogue?category=Bridal+Lehengas",
  },
];

export default function HomePage() {
  const [selectedDesignModal, setSelectedDesignModal] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const filteredDesigns = activeCategoryFilter === "all"
    ? INITIAL_DESIGNS
    : INITIAL_DESIGNS.filter((d) => d.category === activeCategoryFilter);

  return (
    <div className="relative overflow-hidden bg-[#060608] text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-24">
        {/* Ambient gold glow */}
        <div className="absolute top-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Hero Left Content (5 cols) */}
            <div className="lg:col-span-5 space-y-6 z-10">
              <span className="font-cinzel text-xs font-semibold tracking-[0.3em] uppercase text-amber-300/90 block">
                Welcome to Celoura
              </span>

              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1]">
                Custom Dresses <br />
                <span className="font-script text-5xl sm:text-6xl lg:text-7xl font-normal text-[#f3d995] leading-none block mt-1">
                  Made for Your Story
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light max-w-md">
                From bespoke frocks and designer skirts to hand-embroidered saree blouses, couture tops, and royal lehengas, we craft custom garments perfectly tailored to your exact measurements.
              </p>

              {/* Quick garment pill badges */}
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-zinc-300">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1">Frocks</span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1">Saree Blouses</span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1">Designer Skirts</span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1">Blouses</span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1">Lehengas</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/80 px-7 py-3 text-xs sm:text-sm font-medium tracking-wide text-amber-200 transition-all duration-300 hover:border-amber-300 hover:bg-amber-400 hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
                >
                  <span>Order Your Custom Outfit</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Hero Right Visual (7 cols) */}
            <div className="lg:col-span-7 relative">
              <div className="relative mx-auto aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-500/20 group">
                <Image
                  src="/images/hero-model.jpg"
                  alt="Celoura Bespoke Haute Couture Black and Gold Dress"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle dark ambient overlays to blend seamlessly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/70 via-transparent to-black/40 pointer-events-none" />

                {/* Right side floating gold cursive overlay */}
                <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-right pointer-events-none select-none z-10 pr-2">
                  <div className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#f5df8c] leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    <p>Design</p>
                    <p>Colour</p>
                    <p>Style</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST / FEATURE BADGES BAR */}
      <section className="border-y border-amber-500/20 bg-[#09090d]/90 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-zinc-800/80 sm:divide-y-0 sm:divide-x sm:divide-zinc-800/80 gap-y-4">
            
            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <Scissors className="h-6 w-6 text-amber-400 mb-2 stroke-[1.5]" />
              <p className="font-cinzel text-xs sm:text-sm font-semibold text-white tracking-wide">
                Custom Made
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Frocks, Skirts, Blouses & Lehengas
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <Gem className="h-6 w-6 text-amber-400 mb-2 stroke-[1.5]" />
              <p className="font-cinzel text-xs sm:text-sm font-semibold text-white tracking-wide">
                Premium
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Silk, Velvet & Aari Zari
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <ShieldCheck className="h-6 w-6 text-amber-400 mb-2 stroke-[1.5]" />
              <p className="font-cinzel text-xs sm:text-sm font-semibold text-white tracking-wide">
                Perfect Fit &
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Exact Anatomical Measurements
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <Truck className="h-6 w-6 text-amber-400 mb-2 stroke-[1.5]" />
              <p className="font-cinzel text-xs sm:text-sm font-semibold text-white tracking-wide">
                On-Time
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Guaranteed Handover & Fitting
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* AI FASHION STYLIST FEATURE SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-r from-[#12121c] via-[#0d0d14] to-[#12121c] p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] ring-1 ring-amber-400/20">
          
          {/* Ambient Gold Glow */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Advanced AI Fashion Recommendations</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Not Sure What Fits You Best? <br />
                <span className="font-script text-3xl sm:text-5xl text-[#f3d995] font-normal">
                  Let Our AI Stylist Guide You
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light max-w-xl">
                Every silhouette at Celoura is bespoke. In 6 short questions, our algorithmic styling engine analyzes your event, body frame, and skin undertone to formulate your custom tailoring blueprint.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                  <span className="font-cinzel font-bold text-amber-300 block mb-0.5">Occasion Match</span>
                  <span className="text-zinc-400 text-[11px]">Bridal, Reception, Sangeet & Galas</span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                  <span className="font-cinzel font-bold text-amber-300 block mb-0.5">Anatomical Fit</span>
                  <span className="text-zinc-400 text-[11px]">Hourglass, Pear, Apple, Petite</span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                  <span className="font-cinzel font-bold text-amber-300 block mb-0.5">Undertone Harmony</span>
                  <span className="text-zinc-400 text-[11px]">Warm Gold, Jewel, Neutral Tones</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/recommendations"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 px-7 py-3 text-xs sm:text-sm font-bold text-black uppercase tracking-wider shadow-gold-md hover:scale-105 transition-all group"
                >
                  <Sparkles className="h-4 w-4 fill-black" />
                  <span>Launch AI Fashion Stylist</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-5 py-3 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:border-amber-400/50 transition-colors"
                >
                  <span>Browse Full Catalogue</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Mockup Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-amber-500/30 bg-black/90 p-5 shadow-2xl backdrop-blur-xl group hover:border-amber-400/60 transition-colors">
                
                {/* Floating Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Crown className="h-3.5 w-3.5 text-amber-400" />
                    <span>Haute Couture AI Pick</span>
                  </div>
                  <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-300 border border-amber-400/40">
                    98% Bespoke Match
                  </span>
                </div>

                {/* Preview Mini Showcase */}
                <div className="mt-4 flex gap-4 items-center">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-amber-400/40">
                    <Image
                      src="/images/royal-bloom.jpg"
                      alt="Top Recommendation"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Bridal Lehengas
                    </span>
                    <h3 className="font-cinzel text-sm font-bold text-white">
                      The Royal Empress Bridal Lehenga
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Italian Micro-Velvet & 24K Gold Zari
                    </p>
                    <span className="text-xs font-bold text-amber-300 block">
                      LKR 185,000
                    </span>
                  </div>
                </div>

                {/* Stylist Insights list */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Target Silhouette:</span>
                    <span className="text-amber-200">6-Meter Circular Flare</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Recommended Neckline:</span>
                    <span className="text-amber-200">Sweetheart Corset Plunge</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Undertone Harmony:</span>
                    <span className="text-amber-200">Warm Golden & Obsidian</span>
                  </div>
                </div>

                <div className="mt-4 pt-3">
                  <Link
                    href="/recommendations"
                    className="block w-full rounded-xl bg-amber-400/15 border border-amber-400/40 py-2 text-center text-xs font-bold text-amber-300 hover:bg-amber-400/25 transition-all"
                  >
                    Take the 60-Sec Style Quiz →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EXPLORE OUR COLLECTION (5 Garment Categories: Frocks, Saree Blouses, Skirts, Blouses, Lehengas) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-300/80 font-semibold block mb-1">
              Explore Our Collection
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-medium text-white">
                Find Your Perfect Style
              </h2>
              <span className="h-[1px] w-12 bg-amber-400/60 hidden sm:inline-block" />
            </div>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors group"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950 transition-all duration-300 hover:border-amber-500/50 hover:shadow-gold-sm flex flex-col justify-end"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              <div className="relative z-10 p-4">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                  {cat.subtitle}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-300/90 font-medium">
                  <span>Shop Now</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. "CREATE YOUR OWN LOOK" - Custom Dress Order Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="relative rounded-2xl border border-amber-500/30 bg-[#0a0a0f] p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/custom-measuring.jpg"
              alt="Custom Dress Order Tailoring"
              fill
              className="object-cover object-center opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-[#0a0a0f]/70" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-300/90 font-semibold block">
                Create Your Own Look
              </span>

              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
                Custom Dress & Blouse Order
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed font-light">
                Tailoring bespoke frocks, skirts, saree blouses, corset tops and bridal lehengas. Choose your design, colour and style — and we'll bring it to life with expert master craftsmanship.
              </p>

              {/* Garment selection indicators */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="rounded-lg border border-amber-400/40 bg-black/60 px-3 py-1.5 text-amber-200">
                  👗 Frocks & Gowns
                </span>
                <span className="rounded-lg border border-amber-400/40 bg-black/60 px-3 py-1.5 text-amber-200">
                  🥻 Saree Blouses
                </span>
                <span className="rounded-lg border border-amber-400/40 bg-black/60 px-3 py-1.5 text-amber-200">
                  ✨ Designer Skirts
                </span>
                <span className="rounded-lg border border-amber-400/40 bg-black/60 px-3 py-1.5 text-amber-200">
                  ✂️ Corsets & Blouses
                </span>
              </div>

              <div className="pt-3">
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-400/80 px-6 py-2.5 text-xs sm:text-sm font-medium text-amber-200 transition-all duration-300 hover:border-amber-300 hover:bg-amber-400 hover:text-black group shadow-gold-sm"
                >
                  <span>Start Your Custom Order</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Steps Icons (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5 lg:pl-12">
              
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-black/60 text-amber-400 shrink-0">
                  <Sparkles className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm sm:text-base font-semibold text-white">
                    Choose Garment & Design
                  </h4>
                  <p className="text-[11px] text-zinc-400">Frock, Skirt, Blouse, Saree Blouse, or Lehenga</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-black/60 text-amber-400 shrink-0">
                  <Palette className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm sm:text-base font-semibold text-white">
                    Select Colour & Fabric
                  </h4>
                  <p className="text-[11px] text-zinc-400">Raw Silk, Micro-Velvet, Brocade, or Georgette</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-black/60 text-amber-400 shrink-0">
                  <Star className="h-5 w-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm sm:text-base font-semibold text-white">
                    Submit Measurements
                  </h4>
                  <p className="text-[11px] text-zinc-400">Customized to your exact anatomical proportions</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. "FEATURED COLLECTION" - "Most Loved Designs —" with Category Filter Tabs */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-300/80 font-semibold block mb-1">
              Featured Collection
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-medium text-white">
                Most Loved Designs
              </h2>
              <span className="h-[1px] w-12 bg-amber-400/60 hidden sm:inline-block" />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {GARMENT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveCategoryFilter(type.id === "all" ? "all" : type.label)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  (activeCategoryFilter === "all" && type.id === "all") ||
                  activeCategoryFilter === type.label
                    ? "bg-amber-400 text-black font-semibold shadow-gold-sm"
                    : "border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-400/50 hover:text-white"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredDesigns.slice(0, 10).map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDesignModal(item)}
                className="group flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-[#0b0b10] p-2 sm:p-2.5 transition-all duration-300 hover:border-amber-500/40 hover:shadow-gold-sm cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-zinc-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Category Tag pill */}
                    <span className="absolute top-2 left-2 rounded-md bg-black/80 px-2 py-0.5 text-[9px] font-medium text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-3 px-1">
                    <h3 className="font-cinzel text-xs sm:text-sm font-semibold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                      {item.fabric}
                    </p>
                  </div>
                </div>

                <div className="mt-2 px-1 pt-1.5 flex items-center justify-between border-t border-zinc-800/60">
                  <span className="font-sans text-xs font-semibold text-amber-300">
                    {item.priceFormatted || `LKR ${item.price.toLocaleString()}`}
                  </span>
                  
                  <span className="text-[10px] text-zinc-500 group-hover:text-amber-300 transition-colors flex items-center gap-0.5">
                    View Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedDesignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-500/40 bg-[#0d0d14] p-6 shadow-2xl">
            <button
              onClick={() => setSelectedDesignModal(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-6 sm:grid-cols-2 items-center">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-amber-500/20">
                <Image
                  src={selectedDesignModal.image}
                  alt={selectedDesignModal.title}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                    {selectedDesignModal.category}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                    {selectedDesignModal.title}
                  </h3>
                  <p className="font-sans text-lg font-bold text-amber-300 mt-1">
                    {selectedDesignModal.priceFormatted || `LKR ${selectedDesignModal.price.toLocaleString()}`}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {selectedDesignModal.description}
                </p>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-xs space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Fabric:</span>
                    <strong className="text-zinc-200">{selectedDesignModal.fabric}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Embroidery:</span>
                    <strong className="text-zinc-200 text-right max-w-[180px] truncate">{selectedDesignModal.embroidery}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Tailoring:</span>
                    <strong className="text-amber-300">Custom Fitted to Order</strong>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href={`/order?design=${selectedDesignModal.id}`}
                    className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider text-black shadow-gold-sm"
                  >
                    <span>Customize This {selectedDesignModal.category.replace(/s$/, "")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}&text=Hello%20Celoura,%20I'm%20interested%20in%20customizing%20${encodeURIComponent(selectedDesignModal.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-outline flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-amber-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
