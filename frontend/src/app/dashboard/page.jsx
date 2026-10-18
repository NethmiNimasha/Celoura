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
  Save, 
  LogOut,
  ShieldCheck,
  FileText,
  Loader2
} from "lucide-react";
import { getSavedOrders } from "../../lib/celouraData";
import { getStoredUser, logoutUser } from "../../lib/api";

export default function CustomerDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [userRole, setUserRole] = useState("ROLE_CUSTOMER");

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
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      // Not logged in -> redirect to sign in
      router.push("/signin");
      return;
    }

    setCurrentUser(user);
    setCustomerName(user.name || "Valued Patron");
    setCustomerEmail(user.email || "");
    setCustomerPhone(user.phone || "");
    setUserRole(user.role || "ROLE_CUSTOMER");

    // 1. Check if user has personalized measurements stored in localStorage
    const userMeasKey = `celoura_measurements_${user.email}`;
    const storedMeas = typeof window !== "undefined" ? localStorage.getItem(userMeasKey) : null;
    if (storedMeas) {
      try {
        setSavedMeasurements(JSON.parse(storedMeas));
      } catch (err) {
        console.error("Error parsing measurements", err);
      }
    }

    // 2. Fetch and filter orders for this signed-in user
    const all = getSavedOrders();
    const userEmailNorm = (user.email || "").toLowerCase().trim();
    const userNameNorm = (user.name || "").toLowerCase().trim();

    const myOrders = all.filter((o) => {
      const oEmailNorm = (o.customerEmail || "").toLowerCase().trim();
      const oNameNorm = (o.customerName || "").toLowerCase().trim();
      
      // Match by email
      if (userEmailNorm && oEmailNorm === userEmailNorm) return true;
      // Match Ayesha spelling variations (ayesha / ayyesha)
      if (userEmailNorm.includes("ayesha") && oEmailNorm.includes("ayesha")) return true;
      if (userEmailNorm.includes("ayyesha") && oEmailNorm.includes("ayesha")) return true;
      // Match by phone
      if (user.phone && o.customerPhone && user.phone.replace(/\D/g, "") === o.customerPhone.replace(/\D/g, "")) return true;
      // Match by name
      if (userNameNorm && oNameNorm === userNameNorm) return true;

      return false;
    });

    // If order has measurements and none saved yet, adopt initial order measurements
    if (myOrders.length > 0 && !storedMeas && myOrders[0].measurements) {
      setSavedMeasurements((prev) => ({
        ...prev,
        ...myOrders[0].measurements,
      }));
    }

    setOrders(myOrders);
    setLoading(false);
  }, [router]);

  const handleSwitchAccount = () => {
    logoutUser();
    router.push("/signin");
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
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
        <p className="font-cinzel text-sm uppercase tracking-widest text-amber-300">
          Loading Celoura Patron Atelier Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl mb-10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400/50 bg-black/90 p-0.5 shadow-gold-sm overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="Celoura Fashion Logo"
                width={64}
                height={64}
                className="h-full w-full object-cover rounded-full"
                priority
              />
            </div>
            <div>
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-400 font-bold">
                {userRole === "ROLE_ADMIN" ? "Master Atelier Administrator" : "VIP Bridal Patron"}
              </span>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-white mt-0.5">
                Welcome, {customerName}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                {customerEmail} {customerPhone ? `• ${customerPhone}` : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {userRole === "ROLE_ADMIN" && (
              <Link
                href="/admin"
                className="rounded-full border border-purple-400/50 bg-purple-950/40 px-5 py-2.5 text-xs font-semibold text-purple-200 flex items-center gap-1.5 hover:bg-purple-900/60 transition"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
                <span>Admin Portal</span>
              </Link>
            )}

            <Link
              href="/profile"
              className="btn-gold-outline rounded-full px-5 py-2.5 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 hover:text-white hover:border-amber-400 transition"
            >
              <User className="h-3.5 w-3.5 text-amber-400" />
              <span>Customer Profile</span>
            </Link>

            <Link
              href="/order"
              className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-gold-sm hover:scale-105 transition-all"
            >
              <Scissors className="h-3.5 w-3.5" />
              <span>New Custom Order</span>
            </Link>

            <button
              type="button"
              onClick={handleSwitchAccount}
              className="btn-gold-outline rounded-full px-5 py-2.5 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 hover:text-white hover:border-amber-400 transition cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Switch Account</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Orders History & Active Tracker */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <span>My Custom Dress Requests</span>
            </h2>
            <span className="text-xs text-zinc-400">
              {orders.length} outfit{orders.length === 1 ? "" : "s"} tracked
            </span>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
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

                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-zinc-400">
                      <p>Colour: <strong className="text-zinc-200">{order.colour}</strong></p>
                      <p>Fabric: <strong className="text-zinc-200">{order.fabric}</strong></p>
                      <p>Target Date: <strong className="text-amber-300">{order.eventDate}</strong></p>
                      <p>Quote: <strong className="text-white">LKR {order.totalAmount?.toLocaleString()}</strong></p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">
                      Master Atelier: {order.assignedArtisan || "Akuressa Atelier"}
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
            <div className="card-luxury p-8 text-center space-y-4 border border-dashed border-amber-500/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300">
                <Scissors className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  No Active Custom Dress Requests Yet
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                  Commission your bespoke bridal lehenga, saree blouse, or evening frock with our master artisans in Akuressa.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/order"
                  className="btn-gold inline-flex rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black items-center gap-2 shadow-gold-sm hover:scale-105 transition-all"
                >
                  <Scissors className="h-4 w-4" />
                  <span>Start Your First Custom Order</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Saved Measurements Profile */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
              <Ruler className="h-5 w-5 text-amber-400" />
              <span>Saved Measurements</span>
            </h2>

            {!isEditingMeasurements ? (
              <button
                onClick={() => setIsEditingMeasurements(true)}
                className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
              >
                Edit Measurements
              </button>
            ) : (
              <button
                onClick={() => setIsEditingMeasurements(false)}
                className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="rounded-3xl border border-amber-500/20 bg-[#0d0d14] p-6 shadow-xl space-y-4">
            {saveSuccessMsg && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Measurements updated successfully!</span>
              </div>
            )}

            <p className="text-xs text-zinc-400 leading-relaxed">
              These measurements are automatically used for new dress requests so you don't have to re-enter them every time.
            </p>

            <form onSubmit={handleSaveMeasurements}>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {Object.entries(savedMeasurements).map(([key, val]) => {
                  if (key === "unit") return null;
                  return (
                    <div key={key} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
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
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-white focus:border-amber-400 focus:outline-none"
                        />
                      ) : (
                        <span className="font-bold text-white text-sm">
                          {val} {savedMeasurements.unit}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {isEditingMeasurements && (
                <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-end">
                  <button
                    type="submit"
                    className="btn-gold rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 cursor-pointer shadow-gold-sm"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </form>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-xs text-zinc-400 mt-4">
              <strong className="text-amber-300 block mb-1">Need In-Person Fitting?</strong>
              <p>
                Visit our boutique at No. 129, Yakabedda, Matara road, Akuressa anytime between 8:00 AM – 6:00 PM for private measurement verification by master tailors.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-block font-semibold text-amber-400 hover:underline"
              >
                Schedule Appointment →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
