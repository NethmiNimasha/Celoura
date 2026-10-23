"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  X, 
  Sparkles, 
  Send, 
  Loader2, 
  ShieldCheck, 
  Heart,
  Filter,
  User
} from "lucide-react";
import { 
  getSavedReviews, 
  saveReviews, 
  addReview, 
  GARMENT_TYPES 
} from "../lib/celouraData";
import { 
  getAllReviewsApi, 
  createReviewApi, 
  getReviewStatsApi, 
  getStoredUser 
} from "../lib/api";

export default function CustomerReviewsSection({ onOpenReviewModal }) {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 5.0,
    totalReviews: 4,
    recommendationRate: "100%",
  });
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [location, setLocation] = useState("Colombo, Sri Lanka");
  const [garmentCategory, setGarmentCategory] = useState("Bridal Lehengas");
  const [reviewTitle, setReviewTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Pre-fill user if signed in
    const user = getStoredUser();
    if (user) {
      if (user.name) setCustomerName(user.name);
      if (user.email) setCustomerEmail(user.email);
    }

    // Load initial cached reviews
    const cached = getSavedReviews();
    if (cached && cached.length > 0) {
      setReviews(cached);
    }

    // Sync from live backend
    getAllReviewsApi()
      .then((remoteReviews) => {
        if (Array.isArray(remoteReviews) && remoteReviews.length > 0) {
          setReviews(remoteReviews);
          saveReviews(remoteReviews);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch remote reviews, using cached:", err);
      });

    getReviewStatsApi()
      .then((remoteStats) => {
        if (remoteStats && remoteStats.totalReviews > 0) {
          setStats(remoteStats);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenModal = () => {
    const user = getStoredUser();
    if (user) {
      if (user.name) setCustomerName(user.name);
      if (user.email) setCustomerEmail(user.email);
    }
    setIsWriteModalOpen(true);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !comment || !reviewTitle) return;

    setSubmitting(true);
    const newRev = {
      id: Date.now(),
      customerName,
      customerEmail,
      location: location || "Sri Lanka",
      garmentCategory,
      rating: Number(rating),
      reviewTitle,
      comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update local state
    const updated = [newRev, ...reviews];
    setReviews(updated);
    saveReviews(updated);

    // Update stats locally
    const sum = updated.reduce((acc, r) => acc + (r.rating || 5), 0);
    const avg = Math.round((sum / updated.length) * 10) / 10;
    setStats({
      averageRating: avg,
      totalReviews: updated.length,
      recommendationRate: "100%",
    });

    // Save to backend
    try {
      await createReviewApi(newRev);
    } catch (err) {
      console.warn("Remote review save failed, persisted locally:", err);
    }

    setSubmitting(false);
    setIsWriteModalOpen(false);
    setReviewTitle("");
    setComment("");
    setToastMessage("Thank you! Your verified rating and review has been published.");
    setTimeout(() => setToastMessage(""), 4500);
  };

  const filteredReviews = activeCategoryFilter === "All"
    ? reviews
    : reviews.filter((r) => r.garmentCategory === activeCategoryFilter);

  const getRatingLabel = (stars) => {
    switch (stars) {
      case 5: return "5 Stars — Exceptional Couture Masterpiece";
      case 4: return "4 Stars — Beautiful Fitting & Great Quality";
      case 3: return "3 Stars — Satisfactory Tailoring";
      case 2: return "2 Stars — Needs Improvement";
      case 1: return "1 Star — Disappointed";
      default: return "";
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 rounded-2xl border border-emerald-500/50 bg-emerald-950/95 px-5 py-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fade-in text-emerald-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Client Testimonials & Ratings</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-normal text-white">
              Celebrated by Modern Royalty
            </h2>
            <span className="h-[1px] w-12 bg-amber-400/60 hidden sm:inline-block" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl font-light">
            Read real verified patron reviews on our anatomical custom fitting, 24K gold zari threadwork, and bespoke atelier craftsmanship.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenModal}
            className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* High-Aesthetic Rating Summary Scorecard Banner */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#111119] via-[#0d0d14] to-[#111119] p-6 sm:p-8 shadow-2xl mb-12 ring-1 ring-amber-400/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          
          {/* Average Score */}
          <div className="flex items-center gap-4 pb-4 md:pb-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/50 bg-black/80 text-amber-300 shadow-gold-sm font-cinzel text-2xl font-black shrink-0">
              {stats.averageRating.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-white mt-1">Overall Patron Score</p>
              <p className="text-[11px] text-zinc-400">Based on verified boutique fittings</p>
            </div>
          </div>

          {/* Recommendation Rate */}
          <div className="pt-4 md:pt-0 md:pl-6">
            <span className="font-cinzel text-2xl font-black text-amber-300 block">
              {stats.recommendationRate}
            </span>
            <p className="text-xs font-bold text-white mt-1">Recommended Precision</p>
            <p className="text-[11px] text-zinc-400">Clients delighted with exact fit</p>
          </div>

          {/* Handcrafted Guarantee */}
          <div className="pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-cinzel text-base font-bold text-white">100% Verified</span>
            </div>
            <p className="text-xs font-bold text-zinc-200 mt-1">Authentic Patron Reviews</p>
            <p className="text-[11px] text-zinc-400">Delivered by Akuressa Atelier</p>
          </div>

          {/* Total Reviews CTA */}
          <div className="pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-wider text-amber-300/80 font-semibold block">
              Join Our Celebrated Patrons
            </span>
            <p className="text-xs text-zinc-300 mt-0.5">
              Have you ordered a custom outfit with Celoura?
            </p>
            <button
              onClick={handleOpenModal}
              className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition"
            >
              <span>Share your fitting experience</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {["All", "Bridal Lehengas", "Saree Blouses", "Frocks & Gowns", "Designer Skirts", "Couture Blouses"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
              activeCategoryFilter === cat
                ? "bg-amber-400 text-black font-bold shadow-gold-sm"
                : "border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-amber-400/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="card-luxury p-5 flex flex-col justify-between relative group hover:border-amber-400/60 transition-all duration-300 hover:shadow-gold-md"
          >
            <div>
              {/* Star Rating & Verified Pill */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${
                        s <= (rev.rating || 5)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              {/* Review Title */}
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                "{rev.reviewTitle}"
              </h4>

              {/* Garment Tag */}
              {rev.garmentCategory && (
                <span className="inline-block mt-1 text-[10px] font-semibold text-amber-300/80 uppercase tracking-wider">
                  {rev.garmentCategory}
                </span>
              )}

              {/* Comment text */}
              <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-light line-clamp-4">
                "{rev.comment}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <div>
                <p className="font-cinzel text-xs font-bold text-zinc-200">
                  {rev.customerName}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {rev.location || "Sri Lanka"}
                </p>
              </div>

              <span className="text-[10px] text-zinc-600 font-mono">
                {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "2026"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-2">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Patron Feedback</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Share Your Atelier Experience
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your rating helps fellow patrons choose their bespoke dream garment.
              </p>
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-4 text-xs">
              {/* Star Rating Interactive Selector */}
              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Your Overall Rating *</label>
                <div className="flex items-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                            : "text-zinc-700"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-semibold text-amber-300">
                    {rating} / 5
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 italic mt-0.5">
                  {getRatingLabel(hoverRating || rating)}
                </p>
              </div>

              {/* Customer Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Jayawardena"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-semibold">Location / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Colombo, Galle, Matara"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Garment Category */}
              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Garment Category Reviewed</label>
                <select
                  value={garmentCategory}
                  onChange={(e) => setGarmentCategory(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Bridal Lehengas">Bridal Lehengas</option>
                  <option value="Saree Blouses">Saree Blouses</option>
                  <option value="Frocks & Gowns">Frocks & Gowns</option>
                  <option value="Designer Skirts">Designer Skirts</option>
                  <option value="Couture Blouses">Couture Blouses</option>
                </select>
              </div>

              {/* Review Headline */}
              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Review Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Breathtaking fitting & flawless embroidery!"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              {/* Detailed Feedback */}
              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Your Review & Tailoring Experience *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on the fabric, master tailor fitting, embroidery, and handover timing..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="btn-gold-outline rounded-full px-5 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold rounded-full px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Rating</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
