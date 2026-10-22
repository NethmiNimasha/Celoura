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
  ArrowUpDown,
  Star
} from "lucide-react";
import { 
  getSavedDesigns, 
  saveDesigns, 
  getSavedDesignRatings, 
  saveDesignRating 
} from "../../lib/celouraData";
import { getAllDesignsApi, createReviewApi } from "../../lib/api";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [designs, setDesigns] = useState(() => (typeof window !== "undefined" ? getSavedDesigns() : []));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeModalDesign, setActiveModalDesign] = useState(null);
  const [designRatings, setDesignRatings] = useState(() => (typeof window !== "undefined" ? getSavedDesignRatings() : {}));
  const [hoverRating, setHoverRating] = useState({});
  const [justRatedId, setJustRatedId] = useState(null);

  const handleRateDesign = async (design, ratingValue) => {
    const updated = saveDesignRating(design.id, ratingValue);
    setDesignRatings((prev) => ({
      ...prev,
      [design.id]: updated,
    }));
    setJustRatedId(design.id);
    setTimeout(() => setJustRatedId(null), 2500);

    try {
      await createReviewApi({
        designId: design.id,
        designTitle: design.title,
        garmentCategory: design.category,
        rating: ratingValue,
        reviewTitle: `Patron Rating for ${design.title}`,
        comment: `Direct rating of ${ratingValue} stars given in catalogue design card.`,
        customerName: "Atelier Patron",
        verifiedPurchase: true,
      });
    } catch (err) {
      console.warn("Backend rating save warning:", err);
    }
  };

  useEffect(() => {
    const cached = getSavedDesigns();
    if (cached.length > 0) {
      setDesigns(cached);
    }
    getAllDesignsApi()
      .then((remoteDesigns) => {
        if (Array.isArray(remoteDesigns)) {
          setDesigns(remoteDesigns);
          saveDesigns(remoteDesigns);
        }
      })
      .catch((err) => {
        console.warn("Could not load backend designs for catalogue, using cached:", err);
      });

    if (initialCategoryParam) {
      setSelectedCategory(initialCategoryParam);
    }
  }, [initialCategoryParam]);

  const categories = [
    "All",
    "Frocks & Gowns",
    "Saree Blouses",
    "Designer Skirts",
    "Couture Blouses",
    "Bridal Lehengas",
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
          Discover Custom Garments
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300">
          Explore our handcrafted collection of bespoke frocks, saree blouses, designer skirts, couture tops, and bridal lehengas. Select any design as your foundation, then customize necklines, sleeves, flare, and color.
        </p>
      </div>

      {/* AI Stylist Recommendation Banner */}
      <div className="mb-8 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-[#0e0e16] to-amber-500/15 p-4 sm:p-5 backdrop-blur-md shadow-gold-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0 shadow-gold-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-amber-200">
              Not sure which dress style fits you best?
            </h3>
            <p className="text-xs text-zinc-400">
              Take our 60-second AI Style Quiz to find the best dresses, necklines, and colors for your body shape.
            </p>
          </div>
        </div>
        <Link
          href="/recommendations"
          className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-5 py-2 text-xs font-bold text-black uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all shrink-0"
        >
          Find My Dress →
        </Link>
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
          {filteredDesigns.map((design) => {
            const ratingData = designRatings[design.id] || { rating: design.rating || 5.0, count: design.ratingCount || 1 };
            const designRating = ratingData.rating || 5.0;
            const designRatingsCount = ratingData.count || 1;
            const userRated = ratingData.userRated;

            return (
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

                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-amber-400/40 bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-amber-300 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{designRating.toFixed(1)}</span>
                    {designRatingsCount > 1 && (
                      <span className="text-zinc-400 text-[8px]">({designRatingsCount})</span>
                    )}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition">
                      {design.title}
                    </h3>

                    {/* Direct Rating in Design Card */}
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="mt-2.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled = hoverRating[design.id] !== undefined
                              ? star <= hoverRating[design.id]
                              : star <= Math.round(designRating);
                            return (
                              <button
                                key={star}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRateDesign(design, star);
                                }}
                                onMouseEnter={() => setHoverRating((prev) => ({ ...prev, [design.id]: star }))}
                                onMouseLeave={() => setHoverRating((prev) => ({ ...prev, [design.id]: undefined }))}
                                className="p-0.5 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                                title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                              >
                                <Star
                                  className={`h-3.5 w-3.5 transition-colors ${
                                    isFilled
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-zinc-600 hover:text-amber-300"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-xs font-bold text-amber-300 ml-0.5 font-mono">
                          {designRating.toFixed(1)}
                        </span>
                      </div>

                      {justRatedId === design.id ? (
                        <span className="text-[10px] font-bold text-emerald-400 animate-pulse">
                          Rated {userRated}★!
                        </span>
                      ) : userRated ? (
                        <span className="text-[10px] font-semibold text-amber-300/90">
                          You: {userRated}★
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 hover:text-amber-300 transition-colors">
                          Rate
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
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
            );
          })}
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
                  {(() => {
                    const modalRatingData = designRatings[activeModalDesign.id] || { rating: activeModalDesign.rating || 5.0, count: activeModalDesign.ratingCount || 1 };
                    const modalRating = modalRatingData.rating || 5.0;
                    const modalUserRated = modalRatingData.userRated;

                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                            {activeModalDesign.category}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span>{modalRating.toFixed(1)} • Customer Rating</span>
                          </span>
                        </div>
                        <h3 className="font-cinzel text-2xl font-black text-white mt-1">
                          {activeModalDesign.title}
                        </h3>

                        {/* Direct Rating in Catalogue Modal */}
                        <div className="flex items-center gap-2 mt-2 p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const isFilled = hoverRating[activeModalDesign.id] !== undefined
                                ? star <= hoverRating[activeModalDesign.id]
                                : star <= Math.round(modalRating);
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => handleRateDesign(activeModalDesign, star)}
                                  onMouseEnter={() => setHoverRating((prev) => ({ ...prev, [activeModalDesign.id]: star }))}
                                  onMouseLeave={() => setHoverRating((prev) => ({ ...prev, [activeModalDesign.id]: undefined }))}
                                  className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                                  title={`Rate ${star} Stars`}
                                >
                                  <Star
                                    className={`h-4 w-4 transition-colors ${
                                      isFilled ? "fill-amber-400 text-amber-400" : "text-zinc-600 hover:text-amber-300"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-xs font-bold text-amber-300 font-mono">
                            {modalRating.toFixed(1)} / 5.0
                          </span>
                          {justRatedId === activeModalDesign.id ? (
                            <span className="text-[11px] font-bold text-emerald-400 animate-pulse">
                              ✓ Rated {modalUserRated}★! Thank you
                            </span>
                          ) : modalUserRated ? (
                            <span className="text-[11px] text-amber-300/80 font-medium">
                              • Your rating: {modalUserRated}★
                            </span>
                          ) : (
                            <span className="text-[11px] text-zinc-400">
                              • Click stars to rate this design
                            </span>
                          )}
                        </div>

                        <p className="font-cinzel text-xl font-bold text-amber-400 mt-2">
                          {activeModalDesign.priceFormatted}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          *Base starting price. Final price confirmed during consultation based on custom requirements.
                        </p>
                      </>
                    );
                  })()}
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
                    <span>Customize & Order This Piece</span>
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
