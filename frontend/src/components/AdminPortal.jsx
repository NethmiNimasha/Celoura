"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Crown, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Ruler, 
  Phone, 
  Mail, 
  Calendar, 
  Scissors, 
  TrendingUp, 
  Package, 
  Users,
  Sparkles,
  Save,
  X,
  LogOut,
  UploadCloud,
  ImageIcon,
  Camera,
  Loader2,
  Lock,
  MapPin,
  Building2,
  Check,
  Star
} from "lucide-react";
import { 
  getSavedOrders, 
  saveOrders, 
  updateOrderStatus, 
  getSavedDesigns, 
  saveDesigns, 
  getSavedReviews,
  saveReviews,
  ORDER_STATUSES,
  BUSINESS_INFO
} from "../lib/celouraData";
import { 
  getStoredUser, 
  logoutUser, 
  getAllOrdersApi, 
  updateOrderStatusApi, 
  deleteOrderApi,
  getAllDesignsApi,
  createDesignApi,
  updateDesignApi,
  deleteDesignApi,
  getAllReviewsApi,
  deleteReviewApi,
  getReviewStatsApi,
  getUserProfile,
  updateUserProfile
} from "../lib/api";

export default function AdminPortal() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "catalogue" | "settings" | "reviews"
  const [orders, setOrders] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({ totalReviews: 4, averageRating: 5.0, recommendationRate: "100%" });
  const [reviewRatingFilter, setReviewRatingFilter] = useState("all");
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [isDeletingReviewId, setIsDeletingReviewId] = useState(null);

  // Admin Profile info state
  const [adminName, setAdminName] = useState("Celoura Admin");
  const [adminEmail, setAdminEmail] = useState("admin@celourafashion.com");
  const [adminPhone, setAdminPhone] = useState("0771699754");
  const [adminAddress, setAdminAddress] = useState("No. 129, Yakabedda, Matara road, Akuressa");
  const [savingAdminProfile, setSavingAdminProfile] = useState(false);

  // Security password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });
  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage({ type: "", text: "" }), 3500);
  };

  // Filter state for orders
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  
  // Add Design State
  const [isAddDesignOpen, setIsAddDesignOpen] = useState(false);
  const [designImagePreview, setDesignImagePreview] = useState(null);
  const [isSubmittingDesign, setIsSubmittingDesign] = useState(false);
  const designFileInputRef = useRef(null);

  // Edit Design State
  const [editingDesign, setEditingDesign] = useState(null);
  const [isEditDesignOpen, setIsEditDesignOpen] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [isUpdatingDesign, setIsUpdatingDesign] = useState(false);
  const editFileInputRef = useRef(null);

  const [newDesign, setNewDesign] = useState({
    id: "CEL-DSG-NEW",
    title: "",
    category: "Bridal Lehengas",
    price: 150000,
    priceFormatted: "LKR 150,000",
    image: "/images/hero-lehenga.jpg",
    fabric: "Raw Silk",
    color: "Black & Gold",
    embroidery: "Handcrafted Antique Gold Zardozi",
    silhouette: "Circular Flared (6-Meter Gher)",
    featured: true,
    customizable: true,
    description: "",
  });

  useEffect(() => {
    const user = getStoredUser();
    if (!user || user.role !== "ROLE_ADMIN") {
      router.push("/signin?role=admin");
      return;
    }

    setCurrentUser(user);
    if (user.name) setAdminName(user.name);
    if (user.email) setAdminEmail(user.email);
    if (user.phone) setAdminPhone(user.phone);
    if (user.address) setAdminAddress(user.address);

    setAuthChecked(true);
    setOrders(getSavedOrders());
    setDesigns(getSavedDesigns());
    setReviews(getSavedReviews());

    // Sync fresh profile details from backend
    if (user.email) {
      getUserProfile(user.email)
        .then((profile) => {
          if (profile) {
            if (profile.name) setAdminName(profile.name);
            if (profile.phone) setAdminPhone(profile.phone);
            if (profile.address) setAdminAddress(profile.address);
          }
        })
        .catch(() => {});
    }

    // Fetch live orders from Spring Boot Backend
    getAllOrdersApi()
      .then((remoteOrders) => {
        if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
          setOrders(remoteOrders);
          saveOrders(remoteOrders);
        }
      })
      .catch((err) => {
        console.warn("Could not load backend orders for admin, using local fallback:", err);
      });

    // Fetch live designs from Spring Boot Backend
    getAllDesignsApi()
      .then((remoteDesigns) => {
        if (Array.isArray(remoteDesigns)) {
          setDesigns(remoteDesigns);
          saveDesigns(remoteDesigns);
        }
      })
      .catch((err) => {
        console.warn("Could not load backend designs for admin, using local fallback:", err);
        setDesigns(getSavedDesigns());
      });

    // Fetch live customer reviews and stats from Spring Boot Backend
    getAllReviewsApi()
      .then((remoteReviews) => {
        if (Array.isArray(remoteReviews) && remoteReviews.length > 0) {
          setReviews(remoteReviews);
          saveReviews(remoteReviews);
        }
      })
      .catch((err) => {
        console.warn("Could not load backend reviews for admin:", err);
      });

    getReviewStatsApi()
      .then((stats) => {
        if (stats && stats.totalReviews !== undefined) {
          setReviewStats(stats);
        }
      })
      .catch((err) => {
        console.warn("Could not load review stats:", err);
      });
  }, [router]);

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to permanently delete this customer review?")) return;
    setIsDeletingReviewId(reviewId);
    const remaining = reviews.filter((r) => r.id !== reviewId);
    setReviews(remaining);
    saveReviews(remaining);
    showToast("success", "Customer review removed.");

    try {
      await deleteReviewApi(reviewId);
      const updatedStats = await getReviewStatsApi();
      if (updatedStats) setReviewStats(updatedStats);
    } catch (err) {
      console.warn("Backend delete review failed:", err);
    } finally {
      setIsDeletingReviewId(null);
    }
  };

  const handleAdminSignOut = () => {
    logoutUser();
    router.push("/signin?role=admin");
  };

  const handleSaveAdminProfile = async (e) => {
    e.preventDefault();
    setSavingAdminProfile(true);
    try {
      await updateUserProfile(adminEmail, {
        name: adminName,
        phone: adminPhone,
        address: adminAddress,
      });
      showToast("success", "Administrator profile updated successfully.");
    } catch (err) {
      showToast("error", err.message || "Failed to update profile.");
    } finally {
      setSavingAdminProfile(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast("error", "Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("error", "New passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await updateUserProfile(adminEmail, {
        password: newPassword,
      });
      showToast("success", "Administrator password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showToast("error", err.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDesignImageUpload = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDesignImagePreview(reader.result);
      setNewDesign((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails({ ...selectedOrderDetails, status: newStatus });
    }
    showToast("success", `Order ${orderId} updated to ${newStatus}`);

    // Persist status change to Spring Boot Backend
    try {
      await updateOrderStatusApi(orderId, newStatus);
    } catch (err) {
      console.warn("Backend order status update failed:", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to permanently delete order ${orderId}?`)) return;
    const remaining = orders.filter((o) => o.id !== orderId);
    setOrders(remaining);
    saveOrders(remaining);
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails(null);
    }
    showToast("success", `Order ${orderId} deleted.`);

    try {
      await deleteOrderApi(orderId);
    } catch (err) {
      console.warn("Backend delete order failed:", err);
    }
  };

  const handleAddDesignSubmit = async (e) => {
    e.preventDefault();
    if (!newDesign.title) return;

    setIsSubmittingDesign(true);
    const finalImage = designImagePreview || newDesign.image || "/images/hero-model.jpg";
    const formattedDesign = {
      ...newDesign,
      id: newDesign.id || `CEL-DSG-${Math.floor(10 + Math.random() * 90)}`,
      image: finalImage,
      priceFormatted: `LKR ${Number(newDesign.price).toLocaleString()}`,
    };

    // Optimistically update locally
    const updatedDesigns = [formattedDesign, ...designs];
    setDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);

    // Save to Spring Boot PostgreSQL backend
    try {
      await createDesignApi(formattedDesign);
    } catch (err) {
      console.warn("Backend design save warning:", err);
    }

    setIsSubmittingDesign(false);
    setIsAddDesignOpen(false);
    setDesignImagePreview(null);
    setNewDesign({
      id: `CEL-DSG-${Math.floor(10 + Math.random() * 90)}`,
      title: "",
      category: "Bridal Lehengas",
      price: 150000,
      priceFormatted: "LKR 150,000",
      image: "/images/hero-lehenga.jpg",
      fabric: "Pure Raw Silk & Zari",
      color: "Black & Gold",
      embroidery: "Handcrafted Antique Gold Zardozi",
      silhouette: "Circular Flared (6-Meter Gher)",
      featured: true,
      customizable: true,
      description: "",
    });
    showToast("success", `New design "${formattedDesign.title}" published!`);
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm("Are you sure you want to remove this design from catalogue?")) return;
    const updated = designs.filter((d) => d.id !== id);
    setDesigns(updated);
    saveDesigns(updated);
    showToast("success", "Design removed from catalogue.");

    try {
      await deleteDesignApi(id);
    } catch (err) {
      console.warn("Backend delete design failed:", err);
    }
  };

  const handleOpenEditDesign = (design) => {
    setEditingDesign({ ...design });
    setEditImagePreview(design.image);
    setIsEditDesignOpen(true);
  };

  const handleEditDesignImageUpload = (file) => {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditImagePreview(reader.result);
      setEditingDesign((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateDesignSubmit = async (e) => {
    e.preventDefault();
    if (!editingDesign || !editingDesign.title) return;

    setIsUpdatingDesign(true);
    const finalImage = editImagePreview || editingDesign.image || "/images/hero-model.jpg";
    const formattedDesign = {
      ...editingDesign,
      image: finalImage,
      priceFormatted: `LKR ${Number(editingDesign.price).toLocaleString()}`,
    };

    const updatedDesigns = designs.map((d) => 
      d.id === formattedDesign.id ? formattedDesign : d
    );
    setDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);

    try {
      await updateDesignApi(formattedDesign.id, formattedDesign);
    } catch (err) {
      console.warn("Backend updateDesign warning:", err);
    }

    setIsUpdatingDesign(false);
    setIsEditDesignOpen(false);
    setEditingDesign(null);
    setEditImagePreview(null);
    showToast("success", `Design "${formattedDesign.title}" updated.`);
  };

  // Metrics
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const inProgressCount = orders.filter((o) => o.status === "In Progress").length;
  const readyCount = orders.filter((o) => o.status === "Ready").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    const matchesSearch =
      (o.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerPhone || "").includes(searchQuery) ||
      (o.designTitle || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesRating = reviewRatingFilter === "all" || String(r.rating) === String(reviewRatingFilter);
    const q = reviewSearchQuery.toLowerCase();
    const matchesSearch =
      (r.customerName || "").toLowerCase().includes(q) ||
      (r.comment || "").toLowerCase().includes(q) ||
      (r.reviewTitle || "").toLowerCase().includes(q) ||
      (r.garmentCategory || "").toLowerCase().includes(q) ||
      (r.designTitle || "").toLowerCase().includes(q) ||
      (r.location || "").toLowerCase().includes(q);
    return matchesRating && matchesSearch;
  });

  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <ShieldCheck className="h-10 w-10 text-amber-400 animate-pulse" />
        <p className="font-cinzel text-xs uppercase tracking-widest text-amber-300">
          Verifying Master Atelier Admin Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage.text && (
        <div 
          className={`fixed top-24 right-6 z-50 rounded-2xl border p-4 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fade-in ${
            toastMessage.type === "success" 
              ? "border-emerald-500/40 bg-emerald-950/90 text-emerald-200" 
              : "border-red-500/40 bg-red-950/90 text-red-200"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Profile & Atelier Header */}
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl mb-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* Atelier Brand Logo */}
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/80 bg-black/90 p-1 shadow-gold-md overflow-hidden">
              <Image
                src="/logo.png"
                alt="Celoura Fashion Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover rounded-full"
                priority
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1.5">
                <Crown className="h-3.5 w-3.5 text-amber-400" />
                <span>Master Atelier Administrator</span>
                <span className="text-[11px] text-zinc-500 font-mono normal-case">Member Since 2026</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                {adminName}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mt-1.5">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Mail className="h-3.5 w-3.5 text-amber-400" />
                  {adminEmail}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Phone className="h-3.5 w-3.5 text-amber-400" />
                  {adminPhone}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  No. 129, Yakabedda, Matara road, Akuressa, Sri Lanka
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddDesignOpen(true)}
              className="btn-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-gold-sm hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Design</span>
            </button>

            <button
              onClick={handleAdminSignOut}
              className="btn-gold-outline rounded-full px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400 flex items-center gap-1.5 cursor-pointer transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-8 pt-6 border-t border-zinc-800 text-xs">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold">Total Requests</span>
            <p className="font-cinzel text-2xl font-black text-white mt-1">{totalOrdersCount}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <span className="text-[10px] uppercase tracking-wider text-amber-300 block font-semibold">Pending Review</span>
            <p className="font-cinzel text-2xl font-black text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
            <span className="text-[10px] uppercase tracking-wider text-blue-300 block font-semibold">In Tailoring</span>
            <p className="font-cinzel text-2xl font-black text-blue-300 mt-1">{inProgressCount}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 block font-semibold">Ready / Fitting</span>
            <p className="font-cinzel text-2xl font-black text-emerald-300 mt-1">{readyCount}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase tracking-wider text-amber-300 block font-semibold">Revenue Pipeline</span>
            <p className="font-cinzel text-lg font-black text-amber-300 mt-1 truncate">
              LKR {(totalRevenue / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1.5 text-xs max-w-fit">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wider transition ${
            activeTab === "orders"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Scissors className="h-3.5 w-3.5" />
          <span>Atelier Orders ({totalOrdersCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("catalogue")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wider transition ${
            activeTab === "catalogue"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Design Catalogue ({designs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wider transition ${
            activeTab === "reviews"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${activeTab === "reviews" ? "fill-black text-black" : "fill-amber-400 text-amber-400"}`} />
          <span>Patron Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold uppercase tracking-wider transition ${
            activeTab === "settings"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>Admin Profile & Security</span>
        </button>
      </div>

      {/* TAB 1: ORDER MANAGEMENT */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-2xl border border-zinc-800 bg-[#0e0e14] p-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search orders by customer or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {["All", "Pending", "Confirmed", "In Progress", "Ready", "Completed", "Cancelled"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    statusFilter === st
                      ? "bg-amber-400 text-black font-bold shadow-gold-sm"
                      : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-3xl border border-amber-500/20 bg-[#0b0b10] shadow-xl">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="border-b border-zinc-800 bg-zinc-950 text-[11px] uppercase tracking-wider text-amber-300/90 font-cinzel">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Design & Details</th>
                  <th className="px-6 py-4">Event Date</th>
                  <th className="px-6 py-4">Quote</th>
                  <th className="px-6 py-4">Status & Update</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                      No customer orders match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-900/40 transition">
                      <td className="px-6 py-4 font-cinzel font-bold text-amber-400">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <strong className="text-white block">{order.customerName}</strong>
                        <span className="text-[11px] text-zinc-400">{order.customerPhone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <strong className="text-zinc-200 block truncate max-w-xs">{order.designTitle}</strong>
                        <span className="text-[11px] text-zinc-400">
                          {order.colour} • {order.fabric}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {order.eventDate || "Not specified"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">
                        LKR {order.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                            order.status === "Pending"
                              ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                              : order.status === "Confirmed"
                              ? "border-blue-400/60 bg-blue-400/10 text-blue-300"
                              : order.status === "In Progress"
                              ? "border-purple-400/60 bg-purple-400/10 text-purple-300"
                              : order.status === "Ready"
                              ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                              : order.status === "Completed"
                              ? "border-zinc-700 bg-zinc-900 text-zinc-400"
                              : "border-red-500/60 bg-red-500/10 text-red-300"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="rounded-full border border-amber-500/30 bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:border-amber-400 hover:text-white"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            title="Delete Order"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATALOGUE MANAGEMENT */}
      {activeTab === "catalogue" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-2xl border border-zinc-800 bg-[#0e0e14] p-4">
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">Live Design Catalogue</h3>
              <p className="text-xs text-zinc-400">Only designs published here are displayed across Celoura and in the AI Stylist.</p>
            </div>
            <button
              onClick={() => setIsAddDesignOpen(true)}
              className="btn-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-gold-sm hover:scale-105 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Design</span>
            </button>
          </div>

          {designs.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-12 text-center space-y-3">
              <Sparkles className="h-8 w-8 text-amber-400 mx-auto animate-pulse" />
              <h4 className="font-cinzel text-lg font-bold text-white">No Designs in Catalogue Yet</h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                All hard-coded designs have been cleared. Click below to add your first real couture dress or lehenga to showcase to customers.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsAddDesignOpen(true)}
                  className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black inline-flex items-center gap-2 shadow-gold-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish First Design</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {designs.map((design) => (
                <div key={design.id} className="card-luxury p-5 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden mb-3 border border-zinc-800 bg-black">
                      <img src={design.image} alt={design.title} className="h-full w-full object-cover" />
                      <span className="absolute top-2 left-2 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                        {design.category}
                      </span>
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-white truncate">{design.title}</h4>
                    <p className="text-xs font-bold text-amber-400 mt-1">{design.priceFormatted}</p>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{design.description}</p>
                    <div className="mt-3 text-[11px] text-zinc-400 space-y-1">
                      <p><strong>Fabric:</strong> {design.fabric}</p>
                      <p><strong>Embroidery:</strong> {design.embroidery}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between mt-4">
                    <span className="text-[11px] text-zinc-500 font-mono">{design.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditDesign(design)}
                        className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20 hover:text-amber-200 transition flex items-center gap-1"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteDesign(design.id)}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADMIN PROFILE & SECURITY */}
      {activeTab === "settings" && (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Form: Admin Details */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-[#0d0d14] p-6 sm:p-8 shadow-xl">
            <div className="border-b border-zinc-800 pb-4 mb-6">
              <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <span>Administrator Profile</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Maintain official boutique contact credentials and atelier address.
              </p>
            </div>

            <form onSubmit={handleSaveAdminProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Administrator Name</label>
                <input
                  type="text"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-300 block mb-1 font-semibold">Hotline Phone Number</label>
                  <input
                    type="text"
                    required
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-semibold">Administrator Email (Primary ID)</label>
                  <input
                    type="email"
                    disabled
                    value={adminEmail}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Atelier Boutique Address</label>
                <input
                  type="text"
                  required
                  value={adminAddress}
                  onChange={(e) => setAdminAddress(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={savingAdminProfile}
                  className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60"
                >
                  {savingAdminProfile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Profile Details</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Form: Change Password */}
          <div className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-[#0d0d14] p-6 sm:p-8 shadow-xl">
            <div className="border-b border-zinc-800 pb-4 mb-6">
              <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-amber-400" />
                <span>Security & Password</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Update master atelier administrator password credentials.
              </p>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-300 block mb-1 font-semibold">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="btn-gold-outline rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-black hover:bg-amber-400 flex items-center gap-2 shadow-gold-sm disabled:opacity-60"
                >
                  {savingPassword ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: REVIEWS & RATINGS MANAGEMENT */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          {/* Reviews Scorecard & KPI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-[#0d0d14] to-zinc-950 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold block">
                  Overall Atelier Rating
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-cinzel text-4xl sm:text-5xl font-black text-amber-300">
                    {reviewStats.averageRating ? reviewStats.averageRating.toFixed(1) : "5.0"}
                  </span>
                  <span className="text-zinc-500 text-sm">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 mt-4">
                Computed live across verified patron bespoke reviews.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-[#0d0d14] p-6 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                  Total Reviews Received
                </span>
                <p className="font-cinzel text-4xl sm:text-5xl font-black text-white mt-2">
                  {reviews.length}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 mt-4">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>100% Verified Couture Patrons</span>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-[#0d0d14] p-6 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block">
                  Recommendation Rate
                </span>
                <p className="font-cinzel text-4xl sm:text-5xl font-black text-amber-300 mt-2">
                  {reviewStats.recommendationRate || "100%"}
                </p>
              </div>
              <p className="text-[11px] text-zinc-400 mt-4">
                Patrons would recommend Celoura atelier bespoke tailoring.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-[#0d0d14] p-6 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                  Rating Distribution
                </span>
                <div className="space-y-1.5 text-[11px]">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="w-7 text-zinc-400 flex items-center gap-0.5">
                          {star} <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-right text-zinc-500 font-mono text-[10px]">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-2xl border border-zinc-800 bg-[#0e0e14] p-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search reviews by client, garment, location..."
                value={reviewSearchQuery}
                onChange={(e) => setReviewSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
              />
              {reviewSearchQuery && (
                <button
                  onClick={() => setReviewSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Star Rating Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-zinc-400 flex items-center gap-1 mr-1">
                <Filter className="h-3 w-3 text-amber-400" />
                Filter:
              </span>
              {[
                { id: "all", label: `All (${reviews.length})` },
                { id: "5", label: `5 Stars (${reviews.filter((r) => r.rating === 5).length})` },
                { id: "4", label: `4 Stars (${reviews.filter((r) => r.rating === 4).length})` },
                { id: "3", label: `3 Stars (${reviews.filter((r) => r.rating === 3).length})` },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setReviewRatingFilter(pill.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    reviewRatingFilter === pill.id
                      ? "bg-amber-400 text-black shadow-gold-sm"
                      : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-[#0d0d14] p-12 text-center space-y-3">
              <Star className="h-8 w-8 text-amber-400/40 mx-auto" />
              <h3 className="font-cinzel text-lg font-bold text-white">No Reviews Match</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No customer ratings found matching your current filter. Try resetting search query or rating filter.
              </p>
              <button
                onClick={() => {
                  setReviewSearchQuery("");
                  setReviewRatingFilter("all");
                }}
                className="btn-gold-outline rounded-full px-4 py-1.5 text-xs text-amber-300 font-semibold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-3xl border border-zinc-800/80 bg-[#0d0d14] p-6 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    {/* Header: Stars + Category Pill + Delete */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-zinc-700"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-amber-300 ml-1.5">
                            {review.rating}.0
                          </span>
                        </div>
                        <h4 className="font-cinzel text-base font-bold text-white group-hover:text-amber-200 transition">
                          "{review.reviewTitle}"
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {review.garmentCategory && (
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 shrink-0">
                            {review.garmentCategory}
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          disabled={isDeletingReviewId === review.id}
                          title="Delete Review"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition shrink-0 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="mt-3 text-xs text-zinc-300 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Patron Footer */}
                  <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full border border-amber-400/40 bg-zinc-900 flex items-center justify-center font-bold text-amber-300 font-cinzel text-xs">
                        {review.customerName ? review.customerName.charAt(0) : "P"}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-white">{review.customerName}</span>
                          {review.verifiedPurchase && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-medium">
                              <ShieldCheck className="h-3 w-3" />
                              <span>Verified Patron</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                          {review.customerEmail && <span>{review.customerEmail}</span>}
                          {review.location && (
                            <>
                              <span>•</span>
                              <span>{review.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-zinc-500 font-mono">
                      {review.createdAt ? review.createdAt.split("T")[0] : "Verified"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: ORDER DETAILS */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <h3 className="font-cinzel text-2xl font-black text-amber-400">
                {selectedOrderDetails.id}
              </h3>
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                {selectedOrderDetails.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6 text-xs text-zinc-300">
              <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <span className="font-bold text-amber-300 block mb-2 uppercase tracking-wider">Customer Details</span>
                <p><strong>Name:</strong> {selectedOrderDetails.customerName}</p>
                <p><strong>Phone:</strong> {selectedOrderDetails.customerPhone}</p>
                <p><strong>Email:</strong> {selectedOrderDetails.customerEmail}</p>
                <p><strong>Event Date:</strong> {selectedOrderDetails.eventDate}</p>
              </div>

              <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <span className="font-bold text-amber-300 block mb-2 uppercase tracking-wider">Garment Choice</span>
                <p><strong>Design:</strong> {selectedOrderDetails.designTitle}</p>
                <p><strong>Silhouette:</strong> {selectedOrderDetails.silhouette}</p>
                <p><strong>Colour:</strong> {selectedOrderDetails.colour}</p>
                <p><strong>Fabric:</strong> {selectedOrderDetails.fabric}</p>
                <p><strong>Quote Total:</strong> LKR {selectedOrderDetails.totalAmount?.toLocaleString()}</p>
              </div>
            </div>

            {/* Custom Design Image Reference if attached */}
            {(selectedOrderDetails.designImage || selectedOrderDetails.customReferenceImage) && (
              <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-4 mb-6">
                <span className="font-bold text-amber-300 block mb-2 text-xs uppercase tracking-wider">
                  Attached Design Reference Photo
                </span>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative aspect-[4/3] w-48 shrink-0 rounded-xl overflow-hidden border border-amber-400/50 shadow-gold-sm bg-black">
                    <img
                      src={selectedOrderDetails.customReferenceImage || selectedOrderDetails.designImage}
                      alt="Custom Design Reference"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-zinc-300 space-y-1">
                    <p><strong className="text-white">Design Style:</strong> {selectedOrderDetails.designTitle}</p>
                    {selectedOrderDetails.customDesignNotes && (
                      <p><strong className="text-white">Client Notes:</strong> {selectedOrderDetails.customDesignNotes}</p>
                    )}
                    <span className="inline-block text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-500/30 mt-1">
                      {selectedOrderDetails.isCustomDesign ? "Custom Client Upload" : "Catalogue Foundation"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Measurements Section */}
            {selectedOrderDetails.measurements && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-6">
                <span className="font-bold text-amber-300 block mb-3 text-xs uppercase tracking-wider">
                  Client Measurements ({selectedOrderDetails.measurements.unit || "inches"})
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-xs">
                  {Object.entries(selectedOrderDetails.measurements).map(([k, v]) => {
                    if (k === "unit" || !v) return null;
                    return (
                      <div key={k} className="rounded-xl bg-zinc-900 p-2.5">
                        <span className="text-[10px] uppercase text-zinc-400 block">{k}</span>
                        <strong className="text-white text-sm">{v}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Status Updater & Actions */}
            <div className="rounded-2xl border border-amber-500/20 bg-zinc-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-300 font-semibold">Change Order Status:</span>
              <div className="flex flex-wrap gap-2 items-center">
                {["Pending", "Confirmed", "In Progress", "Ready", "Completed", "Cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selectedOrderDetails.id, s)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      selectedOrderDetails.status === s
                        ? "bg-amber-400 text-black shadow-gold-sm"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => handleDeleteOrder(selectedOrderDetails.id)}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition flex items-center gap-1 ml-2"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW DESIGN */}
      {isAddDesignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setIsAddDesignOpen(false);
                setDesignImagePreview(null);
              }}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 transition"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-2">
                <Crown className="h-3 w-3 text-amber-400" />
                <span>Atelier Fashion Creator</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-amber-400" />
                <span>Add Haute Design to Catalogue</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                New designs will immediately become available in the catalogue and for clients ordering bespoke fittings.
              </p>
            </div>

            <form onSubmit={handleAddDesignSubmit} className="space-y-4 text-xs">
              {/* Image Upload & Preview Section */}
              <div>
                <label className="text-zinc-300 block mb-1.5 font-medium flex items-center justify-between">
                  <span>Garment Photo *</span>
                  <span className="text-[11px] text-amber-400">Custom Photo or High-Res Preset</span>
                </label>

                <input
                  type="file"
                  ref={designFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleDesignImageUpload(e.target.files?.[0])}
                />

                {designImagePreview ? (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black shadow-gold-sm mb-3">
                    <img
                      src={designImagePreview}
                      alt="New Design Preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => designFileInputRef.current?.click()}
                        className="rounded-full bg-black/80 px-3 py-1.5 text-[11px] font-semibold text-amber-300 border border-amber-400/50 hover:bg-black"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setDesignImagePreview(null)}
                        className="rounded-full bg-red-900/80 px-3 py-1.5 text-[11px] font-semibold text-red-200 border border-red-500/50 hover:bg-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => designFileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-2xl p-6 text-center cursor-pointer transition bg-zinc-950/60 hover:bg-zinc-900/60 group mb-3"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 group-hover:scale-110 transition">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-white">
                      Click to upload garment photograph
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Supports JPG, PNG, WEBP from your computer
                    </p>
                  </div>
                )}

                {/* Quick Presets Picker */}
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-1.5">Or choose an atelier studio preset:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Gold Frock", img: "/images/frock-evening.jpg" },
                      { name: "Bridal Blouse", img: "/images/saree-blouse.jpg" },
                      { name: "Flared Skirt", img: "/images/skirt-flare.jpg" },
                      { name: "Ivory Dream", img: "/images/ivory-dream.jpg" },
                      { name: "Wine Velvet", img: "/images/wine-elegance.jpg" },
                      { name: "Rose Saree", img: "/images/saree-pink.jpg" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setDesignImagePreview(preset.img);
                          setNewDesign((prev) => ({ ...prev, image: preset.img }));
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] transition ${
                          designImagePreview === preset.img
                            ? "border-amber-400 bg-amber-400/20 text-amber-300 font-bold"
                            : "border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Title */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Design Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jahanara Velvet Lehenga"
                  value={newDesign.title}
                  onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Category *</label>
                  <select
                    value={newDesign.category}
                    onChange={(e) => setNewDesign({ ...newDesign, category: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Frocks & Gowns">Frocks & Gowns</option>
                    <option value="Saree Blouses">Saree Blouses</option>
                    <option value="Designer Skirts">Designer Skirts</option>
                    <option value="Couture Blouses">Couture Blouses</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Starting Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={newDesign.price}
                    onChange={(e) => setNewDesign({ ...newDesign, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Silhouette & Embroidery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Silhouette</label>
                  <select
                    value={newDesign.silhouette}
                    onChange={(e) => setNewDesign({ ...newDesign, silhouette: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Circular Flared (6-Meter Gher)">Circular Flared (6-Meter Gher)</option>
                    <option value="Heavy A-Line Flare with Triple Can-Can">Heavy A-Line Flare with Triple Can-Can</option>
                    <option value="Flared Trail Skirt with Structured Waist">Flared Trail Skirt with Structured Waist</option>
                    <option value="Princess Cut Bridal Blouse">Princess Cut Bridal Blouse</option>
                    <option value="A-Line Flared Frock">A-Line Flared Frock</option>
                    <option value="Paneled Fluted Mermaid">Paneled Fluted Mermaid</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Embroidery Style</label>
                  <input
                    type="text"
                    value={newDesign.embroidery}
                    onChange={(e) => setNewDesign({ ...newDesign, embroidery: e.target.value })}
                    placeholder="e.g. Handcrafted Antique Gold Zardozi & Dabka"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Fabric & Colour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Fabric Type</label>
                  <input
                    type="text"
                    value={newDesign.fabric}
                    onChange={(e) => setNewDesign({ ...newDesign, fabric: e.target.value })}
                    placeholder="e.g. Pure Raw Silk & Italian Velvet"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Colour</label>
                  <input
                    type="text"
                    value={newDesign.color}
                    onChange={(e) => setNewDesign({ ...newDesign, color: e.target.value })}
                    placeholder="e.g. Obsidian Black & Imperial Gold"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Couture Description</label>
                <textarea
                  rows={3}
                  value={newDesign.description}
                  onChange={(e) => setNewDesign({ ...newDesign, description: e.target.value })}
                  placeholder="Artisan craftsmanship details, embroidery motifs, fitting recommendations..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddDesignOpen(false);
                    setDesignImagePreview(null);
                  }}
                  className="btn-gold-outline rounded-full px-5 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDesign}
                  className="btn-gold rounded-full px-7 py-2.5 font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60"
                >
                  {isSubmittingDesign ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Saving to Catalogue...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Publish Design</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DESIGN */}
      {isEditDesignOpen && editingDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-amber-500/40 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setIsEditDesignOpen(false);
                setEditingDesign(null);
                setEditImagePreview(null);
              }}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 transition"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-[11px] font-semibold text-amber-300 uppercase tracking-widest mb-2">
                <Crown className="h-3 w-3 text-amber-400" />
                <span>Atelier Fashion Editor &bull; {editingDesign.id}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-amber-400" />
                <span>Edit Design Details</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Update couture specifications, photo, pricing, and descriptions for this design.
              </p>
            </div>

            <form onSubmit={handleUpdateDesignSubmit} className="space-y-4 text-xs">
              {/* Image Upload & Preview Section */}
              <div>
                <label className="text-zinc-300 block mb-1.5 font-medium flex items-center justify-between">
                  <span>Garment Photo *</span>
                  <span className="text-[11px] text-amber-400">Custom Photo or High-Res Preset</span>
                </label>

                <input
                  type="file"
                  ref={editFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleEditDesignImageUpload(e.target.files?.[0])}
                />

                {editImagePreview ? (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black shadow-gold-sm mb-3">
                    <img
                      src={editImagePreview}
                      alt="Edit Design Preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="rounded-full bg-black/80 px-3 py-1.5 text-[11px] font-semibold text-amber-300 border border-amber-400/50 hover:bg-black"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditImagePreview(null);
                          setEditingDesign((prev) => ({ ...prev, image: "" }));
                        }}
                        className="rounded-full bg-red-900/80 px-3 py-1.5 text-[11px] font-semibold text-red-200 border border-red-500/50 hover:bg-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => editFileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-700 hover:border-amber-400 rounded-2xl p-6 text-center cursor-pointer transition bg-zinc-950/60 hover:bg-zinc-900/60 group mb-3"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 group-hover:scale-110 transition">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-white">
                      Click to upload new garment photograph
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Supports JPG, PNG, WEBP from your computer
                    </p>
                  </div>
                )}

                {/* Quick Presets Picker */}
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-1.5">Or choose an atelier studio preset:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Gold Frock", img: "/images/frock-evening.jpg" },
                      { name: "Bridal Blouse", img: "/images/saree-blouse.jpg" },
                      { name: "Flared Skirt", img: "/images/skirt-flare.jpg" },
                      { name: "Ivory Dream", img: "/images/ivory-dream.jpg" },
                      { name: "Wine Velvet", img: "/images/wine-elegance.jpg" },
                      { name: "Rose Saree", img: "/images/saree-pink.jpg" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setEditImagePreview(preset.img);
                          setEditingDesign((prev) => ({ ...prev, image: preset.img }));
                        }}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] transition ${
                          editImagePreview === preset.img
                            ? "border-amber-400 bg-amber-400/20 text-amber-300 font-bold"
                            : "border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Title */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Design Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Jahanara Velvet Lehenga"
                  value={editingDesign.title || ""}
                  onChange={(e) => setEditingDesign({ ...editingDesign, title: e.target.value })}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Category *</label>
                  <select
                    value={editingDesign.category || "Bridal Lehengas"}
                    onChange={(e) => setEditingDesign({ ...editingDesign, category: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Frocks & Gowns">Frocks & Gowns</option>
                    <option value="Saree Blouses">Saree Blouses</option>
                    <option value="Designer Skirts">Designer Skirts</option>
                    <option value="Couture Blouses">Couture Blouses</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Starting Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={editingDesign.price || 0}
                    onChange={(e) => setEditingDesign({ ...editingDesign, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Silhouette & Embroidery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Silhouette</label>
                  <select
                    value={editingDesign.silhouette || "Circular Flared (6-Meter Gher)"}
                    onChange={(e) => setEditingDesign({ ...editingDesign, silhouette: e.target.value })}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Circular Flared (6-Meter Gher)">Circular Flared (6-Meter Gher)</option>
                    <option value="Heavy A-Line Flare with Triple Can-Can">Heavy A-Line Flare with Triple Can-Can</option>
                    <option value="Flared Trail Skirt with Structured Waist">Flared Trail Skirt with Structured Waist</option>
                    <option value="Princess Cut Bridal Blouse">Princess Cut Bridal Blouse</option>
                    <option value="A-Line Flared Frock">A-Line Flared Frock</option>
                    <option value="Paneled Fluted Mermaid">Paneled Fluted Mermaid</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Embroidery Style</label>
                  <input
                    type="text"
                    value={editingDesign.embroidery || ""}
                    onChange={(e) => setEditingDesign({ ...editingDesign, embroidery: e.target.value })}
                    placeholder="e.g. Handcrafted Antique Gold Zardozi & Dabka"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Fabric & Colour */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Fabric Type</label>
                  <input
                    type="text"
                    value={editingDesign.fabric || ""}
                    onChange={(e) => setEditingDesign({ ...editingDesign, fabric: e.target.value })}
                    placeholder="e.g. Pure Raw Silk & Italian Velvet"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 block mb-1 font-medium">Colour</label>
                  <input
                    type="text"
                    value={editingDesign.color || ""}
                    onChange={(e) => setEditingDesign({ ...editingDesign, color: e.target.value })}
                    placeholder="e.g. Obsidian Black & Imperial Gold"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-zinc-300 block mb-1 font-medium">Couture Description</label>
                <textarea
                  rows={3}
                  value={editingDesign.description || ""}
                  onChange={(e) => setEditingDesign({ ...editingDesign, description: e.target.value })}
                  placeholder="Artisan craftsmanship details, embroidery motifs, fitting recommendations..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-white focus:border-amber-400 focus:outline-none placeholder-zinc-500"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditDesignOpen(false);
                    setEditingDesign(null);
                    setEditImagePreview(null);
                  }}
                  className="btn-gold-outline rounded-full px-5 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingDesign}
                  className="btn-gold rounded-full px-7 py-2.5 font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60"
                >
                  {isUpdatingDesign ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Updating Design...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Update Design</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
