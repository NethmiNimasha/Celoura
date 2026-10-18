"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  User, 
  Crown, 
  Scissors, 
  Clock, 
  Ruler, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin,
  Save, 
  LogOut,
  ShieldCheck,
  FileText,
  Loader2,
  Lock,
  Edit2,
  Check,
  AlertCircle,
  Package
} from "lucide-react";
import { getSavedOrders } from "../../lib/celouraData";
import { getStoredUser, logoutUser, getUserProfile, updateUserProfile } from "../../lib/api";

export default function CustomerProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal"); // "personal" | "measurements" | "orders" | "security"

  // Personal Info Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");
  const [memberSince, setMemberSince] = useState("2026");

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Measurements State
  const [savedMeasurements, setSavedMeasurements] = useState({
    bust: "36",
    waist: "29",
    hip: "39",
    shoulder: "14.5",
    armhole: "16",
    sleeveLength: "21",
    blouseLength: "14.5",
    lehengaWaist: "30",
    lehengaLength: "42",
    unit: "inches",
  });
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([]);

  // UI States
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });

  const showToast = (type, text) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage({ type: "", text: "" }), 3500);
  };

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.push("/signin");
      return;
    }

    setCurrentUser(user);
    setName(user.name || "Valued Patron");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setAddress(user.address || "No. 129, Yakabedda, Matara road, Akuressa");
    setRole(user.role || "ROLE_CUSTOMER");

    // Fetch latest fresh profile details from backend
    if (user.email) {
      getUserProfile(user.email)
        .then((profile) => {
          if (profile) {
            if (profile.name) setName(profile.name);
            if (profile.phone) setPhone(profile.phone);
            if (profile.address) setAddress(profile.address);
            if (profile.createdAt) {
              const year = new Date(profile.createdAt).getFullYear();
              setMemberSince(isNaN(year) ? "2026" : String(year));
            }
          }
        })
        .catch(() => {
          // Fallback to local session
        });
    }

    // Load user's saved measurements from localStorage
    const userMeasKey = `celoura_measurements_${user.email}`;
    const storedMeas = typeof window !== "undefined" ? localStorage.getItem(userMeasKey) : null;
    if (storedMeas) {
      try {
        setSavedMeasurements(JSON.parse(storedMeas));
      } catch (err) {
        console.error(err);
      }
    }

    // Filter user's dress orders
    const all = getSavedOrders();
    const userEmailNorm = (user.email || "").toLowerCase().trim();
    const userNameNorm = (user.name || "").toLowerCase().trim();

    const myOrders = all.filter((o) => {
      const oEmailNorm = (o.customerEmail || "").toLowerCase().trim();
      const oNameNorm = (o.customerName || "").toLowerCase().trim();

      if (userEmailNorm && oEmailNorm === userEmailNorm) return true;
      if (userEmailNorm.includes("ayesha") && oEmailNorm.includes("ayesha")) return true;
      if (userEmailNorm.includes("ayyesha") && oEmailNorm.includes("ayesha")) return true;
      if (user.phone && o.customerPhone && user.phone.replace(/\D/g, "") === o.customerPhone.replace(/\D/g, "")) return true;
      if (userNameNorm && oNameNorm === userNameNorm) return true;
      return false;
    });

    if (myOrders.length > 0 && !storedMeas && myOrders[0].measurements) {
      setSavedMeasurements((prev) => ({
        ...prev,
        ...myOrders[0].measurements,
      }));
    }

    setOrders(myOrders);
    setLoading(false);
  }, [router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("error", "Name and phone number cannot be empty.");
      return;
    }

    setSavingProfile(true);
    try {
      await updateUserProfile(email, {
        name,
        phone,
        address,
      });
      showToast("success", "Customer profile updated successfully!");
    } catch (err) {
      showToast("error", err.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast("error", "Please enter both your current and new password.");
      return;
    }
    if (newPassword.length < 6) {
      showToast("error", "New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("error", "New password confirmation does not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await updateUserProfile(email, {
        name,
        phone,
        address,
        currentPassword,
        newPassword,
      });
      showToast("success", "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      showToast("error", err.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleSaveMeasurements = (e) => {
    e.preventDefault();
    setIsEditingMeasurements(false);
    if (currentUser?.email && typeof window !== "undefined") {
      localStorage.setItem(
        `celoura_measurements_${currentUser.email}`,
        JSON.stringify(savedMeasurements)
      );
    }
    showToast("success", "Bespoke measurements saved successfully!");
  };

  const handleSignOut = () => {
    logoutUser();
    router.push("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
        <p className="font-cinzel text-xs uppercase tracking-widest text-amber-300">
          Loading Customer Atelier Profile...
        </p>
      </div>
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "CP";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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

      {/* Hero Customer Profile Header */}
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl mb-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Monogram Avatar with gold crest */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-amber-500/20 via-black to-zinc-950 text-amber-300 shadow-gold-md overflow-hidden shrink-0">
              <span className="font-cinzel text-2xl font-black tracking-wider text-amber-300">
                {initials}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  <Crown className="h-3 w-3 text-amber-400" />
                  <span>{role === "ROLE_ADMIN" ? "Master Atelier Administrator" : "VIP Bridal Patron"}</span>
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">Member Since {memberSince}</span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-white mt-1">
                {name}
              </h1>

              <p className="text-xs text-zinc-400 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-amber-400/80" />
                  {email}
                </span>
                {phone && (
                  <>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-amber-400/80" />
                      {phone}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/order"
              className="btn-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-gold-sm hover:scale-105 transition-all"
            >
              <Scissors className="h-3.5 w-3.5" />
              <span>New Custom Order</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="btn-gold-outline rounded-full px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400 flex items-center gap-1.5 cursor-pointer transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Profile Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-zinc-800 text-xs">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 text-center">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Active Requests</span>
            <span className="font-cinzel text-lg font-bold text-amber-300 mt-0.5 block">{orders.length}</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 text-center">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Saved Measurements</span>
            <span className="font-cinzel text-lg font-bold text-amber-300 mt-0.5 block">8 Points</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 text-center">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Fitting Boutique</span>
            <span className="font-cinzel text-xs font-bold text-white mt-1 block">Akuressa Atelier</span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 text-center">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Status</span>
            <span className="font-cinzel text-xs font-bold text-emerald-400 mt-1 block">Active Patron</span>
          </div>
        </div>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1.5 max-w-2xl">
        <button
          type="button"
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "personal"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>Personal Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("measurements")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "measurements"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Ruler className="h-3.5 w-3.5" />
          <span>Measurements</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "orders"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Custom Orders ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "security"
              ? "bg-amber-400 text-black shadow-gold-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>Security</span>
        </button>
      </div>

      {/* TAB 1: PERSONAL DETAILS */}
      {activeTab === "personal" && (
        <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
          <div className="lg:col-span-8 rounded-3xl border border-amber-500/20 bg-[#0d0d14] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-amber-400" />
                  <span>Client Information</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Update your contact info and boutique delivery destination.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayesha Jayawardena"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0771699754"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-zinc-300 font-medium block mb-1.5">
                  Email Address <span className="text-[10px] text-zinc-500">(Primary Account ID)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 pl-10 pr-4 py-2.5 text-zinc-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-300 font-medium block mb-1.5">
                  Boutique Delivery & Fitting Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. No. 129, Yakabedda, Matara road, Akuressa"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60 cursor-pointer"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Profile Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-amber-500/20 bg-[#0d0d14] p-6 shadow-xl">
              <h3 className="font-cinzel text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
                Atelier Concierge
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Need to arrange an in-person measurement session or request fabric swatches? Our Akuressa boutique master tailors are available daily.
              </p>

              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2 text-xs">
                <p className="text-zinc-300 font-medium">Boutique Workshop:</p>
                <p className="text-zinc-400">No. 129, Yakabedda, Matara road, Akuressa</p>
                <p className="text-zinc-400">Hours: 8:00 AM – 6:00 PM</p>
                <p className="text-amber-400 font-semibold mt-1">Direct: 0771699754</p>
              </div>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Schedule Private Fitting</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BESPOKE MEASUREMENTS */}
      {activeTab === "measurements" && (
        <div className="rounded-3xl border border-amber-500/20 bg-[#0d0d14] p-6 sm:p-8 shadow-xl animate-fade-in space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                <Ruler className="h-5 w-5 text-amber-400" />
                <span>Saved Couture Measurements</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                These dimensions are auto-applied to your custom gowns, lehengas, and saree blouses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isEditingMeasurements ? (
                <button
                  type="button"
                  onClick={() => setIsEditingMeasurements(true)}
                  className="btn-gold rounded-full px-5 py-2 text-xs font-bold text-black flex items-center gap-1.5 cursor-pointer shadow-gold-sm"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit Measurements</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingMeasurements(false)}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSaveMeasurements}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {Object.entries(savedMeasurements).map(([key, val]) => {
                if (key === "unit") return null;
                return (
                  <div key={key} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1.5">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    {isEditingMeasurements ? (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          setSavedMeasurements({
                            ...savedMeasurements,
                            [key]: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    ) : (
                      <span className="font-cinzel font-bold text-white text-base">
                        {val} <span className="text-xs font-normal text-amber-400">{savedMeasurements.unit}</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {isEditingMeasurements && (
              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                <button
                  type="submit"
                  className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-gold-sm cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Measurements</span>
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 3: CUSTOM ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-400" />
              <span>Commission History & Live Tracking</span>
            </h2>
            <span className="text-xs text-zinc-400">
              {orders.length} custom commission{orders.length === 1 ? "" : "s"}
            </span>
          </div>

          {orders.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="card-luxury p-6 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel font-bold text-amber-400 text-sm">
                          {order.id}
                        </span>
                        <span className="text-xs text-zinc-400">• {order.orderDate}</span>
                      </div>

                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                          order.status === "Ready"
                            ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40"
                            : order.status === "In Progress"
                            ? "bg-purple-400/20 text-purple-300 border border-purple-400/40"
                            : order.status === "Confirmed"
                            ? "bg-blue-400/20 text-blue-300 border border-blue-400/40"
                            : "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-lg font-bold text-white mt-3">
                      {order.designTitle}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-400">
                      <p>Colour: <strong className="text-zinc-200">{order.colour}</strong></p>
                      <p>Fabric: <strong className="text-zinc-200">{order.fabric}</strong></p>
                      <p>Target Date: <strong className="text-amber-300">{order.eventDate}</strong></p>
                      <p>Quote: <strong className="text-white">LKR {order.totalAmount?.toLocaleString()}</strong></p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">
                      Tailor: {order.assignedArtisan || "Akuressa Atelier"}
                    </span>

                    <Link
                      href={`/track?orderId=${order.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <span>Track Live</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10 text-center space-y-4 border border-dashed border-amber-500/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                <Scissors className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  No Active Custom Orders Yet
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                  Commission your bespoke bridal lehenga, saree blouse, or evening frock directly with our Akuressa masters.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/order"
                  className="btn-gold inline-flex rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black items-center gap-2 shadow-gold-sm hover:scale-105 transition-all"
                >
                  <Scissors className="h-4 w-4" />
                  <span>Start Your Bespoke Order</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === "security" && (
        <div className="max-w-xl rounded-3xl border border-amber-500/20 bg-[#0d0d14] p-6 sm:p-8 shadow-xl animate-fade-in space-y-6">
          <div className="pb-4 border-b border-zinc-800">
            <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-400" />
              <span>Account Credentials & Password</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Secure your Celoura patron account credentials.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-300 font-medium block mb-1">Current Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-medium block mb-1">New Password (Min 6 characters) *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-medium block mb-1">Confirm New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm disabled:opacity-60 cursor-pointer"
              >
                {savingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Updating Password...</span>
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
      )}
    </div>
  );
}
