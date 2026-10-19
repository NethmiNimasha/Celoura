"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Scissors, 
  Sparkles, 
  Phone, 
  Calendar, 
  User, 
  Ruler, 
  MessageCircle,
  HelpCircle,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { 
  getSavedOrders, 
  ORDER_STATUSES, 
  BUSINESS_INFO 
} from "../../lib/celouraData";
import { getOrderByIdApi, getAllOrdersApi } from "../../lib/api";

function TrackContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId");

  const [searchInput, setSearchInput] = useState(queryOrderId || "CEL-8291");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const findOrder = async (query) => {
    if (!query) return;
    const cleanQuery = query.trim();

    // 1. Check local list first
    const list = getSavedOrders();
    const localFound = list.find(
      (o) =>
        o.id.toLowerCase() === cleanQuery.toLowerCase() ||
        (o.customerPhone && o.customerPhone.includes(cleanQuery)) ||
        (o.customerName && o.customerName.toLowerCase().includes(cleanQuery.toLowerCase()))
    );

    if (localFound) {
      setSelectedOrder(localFound);
      setNotFound(false);
    }

    // 2. Query Spring Boot backend
    try {
      setIsSearching(true);
      // If looks like an order ID
      if (cleanQuery.toUpperCase().startsWith("CEL-") || cleanQuery.length <= 10) {
        const backendOrder = await getOrderByIdApi(cleanQuery);
        if (backendOrder && backendOrder.id) {
          setSelectedOrder(backendOrder);
          setNotFound(false);
          return;
        }
      }

      // If it's a phone number or partial name, query with phone filter
      const phoneOrders = await getAllOrdersApi({ phone: cleanQuery });
      if (Array.isArray(phoneOrders) && phoneOrders.length > 0) {
        setSelectedOrder(phoneOrders[0]);
        setNotFound(false);
        return;
      }

      if (!localFound) {
        setSelectedOrder(null);
        setNotFound(true);
      }
    } catch (err) {
      if (!localFound) {
        setSelectedOrder(null);
        setNotFound(true);
      }
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const list = getSavedOrders();
    setOrders(list);

    const initialId = queryOrderId || "CEL-8291";
    findOrder(initialId);
  }, [queryOrderId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    findOrder(searchInput.trim());
  };

  // Status mapping for the 5 linear progress steps (Cancelled is treated separately)
  const mainStatusSteps = ["Pending", "Confirmed", "In Progress", "Ready", "Completed"];
  
  const getStepIndex = (status) => {
    return mainStatusSteps.indexOf(status);
  };

  const currentStepIndex = selectedOrder ? getStepIndex(selectedOrder.status) : -1;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span>Real-Time Status Tracker</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
          Track Your Custom Dress Order
        </h1>
        <p className="mt-2 text-sm text-zinc-300">
          Enter your Order ID (e.g. CEL-8291) or registered phone number to view tailoring progress and estimated completion.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="mb-10 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. CEL-8291) or Phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-full border border-zinc-700 bg-zinc-900/90 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="btn-gold rounded-full px-7 py-3 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-gold-sm"
          >
            <span>Track</span>
          </button>
        </form>

        {/* Quick Test Demo Order Links */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
          <span>Demo Orders:</span>
          {["CEL-8291", "CEL-8292", "CEL-8293", "CEL-8294"].map((id) => (
            <button
              key={id}
              onClick={() => {
                setSearchInput(id);
                const found = getSavedOrders().find((o) => o.id === id);
                if (found) {
                  setSelectedOrder(found);
                  setNotFound(false);
                }
              }}
              className="rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] text-amber-300 hover:border-amber-500/50"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {notFound && (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center max-w-xl mx-auto">
          <AlertCircle className="mx-auto h-10 w-10 text-amber-400 mb-3" />
          <h3 className="font-cinzel text-lg font-bold text-white">Order Not Found</h3>
          <p className="mt-1 text-xs text-zinc-400">
            No matching order found for "{searchInput}". Please double check your order number or phone.
          </p>
          <div className="mt-6">
            <Link href="/order" className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black">
              Place A New Order Request
            </Link>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="space-y-8 animate-fade-in">
          {/* Main Status Header Card */}
          <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-400">Order Reference:</span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-amber-400">
                    {selectedOrder.id}
                  </h2>
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1 text-xs text-zinc-400">
                <p>Submitted on: <strong className="text-white">{selectedOrder.orderDate}</strong></p>
                <p>Target Fitting Date: <strong className="text-amber-300">{selectedOrder.eventDate}</strong></p>
                <p>Assigned Couturier: <strong className="text-zinc-200">{selectedOrder.assignedArtisan || "Celoura Akuressa Atelier"}</strong></p>
              </div>
            </div>

            {/* Visual Stepper of 5 States */}
            <div className="py-8">
              <div className="grid grid-cols-5 gap-2 text-center">
                {mainStatusSteps.map((statusName, index) => {
                  const isCompleted = currentStepIndex > index;
                  const isCurrent = currentStepIndex === index;
                  return (
                    <div key={statusName} className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full font-bold transition-all ${
                          isCurrent
                            ? "bg-amber-400 text-black shadow-gold-md scale-110 ring-4 ring-amber-400/30"
                            : isCompleted
                            ? "bg-amber-500/20 text-amber-300 border border-amber-400/60"
                            : "bg-zinc-900 text-zinc-600 border border-zinc-800"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-amber-300" />
                        ) : (
                          <span className="text-xs sm:text-sm">{index + 1}</span>
                        )}
                      </div>
                      <span
                        className={`mt-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase ${
                          isCurrent
                            ? "text-amber-300 font-bold"
                            : isCompleted
                            ? "text-zinc-300"
                            : "text-zinc-600"
                        }`}
                      >
                        {statusName}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-zinc-900">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-700 shadow-gold-sm"
                  style={{
                    width: `${Math.max(10, ((currentStepIndex + 0.5) / mainStatusSteps.length) * 100)}%`,
                  }}
                />
              </div>

              {/* Status Description Explanation */}
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-center">
                <p className="text-xs text-zinc-300">
                  <strong className="text-amber-300">Current Phase: </strong>
                  {ORDER_STATUSES.find((s) => s.key === selectedOrder.status)?.desc ||
                    "Your order is progressing smoothly with our master tailors."}
                </p>
              </div>
            </div>

            {/* Order Specification Details */}
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
              {/* Left Column: Garment Specs */}
              <div className="space-y-3">
                <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold">
                  Haute Garment Specifications
                </h4>

                {(selectedOrder.designImage || selectedOrder.customReferenceImage) && (
                  <div className="rounded-2xl border border-amber-500/30 bg-zinc-950 p-3 flex items-center gap-3">
                    <div className="relative h-16 w-20 shrink-0 rounded-xl overflow-hidden border border-amber-400/40 bg-black">
                      <img
                        src={selectedOrder.customReferenceImage || selectedOrder.designImage}
                        alt="Design Reference"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">
                        {selectedOrder.isCustomDesign ? "Custom Client Design Attached" : "Signature Design"}
                      </span>
                      <strong className="text-xs text-white block">
                        {selectedOrder.designTitle}
                      </strong>
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Design Model:</span>
                    <strong className="text-white">{selectedOrder.designTitle}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Selected Silhouette:</span>
                    <span className="text-zinc-200">{selectedOrder.silhouette}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Royal Colour:</span>
                    <span className="text-amber-300 font-medium">{selectedOrder.colour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Fabric Choice:</span>
                    <span className="text-zinc-200">{selectedOrder.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Neckline Style:</span>
                    <span className="text-zinc-200">{selectedOrder.neckline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Sleeve Style:</span>
                    <span className="text-zinc-200">{selectedOrder.sleeve}</span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs">
                    <span className="text-zinc-500 block mb-1">Customer Special Notes:</span>
                    <p className="text-zinc-300 italic">"{selectedOrder.notes}"</p>
                  </div>
                )}
              </div>

              {/* Right Column: Measurements & Pricing */}
              <div className="space-y-3">
                <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-bold">
                  Client Profile & Measurements
                </h4>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Client Name:</span>
                    <strong className="text-white">{selectedOrder.customerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Contact Phone:</span>
                    <span className="text-zinc-200">{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Email Address:</span>
                    <span className="text-zinc-200">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-800 pt-2">
                    <span className="text-zinc-500">Estimated Total Quote:</span>
                    <strong className="font-cinzel text-sm text-amber-400">
                      LKR {selectedOrder.totalAmount?.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Measurements Table */}
                {selectedOrder.measurements && (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs">
                    <span className="text-zinc-400 font-semibold block mb-2">
                      Recorded Measurements ({selectedOrder.measurements.unit || "inches"}):
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-[11px] text-zinc-300">
                      {selectedOrder.measurements.bust && (
                        <div className="rounded-lg bg-zinc-900 p-2">
                          <span className="text-zinc-500 block">Bust:</span>
                          <span className="font-bold text-white">{selectedOrder.measurements.bust}</span>
                        </div>
                      )}
                      {selectedOrder.measurements.waist && (
                        <div className="rounded-lg bg-zinc-900 p-2">
                          <span className="text-zinc-500 block">Waist:</span>
                          <span className="font-bold text-white">{selectedOrder.measurements.waist}</span>
                        </div>
                      )}
                      {selectedOrder.measurements.hip && (
                        <div className="rounded-lg bg-zinc-900 p-2">
                          <span className="text-zinc-500 block">Hip:</span>
                          <span className="font-bold text-white">{selectedOrder.measurements.hip}</span>
                        </div>
                      )}
                      {selectedOrder.measurements.lehengaLength && (
                        <div className="rounded-lg bg-zinc-900 p-2">
                          <span className="text-zinc-500 block">Skirt Length:</span>
                          <span className="font-bold text-white">{selectedOrder.measurements.lehengaLength}</span>
                        </div>
                      )}
                      {selectedOrder.measurements.blouseLength && (
                        <div className="rounded-lg bg-zinc-900 p-2">
                          <span className="text-zinc-500 block">Blouse Length:</span>
                          <span className="font-bold text-white">{selectedOrder.measurements.blouseLength}</span>
                        </div>
                      )}
                      {selectedOrder.measurements.shoulder && (
                        <div className="rounded-lg bg-zinc-900 p-2">
                          <span className="text-zinc-500 block">Shoulder:</span>
                          <span className="font-bold text-white">{selectedOrder.measurements.shoulder}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Communication Action */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-xs text-zinc-400 text-center sm:text-left">
                Questions about fitting dates or design adjustments? Our atelier team is here for you.
              </p>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/94771699754?text=Hello%20Celoura%20Fashion,%20I%20am%20inquiring%20about%20Order%20${selectedOrder.id}%20for%20${selectedOrder.customerName}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Atelier</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="btn-gold-outline rounded-full px-5 py-2.5 text-xs font-semibold text-amber-300 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Atelier</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-amber-300 font-cinzel">Loading Order Tracker...</div>}>
      <TrackContent />
    </Suspense>
  );
}
