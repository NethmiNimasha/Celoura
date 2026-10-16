"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  FileText
} from "lucide-react";
import { getSavedOrders } from "../../lib/celouraData";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("Ayesha Jayawardena");
  const [customerPhone, setCustomerPhone] = useState("0771234567");
  const [customerEmail, setCustomerEmail] = useState("ayesha.j@example.com");

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
    const all = getSavedOrders();
    // Default to Ayesha or user's orders
    const myOrders = all.filter(
      (o) =>
        o.customerPhone === customerPhone ||
        o.customerEmail === customerEmail ||
        o.customerName.toLowerCase().includes("ayesha")
    );
    setOrders(myOrders.length > 0 ? myOrders : all.slice(0, 2));
  }, [customerPhone, customerEmail]);

  const handleSaveMeasurements = (e) => {
    e.preventDefault();
    setIsEditingMeasurements(false);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl mb-10">
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
                VIP Bridal Patron
              </span>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-white mt-0.5">
                Welcome, {customerName}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                {customerEmail} • {customerPhone}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/order"
              className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-gold-sm"
            >
              <Scissors className="h-3.5 w-3.5" />
              <span>New Custom Order</span>
            </Link>

            <Link
              href="/signin"
              className="btn-gold-outline rounded-full px-5 py-2.5 text-xs font-semibold text-zinc-300 flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Switch Account</span>
            </Link>
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
                    Master Atelier: {order.assignedArtisan || "Kirindiwela Studio"}
                  </span>

                  <Link
                    href={`/track?orderId=${order.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>Track Live</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
                className="text-xs font-semibold text-amber-400 hover:underline"
              >
                Edit Measurements
              </button>
            ) : (
              <button
                onClick={() => setIsEditingMeasurements(false)}
                className="text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="rounded-3xl border border-amber-500/20 bg-[#0d0d14] p-6 shadow-xl space-y-4">
            {saveSuccessMsg && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
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
                    className="btn-gold rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5"
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
                Visit our Kirindiwela boutique anytime between 8:00 AM – 6:00 PM for private measurement verification by master tailors.
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
