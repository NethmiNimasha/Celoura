"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  FileCheck,
  Loader2,
  Camera,
  Trash2,
  ImageIcon
} from "lucide-react";
import { 
  getSavedDesigns,
  saveDesigns,
  addOrder, 
  BUSINESS_INFO 
} from "../../lib/celouraData";
import { getStoredUser, createOrderApi, getAllDesignsApi } from "../../lib/api";

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
  "A-Line Flared Frock",
  "Princess Cut Bridal Blouse",
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDesignId = searchParams.get("design");
  const preselectedCategory = searchParams.get("category");
  const preselectedColor = searchParams.get("color");
  const preselectedFabric = searchParams.get("fabric");
  const preselectedSilhouette = searchParams.get("silhouette");
  const preselectedNeckline = searchParams.get("neckline");
  const preselectedSleeve = searchParams.get("sleeve");
  const preselectedStylistNotes = searchParams.get("stylistNotes");
  const isAiStylistSource = searchParams.get("source") === "ai-stylist";
  const [authChecked, setAuthChecked] = useState(false);

  const [step, setStep] = useState(1);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [garmentType, setGarmentType] = useState("Frocks & Gowns");
  const [designSelectionMode, setDesignSelectionMode] = useState("catalogue"); // "catalogue" | "custom"
  const [designs, setDesigns] = useState(() => (typeof window !== "undefined" ? getSavedDesigns() : []));
  const [loadingDesigns, setLoadingDesigns] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [customDesignTitle, setCustomDesignTitle] = useState("");
  const [customDesignImage, setCustomDesignImage] = useState(null); // Data URL Base64 preview
  const [customDesignImageName, setCustomDesignImageName] = useState("");
  const [customDesignNotes, setCustomDesignNotes] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [silhouette, setSilhouette] = useState("");
  const [neckline, setNeckline] = useState("");
  const [sleeve, setSleeve] = useState("");
  
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

  const getGarmentBasePrice = (category) => {
    switch (category) {
      case "Frocks & Gowns": return 28000;
      case "Saree Blouses": return 16500;
      case "Designer Skirts": return 24500;
      case "Couture Blouses": return 18500;
      case "Bridal Lehengas": return 95000;
      default: return 25000;
    }
  };

  const handleImageFile = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, customImage: "Please choose an image file (PNG, JPG, WEBP, or HEIC)." }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, customImage: "Image file must be under 10MB." }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setCustomDesignImage(dataUrl);
      setCustomDesignImageName(file.name);
      setReferenceFile(file.name);
      setDesignSelectionMode("custom");

      const title = customDesignTitle.trim() || `Custom ${garmentType} (From Inspiration Photo)`;
      setCustomDesignTitle(title);
      setSelectedDesign({
        id: "CEL-CUSTOM-UPLOAD",
        title: title,
        category: garmentType,
        price: getGarmentBasePrice(garmentType),
        priceFormatted: `LKR ${getGarmentBasePrice(garmentType).toLocaleString()} (Base)`,
        image: dataUrl,
        isCustomUpload: true,
      });

      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.design;
        delete copy.customImage;
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClearCustomImage = () => {
    setCustomDesignImage(null);
    setCustomDesignImageName("");
    setReferenceFile(null);
    if (selectedDesign?.isCustomUpload) {
      const matching = designs.find((d) => d.category === garmentType);
      if (matching) {
        setSelectedDesign(matching);
        setCustomDesignTitle(matching.title);
      } else {
        setSelectedDesign(null);
        setCustomDesignTitle("");
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      // Unauthenticated visitor trying to start order: show sign in first, preserving all AI stylist params!
      const currentQuery = typeof window !== "undefined" && window.location.search 
        ? window.location.search 
        : (preselectedDesignId ? `?design=${preselectedDesignId}` : "");
      router.push(`/signin?redirect=${encodeURIComponent(`/order${currentQuery}`)}`);
      return;
    }
    setAuthChecked(true);

    if (user.name) setCustomerName(user.name);
    if (user.phone) setCustomerPhone(user.phone);
    if (user.email) setCustomerEmail(user.email);

    const userMeasKey = `celoura_measurements_${user.email}`;
    const savedM = typeof window !== "undefined" ? localStorage.getItem(userMeasKey) : null;
    if (savedM) {
      try {
        const parsed = JSON.parse(savedM);
        setMeasurements((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error(e);
      }
    }

    // Load initial cached designs if available
    const cached = getSavedDesigns();
    if (cached.length > 0) {
      setDesigns(cached);
      if (preselectedDesignId) {
        const found = cached.find((d) => d.id === preselectedDesignId);
        if (found) {
          setSelectedDesign(found);
          setCustomDesignTitle(found.title);
          if (found.category) setGarmentType(found.category);
          if (found.silhouette) setSilhouette(found.silhouette);
          setDesignSelectionMode("catalogue");
        }
      }
    }

    // Fetch live designs dynamically from backend PostgreSQL database
    getAllDesignsApi()
      .then((remoteDesigns) => {
        if (Array.isArray(remoteDesigns)) {
          setDesigns(remoteDesigns);
          saveDesigns(remoteDesigns);

          if (preselectedDesignId) {
            const found = remoteDesigns.find((d) => d.id === preselectedDesignId);
            if (found) {
              setSelectedDesign(found);
              setCustomDesignTitle(found.title);
              if (found.category) setGarmentType(found.category);
              if (found.silhouette) setSilhouette(found.silhouette);
              setDesignSelectionMode("catalogue");
            }
          } else {
            setSelectedDesign((current) => {
              if (current) return current;
              const targetCat = preselectedCategory || garmentType;
              const matching = remoteDesigns.find((d) => d.category === targetCat);
              if (matching) {
                setCustomDesignTitle(matching.title);
                if (matching.silhouette) setSilhouette(matching.silhouette);
                return matching;
              }
              return null;
            });
          }
        }
      })
      .catch((err) => {
        console.warn("Could not load backend designs, using saved fallback:", err);
      })
      .finally(() => {
        setLoadingDesigns(false);
      });

    if (preselectedCategory) setGarmentType(preselectedCategory);
    if (preselectedSilhouette) setSilhouette(preselectedSilhouette);
    if (preselectedColor) setSelectedColor(preselectedColor);
    if (preselectedFabric) setSelectedFabric(preselectedFabric);
    if (preselectedNeckline) setNeckline(preselectedNeckline);
    if (preselectedSleeve) setSleeve(preselectedSleeve);
    if (preselectedStylistNotes) setSpecialNotes(preselectedStylistNotes);
  }, [
    preselectedDesignId,
    preselectedCategory,
    preselectedSilhouette,
    preselectedColor,
    preselectedFabric,
    preselectedNeckline,
    preselectedSleeve,
    preselectedStylistNotes,
  ]);

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
  const basePrice = selectedDesign && !selectedDesign.isCustomUpload 
    ? selectedDesign.price 
    : getGarmentBasePrice(garmentType);
  const fabricMod = FABRIC_OPTIONS.find((f) => f.name === selectedFabric)?.priceMod || 0;
  const estimatedTotal = basePrice + fabricMod;

  const validateStep = (currentStep) => {
    const errs = {};
    if (currentStep === 1) {
      if (designSelectionMode === "catalogue") {
        if (!selectedDesign || selectedDesign.isCustomUpload) {
          errs.design = "Please select a catalogue foundation design.";
        }
      } else {
        if (!customDesignImage && !customDesignTitle.trim()) {
          errs.design = "Please upload an outfit photo or enter a custom design title.";
        }
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
        errs.customerPhone = "Please enter a valid phone number (e.g. 0771699754)";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const newOrderId = `CEL-${Math.floor(1000 + Math.random() * 9000)}`;
      const finalDesignTitle = selectedDesign 
        ? selectedDesign.title 
        : (customDesignTitle.trim() || `Custom Bespoke ${garmentType}`);

      let newOrder = {
        id: newOrderId,
        customerName,
        customerPhone,
        customerEmail,
        designTitle: finalDesignTitle,
        designId: selectedDesign?.isCustomUpload ? "CEL-CUSTOM-UPLOAD" : (selectedDesign ? selectedDesign.id : "CEL-CUSTOM"),
        designImage: customDesignImage || selectedDesign?.image || "/images/hero-model.jpg",
        customReferenceImage: customDesignImage || null,
        isCustomDesign: Boolean(customDesignImage || selectedDesign?.isCustomUpload || !selectedDesign),
        customDesignNotes: customDesignNotes || specialNotes,
        colour: selectedColor,
        fabric: selectedFabric,
        silhouette: silhouette || "Standard / As in Design",
        neckline: neckline || "Standard / As in Design",
        sleeve: sleeve || "Standard / As in Design",
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

      // Persist to Spring Boot backend database
      try {
        const savedBackendOrder = await createOrderApi(newOrder);
        if (savedBackendOrder && savedBackendOrder.id) {
          newOrder = savedBackendOrder;
        }
      } catch (backendErr) {
        console.warn("Backend order creation warning (fallback to local state):", backendErr);
      }

      // Synchronize in local storage & update UI
      addOrder(newOrder);
      setSubmittedOrder(newOrder);
      window.scrollTo({ top: 80, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Design Reference Visual in Confirmation */}
          {submittedOrder.designImage && (
            <div className="my-5 mx-auto max-w-xs rounded-2xl overflow-hidden border border-amber-400/50 bg-black p-2.5 shadow-gold-md">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                <img src={submittedOrder.designImage} alt="Order Design Preview" className="h-full w-full object-cover" />
              </div>
              <p className="text-xs font-bold text-amber-300 mt-2 truncate">
                {submittedOrder.designTitle}
              </p>
              <span className="text-[10px] text-zinc-400 font-medium">
                {submittedOrder.isCustomDesign ? "Custom Uploaded Commission" : "Catalogue Selection"}
              </span>
            </div>
          )}

          <p className="mt-6 text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Our Akuressa master tailor has received your specifications. We will review your measurements and reach out via phone or WhatsApp at <strong className="text-zinc-200">{submittedOrder.customerPhone}</strong> to confirm fitting arrangements.
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
              href={`https://wa.me/94771699754?text=Hello%20Celoura%20Fashion,%20I%20just%20submitted%20order%20${submittedOrder.id}%20for%20${submittedOrder.customerName}.`}
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

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
        <p className="font-cinzel text-xs uppercase tracking-widest text-amber-300">
          Connecting to your Atelier Client Account...
        </p>
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

      {/* AI Stylist Recommendation Active Banner & Design Spotlight */}
      {isAiStylistSource && (
        <div className="mb-10 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-r from-[#14141f] via-[#0d0d14] to-[#14141f] p-5 sm:p-7 backdrop-blur-xl shadow-[0_15px_40px_rgba(212,175,55,0.22)] ring-1 ring-amber-400/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-500/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black shrink-0 shadow-gold-sm">
                <Sparkles className="h-5 w-5 fill-black animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                  Celoura AI Style Helper
                </span>
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                  Design Suggested by AI Stylist
                </h3>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 px-3.5 py-1 text-xs font-bold text-amber-300 shadow-gold-sm">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>Selected for Your Custom Order</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center">
            {/* Design Thumbnail Image */}
            {selectedDesign?.image && (
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-400/70 shadow-gold-sm bg-black">
                <Image
                  src={selectedDesign.image}
                  alt={selectedDesign.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            )}

            {/* Content Details */}
            <div className="flex-1 space-y-2 text-left w-full">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    {selectedDesign?.category || garmentType}
                  </span>
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                    {selectedDesign?.title || customDesignTitle || "Bespoke Custom Dress"}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Starting Price</span>
                  <span className="font-cinzel text-amber-300 text-base sm:text-lg font-bold">
                    {selectedDesign?.priceFormatted || (selectedDesign ? `LKR ${selectedDesign.price?.toLocaleString()}` : "")}
                  </span>
                </div>
              </div>

              {selectedDesign?.description && (
                <p className="text-xs text-zinc-300 line-clamp-2 mt-0.5 font-light">
                  {selectedDesign.description}
                </p>
              )}

              {/* Pre-configured AI Specs pills */}
              <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
                <div className="rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-amber-200">
                  <strong className="text-zinc-500 font-normal">Colour:</strong> <span className="font-semibold">{selectedColor}</span>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-amber-200">
                  <strong className="text-zinc-500 font-normal">Fabric:</strong> <span className="font-semibold">{selectedFabric}</span>
                </div>
                {silhouette && (
                  <div className="rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-amber-200">
                    <strong className="text-zinc-500 font-normal">Silhouette:</strong> <span className="font-semibold">{silhouette}</span>
                  </div>
                )}
                {neckline && (
                  <div className="rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-amber-200">
                    <strong className="text-zinc-500 font-normal">Neckline:</strong> <span className="font-semibold">{neckline}</span>
                  </div>
                )}
                {sleeve && (
                  <div className="rounded-lg border border-amber-500/30 bg-black/60 px-2.5 py-1 text-amber-200">
                    <strong className="text-zinc-500 font-normal">Sleeve:</strong> <span className="font-semibold">{sleeve}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-zinc-400 italic pt-1">
                *This dress was chosen by the AI Stylist to fit your body shape best. You can change any fabric, color, or neckline below, or proceed straight to measurements.
              </p>
            </div>
          </div>
        </div>
      )}

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

            {/* Garment Type Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                1. Select Garment Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: "Frocks & Gowns", label: "Frock / Gown", icon: "👗" },
                  { id: "Saree Blouses", label: "Saree Blouse", icon: "🥻" },
                  { id: "Designer Skirts", label: "Designer Skirt", icon: "✨" },
                  { id: "Couture Blouses", label: "Blouse / Top", icon: "✂️" },
                  { id: "Bridal Lehengas", label: "Bridal Lehenga", icon: "👑" },
                ].map((gt) => (
                  <button
                    key={gt.id}
                    type="button"
                    onClick={() => {
                      setGarmentType(gt.id);
                      const matching = designs.find((d) => d.category === gt.id);
                      if (matching) {
                        setSelectedDesign(matching);
                        setCustomDesignTitle(matching.title);
                        if (matching.silhouette) setSilhouette(matching.silhouette);
                      } else {
                        setSelectedDesign(null);
                        setCustomDesignTitle("");
                      }
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      garmentType === gt.id
                        ? "border-amber-400 bg-amber-400/20 shadow-gold-sm text-white"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl mb-1">{gt.icon}</span>
                    <span className="text-xs font-bold">{gt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Selector & Custom Upload Studio */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    2. Choose Foundation Design ({garmentType})
                  </label>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Select a signature design or customize your own with a photo reference.
                  </p>
                </div>

                {/* Option Toggle */}
                <div className="inline-flex rounded-full border border-amber-500/30 bg-zinc-950 p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setDesignSelectionMode("catalogue");
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.design;
                        return copy;
                      });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      designSelectionMode === "catalogue"
                        ? "bg-amber-400 text-black shadow-gold-sm font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Catalogue Designs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDesignSelectionMode("custom");
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.design;
                        return copy;
                      });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      designSelectionMode === "custom"
                        ? "bg-amber-400 text-black shadow-gold-sm font-bold"
                        : "text-amber-300/80 hover:text-amber-200"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Upload Custom Design</span>
                  </button>
                </div>
              </div>

              {/* Mode 1: Catalogue Designs Grid (Shown ONLY under 'Catalogue Designs') */}
              {designSelectionMode === "catalogue" && (
                <div className="space-y-4 animate-fadeIn">
                  {/* AI Suggested Foundation Banner if active */}
                  {isAiStylistSource && selectedDesign && (
                    <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-500/20 via-[#101018] to-amber-500/15 p-4 sm:p-5 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl overflow-hidden border-2 border-amber-400 bg-black shadow-gold-sm">
                          <Image src={selectedDesign.image} alt={selectedDesign.title} fill className="object-cover object-top" />
                        </div>
                        <div className="min-w-0">
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-black px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider mb-1">
                            <Sparkles className="h-2.5 w-2.5 fill-black" />
                            Design Suggested by Celoura AI Stylist
                          </span>
                          <h4 className="font-cinzel text-sm sm:text-base font-bold text-white truncate">
                            {selectedDesign.title}
                          </h4>
                          <p className="text-[11px] text-amber-300 font-semibold">
                            {selectedDesign.priceFormatted} · {selectedDesign.category}
                          </p>
                        </div>
                      </div>

                      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1 text-xs font-bold shrink-0">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Selected Foundation</span>
                      </span>
                    </div>
                  )}

                  {/* Design Cards Grid: Live database designs */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {designs
                      .filter((d) => d.category === garmentType)
                      .map((d) => {
                        const isSelected = selectedDesign?.id === d.id && !selectedDesign?.isCustomUpload;
                        return (
                          <div
                            key={d.id}
                            onClick={() => {
                              setSelectedDesign(d);
                              setCustomDesignTitle(d.title);
                              if (d.silhouette) setSilhouette(d.silhouette);
                              setDesignSelectionMode("catalogue");
                            }}
                            className={`cursor-pointer rounded-2xl border p-3 transition-all relative ${
                              isSelected
                                ? "border-amber-400 bg-amber-400/15 shadow-gold-md ring-2 ring-amber-400/70"
                                : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600"
                            }`}
                          >
                            <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden mb-2">
                              <Image src={d.image} alt={d.title} fill className="object-cover" />
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <p className="text-xs font-bold text-white truncate">{d.title}</p>
                              {isSelected && <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 stroke-[3]" />}
                            </div>
                            <p className="text-[11px] text-amber-400 font-semibold mt-0.5">{d.priceFormatted || `LKR ${d.price?.toLocaleString()}`}</p>
                          </div>
                        );
                      })}
                  </div>

                  {designs.filter((d) => d.category === garmentType).length === 0 && !loadingDesigns && (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center text-xs text-zinc-400">
                      No catalogue designs in this category yet. You can click &quot;Upload Custom Design&quot; above to customize with your own sketch or photo.
                    </div>
                  )}

                  {errors.design && <p className="text-xs text-red-400 mt-1">{errors.design}</p>}
                </div>
              )}

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,.pdf"
                onChange={(e) => handleImageFile(e.target.files?.[0])}
                className="hidden"
              />

              {/* Mode 2: Dedicated Custom Design Upload & Config Box (Shown ONLY under 'Upload Custom Design') */}
              {designSelectionMode === "custom" && (
                <div className="mt-2 rounded-2xl border border-amber-500/30 bg-black/60 p-4 sm:p-5 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
                        <Camera className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Customize Your Own Design (Upload Photo / Sketch)
                      </span>
                    </div>
                    {customDesignImage && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="h-3 w-3" />
                        Reference Attached
                      </span>
                    )}
                  </div>

                  {!customDesignImage ? (
                    /* DROPZONE */
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                        handleImageFile(e.dataTransfer.files?.[0]);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                        isDragOver
                          ? "border-amber-400 bg-amber-400/15 shadow-gold-md scale-[1.01]"
                          : "border-zinc-700 bg-zinc-950/70 hover:border-amber-400/70 hover:bg-zinc-900"
                      }`}
                    >
                      <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-amber-400/10 text-amber-400 mb-2.5">
                        <UploadCloud className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-bold text-white">
                        Drop your outfit photo here, or <span className="text-amber-400 underline font-semibold">browse files</span>
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-1 max-w-sm mx-auto">
                        Upload from phone or computer: PNG, JPG, WEBP, or HEIC (up to 10MB)
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="mt-3 btn-gold rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-black inline-flex items-center gap-1.5 shadow-gold-sm cursor-pointer"
                      >
                        <Camera className="h-3.5 w-3.5" />
                        <span>Choose Dress Photo</span>
                      </button>
                    </div>
                  ) : (
                    /* PREVIEW OF UPLOADED CUSTOM DESIGN */
                    <div className="rounded-2xl border border-amber-400/40 bg-zinc-950/90 p-3.5 sm:p-4">
                      <div className="grid sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-4 relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-amber-400/50 bg-black shadow-gold-sm">
                          <img
                            src={customDesignImage}
                            alt="Custom dress reference"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-semibold text-zinc-300 truncate">
                              {customDesignImageName}
                            </span>
                          </div>
                        </div>

                        <div className="sm:col-span-8 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                            <div>
                              <span className="text-xs font-bold text-amber-300">Custom Reference Attached</span>
                              <p className="text-[10px] text-zinc-400">Our tailors will replicate this dress</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-[11px] font-semibold text-amber-300 hover:text-white px-2.5 py-1 rounded-lg border border-amber-500/30 bg-zinc-900 cursor-pointer"
                              >
                                Change
                              </button>
                              <button
                                type="button"
                                onClick={handleClearCustomImage}
                                className="text-[11px] font-semibold text-red-400 hover:text-red-300 px-2 py-1 rounded-lg border border-red-500/30 bg-red-500/10 cursor-pointer"
                                title="Remove custom image"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] text-zinc-300 font-medium block mb-1">
                              Name Your Custom Design *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Victorian Corset Evening Gown in Wine Velvet"
                              value={customDesignTitle}
                              onChange={(e) => {
                                setCustomDesignTitle(e.target.value);
                                if (selectedDesign?.isCustomUpload) {
                                  setSelectedDesign((prev) => ({ ...prev, title: e.target.value }));
                                }
                              }}
                              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-zinc-300 font-medium block mb-1">
                              Specific Details From Photo (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Copy neckline from photo, but make sleeves 3/4 length"
                              value={customDesignNotes}
                              onChange={(e) => setCustomDesignNotes(e.target.value)}
                              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom title input if user prefers entering title without image */}
                  {!customDesignImage && (
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">
                        Or give your custom design a unique title / reference name:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Custom Bridal Velvet Lehenga with Peacock Motifs"
                          value={customDesignTitle}
                          onChange={(e) => {
                            setCustomDesignTitle(e.target.value);
                            if (selectedDesign && selectedDesign.title !== e.target.value && !selectedDesign.isCustomUpload) {
                              setSelectedDesign(null);
                            }
                          }}
                          className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="shrink-0 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-400 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Upload reference photo"
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Attach Photo</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {errors.design && <p className="text-xs text-red-400 mt-1">{errors.design}</p>}
                  {errors.customImage && <p className="text-xs text-red-400 mt-1">{errors.customImage}</p>}
                </div>
              )}
            </div>

            {/* Cut & Styling Specifications: Silhouette, Neckline & Sleeves */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                  {garmentType === "Frocks & Gowns" ? "Frock & Gown Silhouette Architecture" : garmentType === "Saree Blouses" ? "Saree Blouse Silhouette Architecture" : garmentType === "Designer Skirts" ? "Skirt Silhouette Architecture" : garmentType === "Couture Blouses" ? "Blouse Silhouette Architecture" : "Lehenga Silhouette Architecture"}{" "}
                  <span className="text-zinc-400 font-normal lowercase tracking-normal text-[11px]">(optional)</span>
                </label>
                <select
                  value={silhouette}
                  onChange={(e) => setSilhouette(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-zinc-400">Select Silhouette (Optional)</option>
                  {SILHOUETTES.map((s) => (
                    <option key={s} value={s} className="bg-zinc-900 text-white">{s}</option>
                  ))}
                  {silhouette && !SILHOUETTES.includes(silhouette) && (
                    <option value={silhouette} className="bg-zinc-900 text-white">{silhouette}</option>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                  Choli / Blouse Neckline{" "}
                  <span className="text-zinc-400 font-normal lowercase tracking-normal text-[11px]">(optional)</span>
                </label>
                <select
                  value={neckline}
                  onChange={(e) => setNeckline(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-zinc-400">Select Neckline (Optional)</option>
                  {NECKLINES.map((n) => (
                    <option key={n} value={n} className="bg-zinc-900 text-white">{n}</option>
                  ))}
                  {neckline && !NECKLINES.includes(neckline) && (
                    <option value={neckline} className="bg-zinc-900 text-white">{neckline}</option>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                  Sleeve Style{" "}
                  <span className="text-zinc-400 font-normal lowercase tracking-normal text-[11px]">(optional)</span>
                </label>
                <select
                  value={sleeve}
                  onChange={(e) => setSleeve(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-zinc-400">Select Sleeve Style (Optional)</option>
                  {SLEEVE_STYLES.map((sl) => (
                    <option key={sl} value={sl} className="bg-zinc-900 text-white">{sl}</option>
                  ))}
                  {sleeve && !SLEEVE_STYLES.includes(sleeve) && (
                    <option value={sleeve} className="bg-zinc-900 text-white">{sleeve}</option>
                  )}
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
                  Not sure about your exact measurements? Enter approximate numbers. Our master tailors will contact you or welcome you to our Akuressa boutique at No. 129, Yakabedda, Matara road, Akuressa for complimentary fine-fitting adjustments!
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
                  placeholder="e.g. 0771699754 or +94 77 169 9754"
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

              {customDesignImage && (
                <div className="flex items-center gap-3.5 rounded-xl border border-amber-500/30 bg-black/60 p-3">
                  <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-amber-400/50 shadow-gold-sm">
                    <img src={customDesignImage} alt="Custom Reference" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                      Custom Commission Reference Attached
                    </span>
                    <strong className="text-xs font-bold text-white block truncate">
                      {selectedDesign ? selectedDesign.title : (customDesignTitle || "Custom Bespoke Commission")}
                    </strong>
                    {customDesignNotes && (
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1 italic">
                        "{customDesignNotes}"
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Selected Design / AI Suggested Design Preview in Summary */}
              {selectedDesign && !customDesignImage && (
                <div className="flex items-center gap-3.5 rounded-xl border border-amber-500/40 bg-black/60 p-3.5 shadow-gold-sm">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg overflow-hidden border border-amber-400/50 shadow-gold-sm bg-black">
                    <Image src={selectedDesign.image} alt={selectedDesign.title} fill className="object-cover object-top" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      {isAiStylistSource ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-black px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider">
                          <Sparkles className="h-2.5 w-2.5 fill-black" />
                          Design Suggested by AI Stylist
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                          Selected Foundation Design
                        </span>
                      )}
                    </div>
                    <strong className="font-cinzel text-xs sm:text-sm font-bold text-white block truncate">
                      {selectedDesign.title}
                    </strong>
                    <span className="text-[11px] text-amber-300 font-semibold block">
                      {selectedDesign.priceFormatted} · {selectedDesign.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
                <p><strong className="text-zinc-500">Design:</strong> {selectedDesign ? selectedDesign.title : customDesignTitle || "Bespoke Dress"}</p>
                <p><strong className="text-zinc-500">Category:</strong> {garmentType}</p>
                <p><strong className="text-zinc-500">Silhouette:</strong> {silhouette || "Standard / As in Design"}</p>
                <p><strong className="text-zinc-500">Colour:</strong> {selectedColor}</p>
                <p><strong className="text-zinc-500">Fabric:</strong> {selectedFabric}</p>
                <p><strong className="text-zinc-500">Neckline:</strong> {neckline || "Standard / As in Design"}</p>
                <p><strong className="text-zinc-500">Sleeve:</strong> {sleeve || "Standard / As in Design"}</p>
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
                disabled={isSubmitting}
                className="btn-gold rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Transmitting Order to Atelier...</span>
                  </>
                ) : (
                  <>
                    <Scissors className="h-4 w-4" />
                    <span>Submit Custom Dress Request</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
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
