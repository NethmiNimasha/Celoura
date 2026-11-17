"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, RotateCcw, Clock, Phone } from "lucide-react";
import { BUSINESS_INFO } from "../../../lib/celouraData";

function PaymentCancelledContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || searchParams.get("order_id") || "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="card-luxury p-8 sm:p-12 text-center border-red-500/30">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400 mb-6">
          <AlertCircle className="h-8 w-8" />
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
          Payment Process Incomplete
        </h1>
        <p className="text-zinc-300 text-sm max-w-md mx-auto mb-6">
          The PayHere checkout session was dismissed or could not be completed. Your order details and custom measurements remain safely recorded.
        </p>

        {orderId && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 max-w-xs mx-auto mb-6">
            <p className="text-xs text-zinc-400">Order Reference</p>
            <p className="font-cinzel text-xl font-bold text-amber-300 mt-0.5">{orderId}</p>
          </div>
        )}

        <p className="text-xs text-zinc-400 mb-8 max-w-sm mx-auto">
          You can re-attempt your payment online at any time from your tracking page, or choose to pay cash/bank transfer directly at our boutique in Akuressa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {orderId ? (
            <Link
              href={`/track?id=${encodeURIComponent(orderId)}`}
              className="btn-gold rounded-full px-6 py-3 text-sm font-bold flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Payment on Track Page</span>
            </Link>
          ) : (
            <Link
              href="/order"
              className="btn-gold rounded-full px-6 py-3 text-sm font-bold flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Return to Custom Order</span>
            </Link>
          )}

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline rounded-full px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            <span>Assistance via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-amber-300 font-cinzel">
        Loading...
      </div>
    }>
      <PaymentCancelledContent />
    </Suspense>
  );
}

