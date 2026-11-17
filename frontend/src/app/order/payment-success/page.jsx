"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Crown, Sparkles, ArrowRight, Phone, Clock, FileText } from "lucide-react";
import { BUSINESS_INFO } from "../../../lib/celouraData";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || searchParams.get("order_id") || "CEL-ORDER";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="card-luxury p-8 sm:p-12 text-center border-amber-400/40 relative overflow-hidden">
        {/* Golden ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-gold-sm mb-6 animate-bounce">
          <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-amber-400" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>PayHere Verified Transaction</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">
          Payment Received & Order Confirmed
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Thank you for choosing Celoura Fashion. Your online advance payment via PayHere has been securely processed and authenticated.
        </p>

        {/* Order Reference Badge */}
        <div className="rounded-xl border border-amber-500/30 bg-zinc-950/70 p-4 max-w-md mx-auto mb-8">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Your Master Order Reference</p>
          <p className="font-cinzel text-2xl font-bold text-amber-400 mt-1">{orderId}</p>
          <p className="text-xs text-emerald-400 mt-1">● Status: Confirmed & Queued for Atelier Handcrafting</p>
        </div>

        {/* What Happens Next Section */}
        <div className="border-t border-zinc-800 pt-8 text-left max-w-lg mx-auto space-y-4 mb-8">
          <h3 className="font-cinzel text-sm font-semibold text-zinc-200 tracking-wider uppercase">
            Atelier Production Timeline
          </h3>

          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</div>
            <div>
              <p className="text-sm font-semibold text-white">Fabric Selection & Trimming</p>
              <p className="text-xs text-zinc-400">Our master artisan prepares your chosen luxury fabrics and authentic embroidery threads.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</div>
            <div>
              <p className="text-sm font-semibold text-white">Handcrafting & Tailoring</p>
              <p className="text-xs text-zinc-400">Every panel and seam is cut and tailored to your custom specifications in our Akuressa studio.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">3</div>
            <div>
              <p className="text-sm font-semibold text-white">Fitting / Ready for Handover</p>
              <p className="text-xs text-zinc-400">You will be notified to collect your completed outfit or arrange scheduled boutique handover.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/track?id=${encodeURIComponent(orderId)}`}
            className="btn-gold rounded-full px-8 py-3 text-sm font-bold flex items-center justify-center gap-2"
          >
            <Clock className="h-4 w-4" />
            <span>Track Order Progress</span>
          </Link>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline rounded-full px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            <span>Contact Atelier</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-amber-300 font-cinzel">
        Loading Payment Confirmation...
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}

