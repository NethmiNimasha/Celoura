"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Crown, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { loginUser } from "../../lib/api";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
      const data = await loginUser({ email, password });
      setSuccessMsg("Welcome back! Redirecting...");
      setTimeout(() => {
        if (data.role === "ROLE_ADMIN" || email.toLowerCase().includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 700);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/50 bg-black p-0.5 shadow-gold-md overflow-hidden">
            <Image
              src="/logo.png"
              alt="Celoura Fashion Logo"
              width={80}
              height={80}
              className="h-full w-full object-cover rounded-full"
              priority
            />
          </div>
          <h1 className="font-cinzel text-2xl font-black text-white">
            Welcome To Celoura
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Access your custom orders, status tracker, and saved measurements.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
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
            <label className="text-zinc-300 font-medium block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-300 font-medium block mb-1">Password</label>
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-400">
          <p>
            Don't have an account yet?{" "}
            <Link href="/signup" className="text-amber-400 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
