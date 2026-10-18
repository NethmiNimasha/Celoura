"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Sparkles, 
  Crown, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { loginUser, loginAdmin } from "../../lib/api";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("role") === "admin" ? "admin" : "client";

  const [activeTab, setActiveTab] = useState(initialTab); // "client" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (searchParams.get("role") === "admin") {
      setActiveTab("admin");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      if (activeTab === "admin") {
        // Dedicated special admin authentication
        const data = await loginAdmin({ email, password });
        setSuccessMsg("Admin credentials verified! Launching Atelier Management Portal...");
        setTimeout(() => {
          router.push("/admin");
        }, 600);
      } else {
        // Client authentication (also routes admin to /admin if admin logs in here)
        const data = await loginUser({ email, password });
        setSuccessMsg("Welcome back! Redirecting...");
        setTimeout(() => {
          if (data.role === "ROLE_ADMIN" || email.toLowerCase().includes("admin")) {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        }, 600);
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError("");
    setSuccessMsg("");
    // If switching to admin, prefill or clear as appropriate
    if (tab === "admin" && !email) {
      setEmail("admin@celourafashion.com");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl relative overflow-hidden">
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block group">
            <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/50 bg-black p-0.5 shadow-gold-md overflow-hidden group-hover:scale-105 transition-all">
              <Image
                src="/logo.png"
                alt="Celoura Fashion Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover rounded-full"
                priority
              />
            </div>
          </Link>

          <h1 className="font-cinzel text-2xl font-black text-white">
            {activeTab === "admin" ? "Atelier Admin Sign In" : "Welcome To Celoura"}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            {activeTab === "admin" 
              ? "Restricted management portal for atelier directors & master couturiers."
              : "Access your custom orders, status tracker, and saved measurements."}
          </p>
        </div>

        {/* Role Toggle: Client Sign In vs Admin Sign In */}
        <div className="mb-6 grid grid-cols-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1">
          <button
            type="button"
            onClick={() => switchTab("client")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "client"
                ? "bg-amber-400 text-black shadow-gold-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>Client Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => switchTab("admin")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "admin"
                ? "bg-amber-400 text-black shadow-gold-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin Sign In</span>
          </button>
        </div>

        {/* Admin Special Credential Badge */}
        {activeTab === "admin" && (
          <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200/90 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <strong className="block text-amber-300">Authorized Personnel Only:</strong>
              <span>Sign in with the designated master admin credentials to access order management.</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-300 font-medium block mb-1">
              {activeTab === "admin" ? "Special Admin Email" : "Email Address"}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                placeholder={activeTab === "admin" ? "admin@celourafashion.com" : "name@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-300 font-medium block mb-1">
              {activeTab === "admin" ? "Special Admin Password" : "Password"}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full rounded-full py-3 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-sm disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{activeTab === "admin" ? "Authenticating Admin..." : "Signing In..."}</span>
                </>
              ) : (
                <>
                  <span>{activeTab === "admin" ? "Sign In to Admin Portal" : "Sign In to Account"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-400">
          {activeTab === "admin" ? (
            <p>
              Looking for client orders?{" "}
              <button
                type="button"
                onClick={() => switchTab("client")}
                className="text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                Switch to Client Sign In
              </button>
            </p>
          ) : (
            <div className="space-y-2">
              <p>
                Don't have an account yet?{" "}
                <Link href="/signup" className="text-amber-400 font-semibold hover:underline">
                  Register here
                </Link>
              </p>
              <p>
                Atelier Director or Staff?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("admin")}
                  className="text-amber-300 font-bold hover:underline cursor-pointer"
                >
                  Admin Atelier Sign In →
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-amber-300 font-cinzel">Loading Celoura...</div>}>
      <SignInContent />
    </Suspense>
  );
}
