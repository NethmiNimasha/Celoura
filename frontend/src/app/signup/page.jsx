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
  User, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { registerUser, loginUser } from "../../lib/api";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signin" ? "signin" : "signup";

  const [mode, setMode] = useState(initialMode); // 'signup' or 'signin'

  // Signup form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Signin form state
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (searchParams.get("mode") === "signin") {
      setMode("signin");
    } else if (searchParams.get("mode") === "signup") {
      setMode("signup");
    }
  }, [searchParams]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!name || !phone || !signupEmail || !signupPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        name,
        email: signupEmail,
        phone,
        password: signupPassword,
      });

      setSuccessMsg("Account created successfully! Connecting your atelier profile...");
      setTimeout(() => {
        if (data.role === "ROLE_ADMIN" || signupEmail.toLowerCase().includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 900);
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!signinEmail || !signinPassword) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({
        email: signinEmail,
        password: signinPassword,
      });

      setSuccessMsg("Welcome back! Redirecting...");
      setTimeout(() => {
        if (data.role === "ROLE_ADMIN" || signinEmail.toLowerCase().includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 800);
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-amber-500/30 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block group">
            <div className="relative mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/50 bg-black p-0.5 shadow-gold-md overflow-hidden group-hover:scale-105 transition-all">
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
            {mode === "signup" ? "Create Client Account" : "Welcome Back"}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            {mode === "signup" 
              ? "Join Celoura to store bespoke measurements and monitor custom orders."
              : "Sign in to access your orders, status tracker, and saved designs."}
          </p>
        </div>

        {/* Tab Toggle: Sign Up / Sign In */}
        <div className="mb-6 grid grid-cols-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1">
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(""); setSuccessMsg(""); }}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              mode === "signup"
                ? "bg-amber-400 text-black shadow-gold-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => { setMode("signin"); setError(""); setSuccessMsg(""); }}
            className={`rounded-xl py-2 text-xs font-bold transition-all ${
              mode === "signin"
                ? "bg-amber-400 text-black shadow-gold-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
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

        {/* SIGN UP FORM */}
        {mode === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs animate-fade-in">
            <div>
              <label className="text-zinc-300 font-medium block mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Jayawardena"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-medium block mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0771699754"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-medium block mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="ayesha@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-medium block mb-1">Create Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {/* Prominent "Already have an account? Sign in" CTA */}
            <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3.5">
                <p className="text-xs text-zinc-300">
                  Already have an account?
                </p>
                <button
                  type="button"
                  onClick={() => { setMode("signin"); setError(""); setSuccessMsg(""); }}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white underline transition-colors cursor-pointer"
                >
                  <span>Sign In Here</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* SIGN IN FORM */}
        {mode === "signin" && (
          <form onSubmit={handleSigninSubmit} className="space-y-4 text-xs animate-fade-in">
            <div>
              <label className="text-zinc-300 font-medium block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
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
                  value={signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
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

            {/* Switch back to Sign Up */}
            <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
              <p className="text-xs text-zinc-400">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => { setMode("signup"); setError(""); setSuccessMsg(""); }}
                  className="text-amber-300 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Create an Account
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-amber-300 font-cinzel">Loading Celoura...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
