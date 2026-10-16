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
  UserCheck 
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (email.includes("admin")) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  const handleDemoCustomer = () => {
    setEmail("ayesha.j@example.com");
    setPassword("password123");
    router.push("/dashboard");
  };

  const handleDemoAdmin = () => {
    setEmail("admin@celourafashion.com");
    setPassword("admin123");
    router.push("/admin");
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

        {/* Quick Demo Access Bar */}
        <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 text-center space-y-2">
          <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
            One-Click Instant Demo Login:
          </p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="rounded-full border border-amber-400/40 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-400/20"
            >
              Demo Client
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="rounded-full border border-amber-400/40 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-400/20"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
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
              className="btn-gold w-full rounded-full py-3 text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-gold-sm"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="h-4 w-4" />
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
