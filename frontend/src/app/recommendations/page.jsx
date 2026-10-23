"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Crown, 
  Scissors, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Ruler, 
  Palette, 
  Gem, 
  Heart, 
  Eye, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Send,
  MessageCircle,
  Share2,
  CheckCircle2,
  HelpCircle,
  Search,
  Zap,
  Info
} from "lucide-react";
import { 
  STYLIST_OCCASIONS, 
  BODY_SHAPES, 
  UNDERTONES, 
  EMBELLISHMENT_PREFERENCES, 
  BUDGET_TIERS,
  getFashionRecommendations 
} from "../../lib/recommendationEngine";
import { BUSINESS_INFO, GARMENT_TYPES, getSavedDesigns, saveDesigns } from "../../lib/celouraData";
import { getAllDesignsApi } from "../../lib/api";

export default function AiRecommendationsPage() {
  // Wizard Step State: 1 to 6, or 'analyzing', or 'results'
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // User Selections
  const [selectedOccasion, setSelectedOccasion] = useState(STYLIST_OCCASIONS[0].id);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBodyShape, setSelectedBodyShape] = useState(BODY_SHAPES[0].id);
  const [selectedUndertone, setSelectedUndertone] = useState(UNDERTONES[0].id);
  const [selectedEmbellishment, setSelectedEmbellishment] = useState(EMBELLISHMENT_PREFERENCES[0].id);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_TIERS[0].id);
  const [customPrompt, setCustomPrompt] = useState("");
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const cached = getSavedDesigns();
    if (cached.length > 0) setDesigns(cached);
    getAllDesignsApi()
      .then((remoteDesigns) => {
        if (Array.isArray(remoteDesigns)) {
          setDesigns(remoteDesigns);
          saveDesigns(remoteDesigns);
        }
      })
      .catch((err) => {
        console.warn("Could not load backend designs for recommendations:", err);
      });
  }, []);

  // UI States
  const [activeTab, setActiveTab] = useState("blueprint"); // "blueprint" | "undertone" | "couture"
  const [previewModalDesign, setPreviewModalDesign] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Recommendations calculation
  const recommendationData = useMemo(() => {
    return getFashionRecommendations({
      occasionId: selectedOccasion,
      categoryFilter: selectedCategory,
      bodyShapeId: selectedBodyShape,
      undertoneId: selectedUndertone,
      embellishmentId: selectedEmbellishment,
      budgetId: selectedBudget,
      freeQuery: customPrompt,
      designsList: designs,
    });
  }, [
    selectedOccasion,
    selectedCategory,
    selectedBodyShape,
    selectedUndertone,
    selectedEmbellishment,
    selectedBudget,
    customPrompt,
    designs,
  ]);

  const { topPick, curatedRecommendations, activeProfile } = recommendationData;

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(7);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 1400);
  };

  const handleResetQuiz = () => {
    setCurrentStep(1);
    setShowResults(false);
    setIsAnalyzing(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShareSummary = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-amber-500/30">
      
      {/* Glow Backdrops */}
      <div className="fixed top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[160px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-amber-600/5 blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 shadow-gold-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Celoura AI Style Helper</span>
          </div>

          <h1 className="mt-4 font-cinzel text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Find Your Dream Dress <br />
            <span className="font-script text-4xl sm:text-6xl text-[#f3d995]">
              Made for Your Body & Style
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Answer 6 quick questions. Our AI finds the dress that fits your body shape, event, and favorite colors best in under 60 seconds.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: INTERACTIVE QUESTIONNAIRE (Steps 1 to 6) */}
        {/* ========================================================================= */}
        {!showResults && !isAnalyzing && (
          <div className="mx-auto max-w-4xl">
            
            {/* Step Progress Bar */}
            <div className="mb-8 rounded-2xl border border-amber-500/20 bg-zinc-950/80 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-amber-200/90 mb-3">
                <span className="font-cinzel tracking-wider">
                  Step {currentStep} of 6: {
                    currentStep === 1 ? "Your Event" :
                    currentStep === 2 ? "Dress Type" :
                    currentStep === 3 ? "Body Shape" :
                    currentStep === 4 ? "Best Colors" :
                    currentStep === 5 ? "Handmade Details" :
                    "Your Budget"
                  }
                </span>
                <span className="text-zinc-500">{Math.round((currentStep / 6) * 100)}% Done</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-500 ease-out shadow-gold-sm"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                />
              </div>

              {/* Step Indicators */}
              <div className="hidden sm:grid grid-cols-6 gap-2 mt-4 pt-3 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                {["1. Event", "2. Dress Type", "3. Body Shape", "4. Best Colors", "5. Details", "6. Budget"].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => setCurrentStep(idx + 1)}
                    className={`text-left transition-colors font-medium ${
                      currentStep === idx + 1 
                        ? "text-amber-300 font-bold" 
                        : currentStep > idx + 1 
                        ? "text-zinc-300 hover:text-white" 
                        : "text-zinc-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Form Box */}
            <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#101017] to-[#0a0a0f] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              
              {/* STEP 1: OCCASION */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      What is your special event?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      Tell us where you are going so we can pick dresses that match the mood and venue.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {STYLIST_OCCASIONS.map((occ) => {
                      const isSelected = selectedOccasion === occ.id;
                      return (
                        <div
                          key={occ.id}
                          onClick={() => setSelectedOccasion(occ.id)}
                          className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative group ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 shadow-[0_0_25px_rgba(212,175,55,0.25)] ring-1 ring-amber-300/40"
                              : "border-zinc-800 bg-zinc-900/50 hover:border-amber-500/40 hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-cinzel text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                              {occ.label}
                            </span>
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? "border-amber-400 bg-amber-400 text-black" : "border-zinc-700 bg-zinc-800"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light">
                            {occ.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: CATEGORY */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      What kind of dress would you like?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      Choose "All Designs" to see everything, or pick a specific style you prefer.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {GARMENT_TYPES.map((cat) => {
                      const isSelected = selectedCategory === (cat.id === "all" ? "All" : cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id === "all" ? "All" : cat.id)}
                          className={`rounded-2xl border p-4 text-center transition-all duration-300 ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/15 shadow-gold-sm ring-1 ring-amber-400/40 text-amber-200"
                              : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-amber-500/40 hover:bg-zinc-800"
                          }`}
                        >
                          <Crown className={`mx-auto mb-2 h-5 w-5 ${isSelected ? "text-amber-400" : "text-zinc-500"}`} />
                          <span className="font-cinzel text-xs sm:text-sm font-semibold block">
                            {cat.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: BODY FRAME & SILHOUETTE */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      What is your body shape?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      We use your body shape to suggest cuts and flared styles that look most flattering on you.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {BODY_SHAPES.map((shape) => {
                      const isSelected = selectedBodyShape === shape.id;
                      return (
                        <div
                          key={shape.id}
                          onClick={() => setSelectedBodyShape(shape.id)}
                          className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-amber-400/40"
                              : "border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 hover:bg-zinc-900/70"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-xl ${isSelected ? "bg-amber-400 text-black" : "bg-zinc-800 text-amber-300"}`}>
                                <Ruler className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                                  {shape.label}
                                </span>
                                <span className="block text-[11px] text-amber-300/80 font-light">
                                  {shape.tagline}
                                </span>
                              </div>
                            </div>
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-amber-400 bg-amber-400 text-black" : "border-zinc-700 bg-zinc-800"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="mt-3 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-2 font-light">
                            <strong className="text-zinc-300 font-medium">Why this cut fits you:</strong> {shape.stylingTip}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: UNDERTONE & PALETTE */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      What colors look best on your skin?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      Picking colors that match your skin tone helps you look radiant and glowing in photos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {UNDERTONES.map((tone) => {
                      const isSelected = selectedUndertone === tone.id;
                      return (
                        <div
                          key={tone.id}
                          onClick={() => setSelectedUndertone(tone.id)}
                          className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-300 relative group ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-amber-400/40"
                              : "border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 hover:bg-zinc-900/70"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <Palette className={`h-4 w-4 ${isSelected ? "text-amber-400" : "text-zinc-500"}`} />
                              <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                                {tone.label}
                              </span>
                            </div>
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-amber-400 bg-amber-400 text-black" : "border-zinc-700 bg-zinc-800"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                            {tone.desc}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                            {tone.recommendedColors.slice(0, 3).map((col) => (
                              <span key={col} className="rounded-full bg-black/60 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-200/90">
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: EMBELLISHMENT PREFERENCE */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      What details or embroidery do you like?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      Choose between traditional gold thread handwork, sparkling crystals, or clean simple silk.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {EMBELLISHMENT_PREFERENCES.map((emb) => {
                      const isSelected = selectedEmbellishment === emb.id;
                      return (
                        <div
                          key={emb.id}
                          onClick={() => setSelectedEmbellishment(emb.id)}
                          className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-300 relative group ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-amber-400/40"
                              : "border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 hover:bg-zinc-900/70"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              <Gem className={`h-4 w-4 ${isSelected ? "text-amber-400" : "text-zinc-500"}`} />
                              <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                                {emb.label}
                              </span>
                            </div>
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-amber-400 bg-amber-400 text-black" : "border-zinc-700 bg-zinc-800"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                            {emb.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: BUDGET & BESPOKE NOTES */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      What is your budget & special requests?
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                      Pick your price range and tell us any special ideas you have for your dress.
                    </p>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                      Your Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {BUDGET_TIERS.map((tier) => {
                        const isSelected = selectedBudget === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedBudget(tier.id)}
                            className={`rounded-xl border p-3 text-center transition-all ${
                              isSelected
                                ? "border-amber-400 bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/50 shadow-gold-sm"
                                : "border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-amber-500/30"
                            }`}
                          >
                            <span className="text-xs font-semibold block">{tier.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Free form prompt */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>Any Special Requests or Ideas? (Optional)</span>
                    </label>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={3}
                      placeholder="e.g. Outdoor evening party in Matara, want lightweight fabric, gold border, and long fitted sleeves."
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Button Bar */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="flex items-center gap-2 rounded-full btn-gold px-6 py-2.5 text-xs sm:text-sm font-bold text-black uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRunAnalysis}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 px-7 py-3 text-xs sm:text-sm font-bold text-black uppercase tracking-wider shadow-gold-md hover:scale-105 transition-all"
                  >
                    <Sparkles className="h-4 w-4 fill-black" />
                    <span>Find My Best Dresses</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: AI STYLIST SCANNING / ANALYZING STATE */}
        {/* ========================================================================= */}
        {isAnalyzing && (
          <div className="mx-auto max-w-lg py-16 text-center animate-fadeIn">
            <div className="relative mx-auto h-28 w-28 flex items-center justify-center">
              {/* Spinning rings */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-amber-500/30 border-b-amber-300 animate-spin duration-700" />
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center shadow-gold-md">
                <Crown className="h-8 w-8 text-black animate-pulse" />
              </div>
            </div>

            <h2 className="mt-8 font-cinzel text-2xl font-bold text-white tracking-wide">
              Finding Your Best Dress Matches...
            </h2>
            <div className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-400 font-light">
              <p className="text-amber-300 font-medium animate-pulse">
                • Checking dresses that flatter your {activeProfile.bodyShape.label} shape
              </p>
              <p>• Matching colors with your {activeProfile.undertone.label}</p>
              <p>• Applying tailor guidelines for your {activeProfile.occasion.label}</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: RECOMMENDATION RESULTS */}
        {/* ========================================================================= */}
        {showResults && topPick && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/25 bg-zinc-950/80 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-white">
                    Your Dress Recommendations Are Ready
                  </h3>
                  <p className="text-xs text-amber-300/80">
                    Matched for {activeProfile.occasion.label} · {activeProfile.bodyShape.label} · {activeProfile.undertone.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareSummary}
                  className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:border-amber-400/50 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Share Look"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 transition-colors font-medium"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Change Answers</span>
                </button>
              </div>
            </div>

            {/* #1 SPOTLIGHT RECOMMENDATION CARD */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-b from-[#13131c] via-[#0d0d14] to-[#07070a] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-amber-400/20">
              
              {/* Background ambient accent */}
              <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                
                {/* Left Column: Garment Image with Match Score Badge */}
                <div className="lg:col-span-5">
                  <div className="relative group overflow-hidden rounded-2xl border border-amber-400/40 bg-black shadow-2xl">
                    <div className="relative h-[420px] sm:h-[480px] w-full">
                      <Image
                        src={topPick.image}
                        alt={topPick.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Match Score Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-amber-400/60 bg-black/85 px-4 py-2 backdrop-blur-md shadow-gold-md">
                      <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
                      <span className="font-cinzel text-sm font-extrabold text-amber-300 tracking-wider">
                        {topPick.matchPercentage}% AI MATCH
                      </span>
                    </div>

                    {/* Floating Top Stylist Pick Ribbon */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-zinc-300 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-amber-500/30">
                      <div>
                        <span className="font-cinzel text-amber-300 font-bold block text-sm">{topPick.category}</span>
                        <span className="text-[11px] text-zinc-400">{topPick.priceFormatted}</span>
                      </div>
                      <button
                        onClick={() => setPreviewModalDesign(topPick)}
                        className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-amber-300 hover:bg-zinc-700"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: AI Stylist Verdict & Custom Tailoring Advice */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Title & Category */}
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                      <Crown className="h-3 w-3 text-amber-400" />
                      <span>Top Recommended Dress for You</span>
                    </div>

                    <h2 className="mt-3 font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
                      {topPick.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-4 text-xs sm:text-sm text-zinc-400">
                      <span className="text-amber-300 font-semibold">{topPick.priceFormatted}</span>
                      <span>•</span>
                      <span>Fabric: {topPick.fabric}</span>
                      <span>•</span>
                      <span>Color: {topPick.color}</span>
                    </div>
                  </div>

                  {/* AI Stylist Verdict Box */}
                  <div className="rounded-2xl border border-amber-500/30 bg-zinc-950/70 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Why This Dress Fits You</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                      {topPick.whyItMatches}
                    </p>
                  </div>

                  {/* Interactive Consultation Tabs */}
                  <div>
                    <div className="flex border-b border-zinc-800 text-xs sm:text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => setActiveTab("blueprint")}
                        className={`pb-2.5 px-4 transition-all relative ${
                          activeTab === "blueprint"
                            ? "text-amber-300 font-bold"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Dress Cut & Details
                        {activeTab === "blueprint" && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-gold-sm" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("undertone")}
                        className={`pb-2.5 px-4 transition-all relative ${
                          activeTab === "undertone"
                            ? "text-amber-300 font-bold"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Best Colors for You
                        {activeTab === "undertone" && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-gold-sm" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("couture")}
                        className={`pb-2.5 px-4 transition-all relative ${
                          activeTab === "couture"
                            ? "text-amber-300 font-bold"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        Jewelry & Outfit Tips
                        {activeTab === "couture" && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 shadow-gold-sm" />
                        )}
                      </button>
                    </div>

                    {/* Tab 1: Blueprint */}
                    {activeTab === "blueprint" && (
                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs animate-fadeIn">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Best Neckline</span>
                          <span className="text-white font-medium mt-0.5 block">{topPick.tailoringBlueprint.recommendedNeckline}</span>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Best Sleeve Length</span>
                          <span className="text-white font-medium mt-0.5 block">{topPick.tailoringBlueprint.recommendedSleeve}</span>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Dress Cut & Shape</span>
                          <span className="text-white font-medium mt-0.5 block">{topPick.tailoringBlueprint.silhouette}</span>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Embroidery & Detail</span>
                          <span className="text-white font-medium mt-0.5 block">{topPick.embroidery}</span>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Undertone */}
                    {activeTab === "undertone" && (
                      <div className="mt-4 space-y-3 text-xs animate-fadeIn">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-amber-300 font-semibold block text-[11px]">Colors That Match Your Skin</span>
                          <p className="mt-1 text-zinc-300 leading-relaxed font-light">
                            {activeProfile.undertone.desc}. This dress in {topPick.color} will make your skin look bright and glowing under party lights.
                          </p>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-amber-300 font-semibold block text-[11px]">Makeup Tips</span>
                          <p className="mt-1 text-zinc-300 leading-relaxed font-light">
                            {topPick.hauteCoutureStyling.makeup}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Couture */}
                    {activeTab === "couture" && (
                      <div className="mt-4 space-y-3 text-xs animate-fadeIn">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-amber-300 font-semibold block text-[11px]">Jewelry & Accessories</span>
                          <p className="mt-1 text-zinc-300 leading-relaxed font-light">
                            {topPick.hauteCoutureStyling.jewelry}
                          </p>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5">
                          <span className="text-amber-300 font-semibold block text-[11px]">Shawl & Scarf Draping</span>
                          <p className="mt-1 text-zinc-300 leading-relaxed font-light">
                            {topPick.hauteCoutureStyling.dupattaDrape}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: 1-Click Bespoke Order & WhatsApp */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={topPick.orderUrl}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-black uppercase tracking-wider shadow-gold-md hover:scale-[1.02] transition-transform text-center"
                    >
                      <Scissors className="h-4 w-4" />
                      <span>Customize & Order This Look →</span>
                    </Link>

                    <a
                      href={`https://wa.me/94771699754?text=${encodeURIComponent(
                        `Hello Celoura Fashion! The AI Stylist recommended "${topPick.title}" (${topPick.matchPercentage}% Match for my ${activeProfile.occasion.label}). I would like to discuss custom tailoring this for my measurements.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                      <span className="hidden sm:inline">Chat with Tailor on WhatsApp</span>
                      <span className="sm:hidden">WhatsApp</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>

            {/* SECONDARY CURATED RECOMMENDATIONS */}
            {curatedRecommendations.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                      Other Great Dress Options for You
                    </h3>
                    <p className="text-xs text-zinc-400">
                      More dresses that match your event, body shape, and preferred colors
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {curatedRecommendations.map((design, idx) => (
                    <div
                      key={design.id}
                      className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300"
                    >
                      <div>
                        {/* Image */}
                        <div className="relative h-60 w-full overflow-hidden rounded-xl border border-zinc-800 bg-black">
                          <Image
                            src={design.image}
                            alt={design.title}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/85 border border-amber-400/50 px-2.5 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-sm">
                            <Sparkles className="h-3 w-3 text-amber-400" />
                            <span>{design.matchPercentage}% Match</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4 space-y-1.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/90 block">
                            {design.category}
                          </span>
                          <h4 className="font-cinzel text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                            {design.title}
                          </h4>
                          <p className="text-xs text-zinc-400 line-clamp-2 font-light">
                            {design.description}
                          </p>
                          <div className="pt-2 text-xs text-amber-300 font-semibold">
                            {design.priceFormatted}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-2">
                        <Link
                          href={design.orderUrl}
                          className="flex-1 rounded-xl btn-gold py-2 text-center text-xs font-bold text-black uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all"
                        >
                          Order This Look
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPreviewModalDesign(design)}
                          className="rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 hover:text-amber-300 hover:border-amber-400 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FREE-FORM AI RE-TUNING BOX */}
            <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-zinc-950 via-[#0e0e14] to-zinc-950 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>Want to change anything on this dress?</span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    You can customize every dress with your favorite fabric, neckline, sleeves, skirt flare, or colors.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/order"
                    className="rounded-full border border-amber-400/60 bg-amber-400/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 hover:bg-amber-400/20 transition-all"
                  >
                    Custom Order Form
                  </Link>
                  <button
                    onClick={handleResetQuiz}
                    className="rounded-full btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-gold-sm hover:scale-105 transition-all"
                  >
                    Start Quiz Over
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* QUICK VIEW PREVIEW MODAL */}
        {previewModalDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fadeIn">
            <div className="relative max-w-2xl w-full rounded-3xl border border-amber-400/40 bg-[#0d0d12] p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setPreviewModalDesign(null)}
                className="absolute top-4 right-4 rounded-full bg-zinc-800 p-2 text-zinc-300 hover:text-white"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-amber-500/30">
                  <Image
                    src={previewModalDesign.image}
                    alt={previewModalDesign.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    {previewModalDesign.category}
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white">
                    {previewModalDesign.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {previewModalDesign.description}
                  </p>
                  <div className="space-y-1 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                    <p><strong>Fabric:</strong> {previewModalDesign.fabric}</p>
                    <p><strong>Embroidery:</strong> {previewModalDesign.embroidery}</p>
                    <p><strong>Price:</strong> <span className="text-amber-300 font-bold">{previewModalDesign.priceFormatted}</span></p>
                  </div>
                  <div className="pt-3">
                    <Link
                      href={previewModalDesign.orderUrl || `/order?design=${previewModalDesign.id}`}
                      className="block w-full rounded-xl btn-gold py-2.5 text-center text-xs font-bold text-black uppercase tracking-wider"
                    >
                      Customize & Order This Look
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
