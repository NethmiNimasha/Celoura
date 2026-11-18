"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  Lock, 
  X, 
  Loader2, 
  ArrowRight,
  Info
} from "lucide-react";

export default function PayHereSimulatorModal({
  isOpen,
  onClose,
  onSuccess,
  orderData,
  paymentType = "DEPOSIT"
}) {
  const [selectedMethod, setSelectedMethod] = useState("card"); // "card" | "wallet" | "bank"
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("4385 0000 0000 0001");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");

  if (!isOpen || !orderData) return null;

  const total = Number(orderData.totalAmount || 2000);
  const payableAmount = paymentType === "FULL" ? total : Math.round(total * 0.5);
  const amountFormatted = payableAmount.toLocaleString();
  const orderId = orderData.id || "CEL-ORDER";
  const itemTitle = orderData.designTitle || "Custom Bespoke Outfit";

  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (onSuccess) {
        onSuccess({
          orderId,
          amount: payableAmount,
          paymentType,
          paymentMethod: selectedMethod === "card" ? "VISA" : (selectedMethod === "wallet" ? "FRIMI" : "ONLINE_BANKING"),
          transactionId: `PH-TEST-${Math.floor(100000 + Math.random() * 900000)}`
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-md rounded-3xl border border-amber-400/50 bg-[#0f0f17] p-6 sm:p-7 shadow-2xl text-zinc-100 overflow-hidden">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-24 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0056b3] text-white font-black text-lg shadow-md">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">PayHere Payment Gateway</span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Sandbox Demo
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Central Bank Approved Payment Switch Simulation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700/60 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Amount & Order Details Card */}
        <div className="rounded-2xl border border-amber-500/30 bg-black/70 p-4 text-center mb-5 shadow-inner">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">
            {paymentType === "FULL" ? "Total Full Payment" : "50% Advance Atelier Deposit"}
          </span>
          <div className="font-cinzel text-3xl font-extrabold text-amber-400">
            LKR {amountFormatted}
          </div>
          <div className="mt-1 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <span>Order Ref: <strong className="text-white font-cinzel">{orderId}</strong></span>
            <span>•</span>
            <span className="truncate max-w-[180px]">{itemTitle}</span>
          </div>
        </div>

        {/* Payment Method Selector Tabs */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
            Select Payment Method
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSelectedMethod("card")}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 transition cursor-pointer ${
                selectedMethod === "card"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-gold-sm"
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod("wallet")}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 transition cursor-pointer ${
                selectedMethod === "wallet"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-gold-sm"
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>FriMi/Genie</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod("bank")}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 transition cursor-pointer ${
                selectedMethod === "bank"
                  ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold shadow-gold-sm"
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>NetBanking</span>
            </button>
          </div>
        </div>

        {/* Tab Content: Card Details */}
        {selectedMethod === "card" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-5 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Sandbox Test Visa Card:</span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Auto-Filled
              </span>
            </div>

            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Expiry</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">CVV</label>
                <input
                  type="password"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Mobile Wallet */}
        {selectedMethod === "wallet" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-5 text-xs text-zinc-300 space-y-2">
            <p className="font-semibold text-white">Nations Trust FriMi / Dialog Genie / eZ Cash</p>
            <p className="text-[11px] text-zinc-400">
              Mobile number: <strong className="text-amber-300">{orderData.customerPhone || "0771699754"}</strong>
            </p>
            <p className="text-[11px] text-emerald-400">
              ✓ Ready for instant test sandbox push authorization.
            </p>
          </div>
        )}

        {/* Tab Content: NetBanking */}
        {selectedMethod === "bank" && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-5 text-xs text-zinc-300 space-y-2">
            <p className="font-semibold text-white">Sampath Vishwa / Commercial Bank / HNB</p>
            <p className="text-[11px] text-zinc-400">
              Direct API debit test route active for LKR {amountFormatted}.
            </p>
          </div>
        )}

        {/* Submit Payment Button */}
        <button
          type="button"
          disabled={isProcessing}
          onClick={handleCompletePayment}
          className="btn-gold w-full rounded-2xl py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-md cursor-pointer disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-black" />
              <span>Verifying With PayHere Switch...</span>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>Authorize & Pay LKR {amountFormatted}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Security Footer Note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>PayHere Central Bank Approved Switch • 256-Bit SSL Demo Sandbox</span>
        </div>
      </div>
    </div>
  );
}

