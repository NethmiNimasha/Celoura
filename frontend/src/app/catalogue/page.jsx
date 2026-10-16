"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  Scissors, 
  Crown, 
  Eye, 
  X, 
  Check, 
  ChevronRight,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { getSavedDesigns, INITIAL_DESIGNS } from "../../lib/celouraData";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [designs, setDesigns] = useState(INITIAL_DESIGNS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeModalDesign, setActiveModalDesign] = useState(null);

  useEffect(() => {
    setDesigns(getSavedDesigns());
    if (initialCategoryParam) {
      setSelectedCategory(initialCategoryParam);
    }
  }, [initialCategoryParam]);

  const categories = [
    "All",
    "Bridal Lehengas",
    "Royal Velvet",
    "Silk & Zari",
    "Contemporary Fusion",
    "Festive Pastel",
  ];

  const filteredDesigns = useMemo(() => {
    return designs
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesQuery =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.embroidery.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0;
      });
  }, [designs, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>Haute Couture Catalogue</span>
        </div>
        <h1 className="font-cinzel text-4xl sm:text-5xl font-black text-white">
          Discover Custom Lehenga Designs
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300">
          Explore our bespoke collection of bridal Lehengas, royal velvets, and festive ensembles. Select any design as your foundation, then customize necklines, sleeves, flare, and color.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 space-y-4 rounded-3xl border border-amber-500/20 bg-[#0c0c12] p-5 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by fabric, style, embroidery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-700 bg-zinc-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-amber-400" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs text-zinc-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "bg-amber-400 text-black font-bold shadow-gold-sm"
                    : "border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-amber-500/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Designs Results Count */}
      <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
        <span>Showing <strong className="text-amber-300">{filteredDesigns.length}</strong> bespoke designs</span>
        {selectedCategory !== "All" && (
          <button 
            onClick={() => setSelectedCategory("All")}
            className="text-amber-400 hover:underline"
          >
            Clear category filter
          </button>
        )}
      </div>

      {/* Designs Gallery Grid */}
      {filteredDesigns.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-12 text-center">
          <p className="text-zinc-400">No designs match your search criteria.</p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            className="mt-4 text-xs font-semibold text-amber-400 underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDesigns.map((design) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-black/10 to-transparent" />

                {/* Badges */}
                <span className="absolute top-3 left-3 rounded-full border border-amber-400/30 bg-black/75 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-amber-300">
                  {design.category}
                </span>

                <span className="absolute top-3 right-3 rounded-full border border-amber-500/40 bg-amber-400/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-amber-200">
                  {design.priceFormatted}
                </span>

                {design.featured && (
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border border-amber-400/50 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    <span>Signature</span>
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition">
                    {design.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {design.description}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-zinc-300">
                    <p className="flex items-center gap-1.5">
                      <strong className="text-zinc-400">Fabric:</strong>
                      <span>{design.fabric}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <strong className="text-zinc-400">Embroidery:</strong>
                      <span className="text-zinc-300 truncate">{design.embroidery}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                  <button
                    onClick={() => setActiveModalDesign(design)}
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
      )}

      {/* Design Details Modal (FR-03) */}
      {activeModalDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveModalDesign(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Modal Image */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-amber-500/30">
                <Image
                  src={activeModalDesign.image}
                  alt={activeModalDesign.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full border border-amber-400/30 bg-black/80 px-3 py-1 text-xs font-semibold text-amber-300">
                  {activeModalDesign.category}
                </span>
              </div>

              {/* Modal Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-cinzel text-2xl font-black text-white">
                    {activeModalDesign.title}
                  </h3>
                  <p className="font-cinzel text-xl font-bold text-amber-400 mt-1">
                    {activeModalDesign.priceFormatted}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    *Base starting price. Final price confirmed during consultation based on custom requirements.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 space-y-2 text-xs">
                  <p><strong className="text-amber-300">Design Code:</strong> {activeModalDesign.id}</p>
                  <p><strong className="text-zinc-200">Fabric Composition:</strong> {activeModalDesign.fabric}</p>
                  <p><strong className="text-zinc-200">Embroidery Technique:</strong> {activeModalDesign.embroidery}</p>
                  <p><strong className="text-zinc-200">Silhouette Architecture:</strong> {activeModalDesign.silhouette}</p>
                  <p><strong className="text-zinc-200">Original Palette:</strong> {activeModalDesign.color}</p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {activeModalDesign.description}
                </p>

                {/* Available Customization Options Preview */}
                <div className="space-y-2 border-t border-zinc-800 pt-3">
                  <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Customizable Features:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
                    <div className="rounded-lg bg-zinc-900 p-2">
                      <span className="text-zinc-400 block">Neckline Options:</span>
                      <span className="font-medium text-white">{activeModalDesign.necklineOptions?.join(", ")}</span>
                    </div>
                    <div className="rounded-lg bg-zinc-900 p-2">
                      <span className="text-zinc-400 block">Sleeve Styles:</span>
                      <span className="font-medium text-white">{activeModalDesign.sleeveOptions?.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex gap-3">
                  <Link
                    href={`/order?design=${activeModalDesign.id}`}
                    onClick={() => setActiveModalDesign(null)}
                    className="btn-gold w-full text-center rounded-full py-3.5 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2"
                  >
                    <Scissors className="h-4 w-4" />
                    <span>Customize & Order This Lehenga</span>
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

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-amber-300 font-cinzel">Loading Celoura Catalogue...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
