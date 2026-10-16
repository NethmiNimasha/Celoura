"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { 
  Scissors, 
  Sparkles, 
  Crown, 
  Ruler, 
  Palette, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Phone, 
  MapPin, 
  Info,
  UploadCloud,
  FileCheck
} from "lucide-react";
import { 
  INITIAL_DESIGNS, 
  addOrder, 
  BUSINESS_INFO 
} from "../../lib/celouraData";

const COLOR_PALETTES = [
  { name: "Obsidian Black", hex: "#0a0a0c", border: "#d4af37", text: "text-amber-300" },
  { name: "Imperial Gold", hex: "#d4af37", border: "#fff2be", text: "text-black" },
  { name: "Crimson Velvet", hex: "#6b0f1a", border: "#f59e0b", text: "text-white" },
  { name: "Emerald Zari", hex: "#064e3b", border: "#34d399", text: "text-white" },
  { name: "Midnight Peacock", hex: "#0c2340", border: "#38bdf8", text: "text-white" },
  { name: "Champagne Ivory", hex: "#f5f0e1", border: "#d4af37", text: "text-zinc-900" },
  { name: "Royal Plum", hex: "#3c1346", border: "#c084fc", text: "text-white" },
  { name: "Rose Gold Hue", hex: "#b76e79", border: "#fda4af", text: "text-white" },
];

const FABRIC_OPTIONS = [
  { name: "Pure Raw Silk", desc: "Structured heritage texture with natural luster", priceMod: 0 },
  { name: "Italian Micro-Velvet", desc: "Ultra-soft heavyweight drape for winter/royal weddings", priceMod: 15000 },
  { name: "Pure Spun Tissue Silk", desc: "Metallic shimmer, gossamer light and radiant", priceMod: 25000 },
  { name: "Sheer Organza", desc: "Modern airy ruffles with delicate gold borders", priceMod: -10000 },
  { name: "Banarasi Brocade", desc: "Heirloom woven gold jacquard florals", priceMod: 10000 },
];

const SILHOUETTES = [
  "Circular Flared (6-Meter Gher)",
  "Heavy A-Line Flare with Triple Can-Can",
  "Flared Trail Skirt with Structured Waist",
  "Paneled Fluted Mermaid",
  "Tiered Ruffle Silhouette",
];

const NECKLINES = [
  "Sweetheart Plunge",
  "Scoop Sweetheart",
  "Queen Anne Royal Neck",
  "Corset Structured Choli",
  "High Neck with Keyhole",
  "Boat Neck",
  "Deep V-Neck",
];

const SLEEVE_STYLES = [
  "Elbow Length with Zari Border",
  "Full Fitted Sheer with Embroidered Cuff",
  "Cap Sleeve",
  "Flared Bell Sleeve",
  "Sleeveless (with attachable cap sleeves)",
];

const STANDARD_SIZES = {
  custom: { label: "Custom Precise Measurements" },
  S: { bust: "34", waist: "26", hip: "36", shoulder: "14", blouseLength: "14", lehengaLength: "40" },
  M: { bust: "36", waist: "28", hip: "38", shoulder: "14.5", blouseLength: "14.5", lehengaLength: "41" },
  L: { bust: "38", waist: "30", hip: "40", shoulder: "15", blouseLength: "15", lehengaLength: "42" },
  XL: { bust: "40", waist: "33", hip: "43", shoulder: "15.5", blouseLength: "15.5", lehengaLength: "42.5" },
};

function OrderFormContent() {
  const searchParams = useSearchParams();
  const preselectedDesignId = searchParams.get("design");

  const [step, setStep] = useState(1);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Form State
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [customDesignTitle, setCustomDesignTitle] = useState("");
  const [silhouette, setSilhouette] = useState(SILHOUETTES[0]);
  const [neckline, setNeckline] = useState(NECKLINES[0]);
  const [sleeve, setSleeve] = useState(SLEEVE_STYLES[0]);
  
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTES[0].name);
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_OPTIONS[0].name);
  const [embroideryStyle, setEmbroideryStyle] = useState("Handcrafted Antique Gold Zardozi & Dabka");
  
  // Measurement state
  const [measurementUnit, setMeasurementUnit] = useState("inches");
  const [selectedSizePreset, setSelectedSizePreset] = useState("custom");
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hip: "",
    shoulder: "",
    armhole: "",
    sleeveLength: "",
    blouseLength: "",
    lehengaWaist: "",
    lehengaLength: "",
  });

  // Customer contact state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [referenceFile, setReferenceFile] = useState(null);

  // Errors state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (preselectedDesignId) {
      const found = INITIAL_DESIGNS.find((d) => d.id === preselectedDesignId);
      if (found) {
        setSelectedDesign(found);
        setCustomDesignTitle(found.title);
        if (found.silhouette) setSilhouette(found.silhouette);
      }
    }
  }, [preselectedDesignId]);

  const handleSizePresetChange = (preset) => {
    setSelectedSizePreset(preset);
    if (preset !== "custom" && STANDARD_SIZES[preset]) {
      const data = STANDARD_SIZES[preset];
      setMeasurements((prev) => ({
        ...prev,
        bust: data.bust,
        waist: data.waist,
        hip: data.hip,
        shoulder: data.shoulder,
        blouseLength: data.blouseLength,
        lehengaWaist: data.waist,
        lehengaLength: data.lehengaLength,
        armhole: "16",
        sleeveLength: "18",
      }));
    }
  };

  // Base price calculation
  const basePrice = selectedDesign ? selectedDesign.price : 145000;
  const fabricMod = FABRIC_OPTIONS.find((f) => f.name === selectedFabric)?.priceMod || 0;
  const estimatedTotal = basePrice + fabricMod;

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (!selectedDesign && !customDesignTitle.trim()) {
        errs.design = "Please select a design foundation or name your custom style.";
      }
    } else if (currentStep === 3) {
      if (!measurements.bust) errs.bust = "Bust measurement required";
      if (!measurements.waist) errs.waist = "Waist measurement required";
      if (!measurements.lehengaLength) errs.lehengaLength = "Lehenga length required";
    } else if (currentStep === 4) {
      if (!customerName.trim()) errs.customerName = "Full Name is required";
      if (!customerPhone.trim()) {
        errs.customerPhone = "Contact phone number is required";
      } else if (!/^[0-9+ ]{9,14}$/.test(customerPhone.trim())) {
        errs.customerPhone = "Please enter a valid phone number (e.g. 0717602641)";
      }
      if (!customerEmail.trim()) {
        errs.customerEmail = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
        errs.customerEmail = "Please enter a valid email address";
      }
      if (!eventDate) errs.eventDate = "Please choose your event / target delivery date";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const newOrderId = `CEL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      customerName,
      customerPhone,
      customerEmail,
      designTitle: selectedDesign ? selectedDesign.title : customDesignTitle,
      designId: selectedDesign ? selectedDesign.id : "CEL-CUSTOM",
      colour: selectedColor,
      fabric: selectedFabric,
      silhouette,
      neckline,
      sleeve,
      status: "Pending",
      totalAmount: estimatedTotal,
      depositPaid: 0,
      eventDate,
      orderDate: new Date().toISOString().split("T")[0],
      estimatedCompletion: eventDate,
      measurements: {
        ...measurements,
        unit: measurementUnit,
      },
      notes: specialNotes,
      assignedArtisan: "Celoura Master Tailor (Awaiting review)",
    };

    addOrder(newOrder);
    setSubmittedOrder(newOrder);
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  // SUCCESS SCREEN
  if (submittedOrder) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/50 bg-black/90 p-0.5 shadow-gold-md overflow-hidden">
            <Image
              src="/logo.png"
              alt="Celoura Fashion Logo"
              width={80}
              height={80}
              className="h-full w-full object-cover rounded-full"
            />
          </div>

          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
            Order Request Confirmed
          </span>

          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Your Dream Outfit Is In Motion
          </h2>

          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-black/60 p-6 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs text-zinc-400">Assigned Order ID:</span>
              <strong className="font-cinzel text-xl text-amber-400">{submittedOrder.id}</strong>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500 block">Customer:</span>
                <span className="font-medium text-white">{submittedOrder.customerName}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Design:</span>
                <span className="font-medium text-amber-300">{submittedOrder.designTitle}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Target Event Date:</span>
                <span className="font-medium text-white">{submittedOrder.eventDate}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Current Status:</span>
                <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  {submittedOrder.status}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Our Kirindiwela master tailor has received your specifications. We will review your measurements and reach out via phone or WhatsApp at <strong className="text-zinc-200">{submittedOrder.customerPhone}</strong> to confirm fitting arrangements.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/track?orderId=${submittedOrder.id}`}
              className="btn-gold rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2"
            >
              <span>Track Live Status</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`https://wa.me/94717602641?text=Hello%20Celoura%20Fashion,%20I%20just%20submitted%20order%20${submittedOrder.id}%20for%20${submittedOrder.customerName}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline rounded-full px-8 py-3.5 text-xs font-semibold tracking-wider text-amber-300 flex items-center justify-center gap-2"
            >
              <span>Chat with Couturier on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
          <Scissors className="h-3.5 w-3.5 text-amber-400" />
          <span>Bespoke Dress Studio</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Custom Dress Order Request
        </h1>
        <p className="mt-2 text-sm text-zinc-300">
          Tailored precisely to your silhouette, measurements, and preferred color palette.
        </p>
      </div>

      {/* Multi-Step Wizard Progress Bar */}
      <div className="mb-10">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, title: "Silhouette & Style" },
            { num: 2, title: "Colour & Fabric" },
            { num: 3, title: "Measurements" },
            { num: 4, title: "Contact & Submit" },
          ].map((item) => (
            <div key={item.num} className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full font-bold transition-all ${
                  step === item.num
                    ? "bg-amber-400 text-black shadow-gold-md scale-105"
                    : step > item.num
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/50"
                    : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                }`}
              >
                {step > item.num ? <Check className="h-4 w-4" /> : item.num}
              </div>
              <span
                className={`mt-2 hidden sm:block text-[11px] font-medium tracking-wide ${
                  step >= item.num ? "text-amber-300" : "text-zinc-500"
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 w-full rounded-full bg-zinc-900">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Studio Card */}
      <div className="rounded-3xl border border-amber-500/25 bg-[#0c0c12] p-6 sm:p-10 shadow-2xl">
        
        {/* STEP 1: SILHOUETTE & STYLE */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <span>Step 1: Choose Design Foundation & Silhouette</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Select one of our signature catalogue designs as inspiration, or specify a custom dress style.
              </p>
            </div>

            {/* Design Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Foundation Design
              </label>
              <div className="grid sm:grid-cols-3 gap-4">
                {INITIAL_DESIGNS.map((d) => {
                  const isSelected = selectedDesign?.id === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => {
                        setSelectedDesign(d);
                        setCustomDesignTitle(d.title);
                        if (d.silhouette) setSilhouette(d.silhouette);
                      }}
                      className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/10 shadow-gold-sm"
                          : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600"
                      }`}
                    >
                      <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden mb-2">
                        <Image src={d.image} alt={d.title} fill className="object-cover" />
                      </div>
                      <p className="text-xs font-bold text-white truncate">{d.title}</p>
                      <p className="text-[11px] text-amber-400 font-semibold mt-0.5">{d.priceFormatted}</p>
                    </div>
                  );
                })}
              </div>

              {/* Or Custom Title */}
              <div className="pt-2">
                <label className="text-xs text-zinc-400 block mb-1">
                  Or give your custom design a unique title / reference name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Custom Bridal Velvet Lehenga with Peacock Motifs"
                  value={customDesignTitle}
                  onChange={(e) => {
                    setCustomDesignTitle(e.target.value);
                    if (selectedDesign && selectedDesign.title !== e.target.value) {
                      setSelectedDesign(null);
                    }
                  }}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.design && <p className="text-xs text-red-400 mt-1">{errors.design}</p>}
              </div>
            </div>

            {/* Silhouette Architecture */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Lehenga Silhouette Architecture
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {SILHOUETTES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSilhouette(s)}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      silhouette === s
                        ? "border-amber-400 bg-amber-400/10 text-white font-semibold shadow-gold-sm"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Neckline & Sleeves */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Choli / Blouse Neckline
                </label>
                <select
                  value={neckline}
                  onChange={(e) => setNeckline(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  {NECKLINES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Sleeve Style
                </label>
                <select
                  value={sleeve}
                  onChange={(e) => setSleeve(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  {SLEEVE_STYLES.map((sl) => (
                    <option key={sl} value={sl}>{sl}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: COLOUR & FABRIC */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-amber-400" />
                <span>Step 2: Royal Colour & Fabric Preference</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Customize your color tone. Our signature palette emphasizes royal black and glistening imperial golds.
              </p>
            </div>

            {/* Colour Swatches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Selected Colour: <span className="text-white normal-case">{selectedColor}</span>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLOR_PALETTES.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/10 shadow-gold-sm"
                          : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                      }`}
                    >
                      <div
                        className="h-7 w-7 rounded-full border shadow-inner shrink-0"
                        style={{ backgroundColor: c.hex, borderColor: c.border }}
                      />
                      <span className="text-xs font-medium text-white">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Selection */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Primary Couture Fabric
              </label>

              <div className="grid sm:grid-cols-2 gap-3">
                {FABRIC_OPTIONS.map((f) => {
                  const isSelected = selectedFabric === f.name;
                  return (
                    <div
                      key={f.name}
                      onClick={() => setSelectedFabric(f.name)}
                      className={`cursor-pointer rounded-2xl border p-4 transition ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/10 shadow-gold-sm"
                          : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-white">{f.name}</strong>
                        {f.priceMod !== 0 && (
                          <span className="text-[10px] text-amber-400 font-semibold">
                            {f.priceMod > 0 ? `+LKR ${f.priceMod.toLocaleString()}` : `-LKR ${Math.abs(f.priceMod).toLocaleString()}`}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embroidery Style */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Embroidery & Craftsmanship Technique
              </label>
              <select
                value={embroideryStyle}
                onChange={(e) => setEmbroideryStyle(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="Handcrafted Antique Gold Zardozi & Dabka">Handcrafted Antique Gold Zardozi & Dabka</option>
                <option value="Bullion Metallic Zari & Sequin Jaal">Bullion Metallic Zari & Sequin Jaal</option>
                <option value="Swarovski Crystal & Cut-dana Embellishment">Swarovski Crystal & Cut-dana Embellishment</option>
                <option value="Gold Resham Florals with Scalloped Border">Gold Resham Florals with Scalloped Border</option>
                <option value="Minimalist Subtle Zari Border Accent">Minimalist Subtle Zari Border Accent</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: PRECISE MEASUREMENTS (FR-07, FR-12) */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-amber-400" />
                  <span>Step 3: Precise Measurements</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter your measurements for an impeccable tailor-made fit. You can adjust margins at your boutique fitting.
                </p>
              </div>

              {/* Unit Toggle */}
              <div className="flex items-center gap-2 self-start sm:self-auto rounded-full border border-zinc-700 bg-zinc-900 p-1">
                <button
                  type="button"
                  onClick={() => setMeasurementUnit("inches")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    measurementUnit === "inches"
                      ? "bg-amber-400 text-black shadow-gold-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Inches
                </button>
                <button
                  type="button"
                  onClick={() => setMeasurementUnit("cm")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    measurementUnit === "cm"
                      ? "bg-amber-400 text-black shadow-gold-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            {/* Preset Selector */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
              <span className="text-xs font-semibold text-zinc-300 block mb-2">
                Quick Size Preset (or enter exact numbers below):
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(STANDARD_SIZES).map((sizeKey) => (
                  <button
                    type="button"
                    key={sizeKey}
                    onClick={() => handleSizePresetChange(sizeKey)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition ${
                      selectedSizePreset === sizeKey
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/60"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {sizeKey.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Bust ({measurementUnit}) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 36"
                  value={measurements.bust}
                  onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.bust && <p className="text-[11px] text-red-400 mt-0.5">{errors.bust}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Waist ({measurementUnit}) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 28"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.waist && <p className="text-[11px] text-red-400 mt-0.5">{errors.waist}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Hip ({measurementUnit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 38"
                  value={measurements.hip}
                  onChange={(e) => setMeasurements({ ...measurements, hip: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Lehenga Length ({measurementUnit}) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 42 (with heels)"
                  value={measurements.lehengaLength}
                  onChange={(e) => setMeasurements({ ...measurements, lehengaLength: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.lehengaLength && <p className="text-[11px] text-red-400 mt-0.5">{errors.lehengaLength}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Blouse Length ({measurementUnit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 14.5"
                  value={measurements.blouseLength}
                  onChange={(e) => setMeasurements({ ...measurements, blouseLength: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Shoulder Width ({measurementUnit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 14.5"
                  value={measurements.shoulder}
                  onChange={(e) => setMeasurements({ ...measurements, shoulder: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Measurement Guarantee Note */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-zinc-300">
              <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300">Celoura Fitting Guarantee:</strong>
                <p className="mt-0.5 text-zinc-400">
                  Not sure about your exact measurements? Enter approximate numbers. Our master tailors will contact you or welcome you to our Kirindiwela boutique for complimentary fine-fitting adjustments!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT, EVENT DATE & SUMMARY (FR-07, FR-12) */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-amber-400" />
                <span>Step 4: Contact Details & Order Summary</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Please provide your contact details so we can organize your tailoring timeline and status updates.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ayesha Jayawardena"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.customerName && <p className="text-[11px] text-red-400 mt-0.5">{errors.customerName}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Phone Number (Sri Lanka) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0717602641 or +94 71 760 2641"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.customerPhone && <p className="text-[11px] text-red-400 mt-0.5">{errors.customerPhone}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="e.g. ayesha@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.customerEmail && <p className="text-[11px] text-red-400 mt-0.5">{errors.customerEmail}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium block mb-1">
                  Target Event / Wedding Date *
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.eventDate && <p className="text-[11px] text-red-400 mt-0.5">{errors.eventDate}</p>}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-300 font-medium block">
                Special Customization Notes & Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Mention any specific neckline depth, extra latkan tassels, double dupatta preference, or fitting dates..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Design Reference Upload Simulation */}
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 p-5 text-center">
              <UploadCloud className="mx-auto h-8 w-8 text-amber-400/80 mb-2" />
              <p className="text-xs text-zinc-300 font-medium">
                Upload Custom Sketch or Inspiration Reference (Optional)
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                PNG, JPG or PDF up to 10MB
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setReferenceFile(e.target.files?.[0]?.name || null)}
                className="mt-3 text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-300"
              />
              {referenceFile && (
                <p className="mt-2 text-xs text-amber-300">Selected file: {referenceFile}</p>
              )}
            </div>

            {/* Transparent Order Summary Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-6 space-y-3">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center justify-between">
                <span>Custom Order Summary</span>
                <span className="font-cinzel text-amber-400 text-lg">
                  Est. LKR {estimatedTotal.toLocaleString()}
                </span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
                <p><strong className="text-zinc-500">Design:</strong> {selectedDesign ? selectedDesign.title : customDesignTitle || "Bespoke Lehenga"}</p>
                <p><strong className="text-zinc-500">Silhouette:</strong> {silhouette}</p>
                <p><strong className="text-zinc-500">Colour:</strong> {selectedColor}</p>
                <p><strong className="text-zinc-500">Fabric:</strong> {selectedFabric}</p>
                <p><strong className="text-zinc-500">Neckline:</strong> {neckline}</p>
                <p><strong className="text-zinc-500">Sleeve:</strong> {sleeve}</p>
              </div>

              <div className="border-t border-zinc-800 pt-3 text-[11px] text-zinc-400">
                <p>
                  *No immediate payment required. Final pricing, measurements, fitting arrangements, and completion dates will be confirmed directly with Celoura Fashion.
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn-gold-outline rounded-full px-6 py-3 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="btn-gold rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-md"
              >
                <Scissors className="h-4 w-4" />
                <span>Submit Custom Dress Request</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Studio Navigation for steps 1 - 3 */}
        {step < 4 && (
          <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-gold-outline rounded-full px-6 py-2.5 text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="btn-gold rounded-full px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-amber-300 font-cinzel">Loading Custom Studio...</div>}>
      <OrderFormContent />
    </Suspense>
  );
}
