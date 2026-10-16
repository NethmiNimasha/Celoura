import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-slate-950 p-8 text-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">Customer access</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">Sign in to track orders and manage your fitting details.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
          Use the same account to place new tailoring requests, review order status, and keep your saved measurements ready for the next visit.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Live status", "See every stage from pending to delivery."],
            ["Measurement vault", "Store your measurements for faster reorders."],
            ["Design uploads", "Keep your inspiration images attached."],
            ["Order history", "Review old orders and rebook with one click."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_24px_90px_rgba(15,23,42,0.12)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Welcome back</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Sign In</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Continue where you left off and open your dashboard.</p>
        </div>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-teal-600"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-slate-600">
            New here? <Link to="/signup" className="font-semibold text-teal-700 hover:text-teal-800">Create an account</Link>
          </p>

        </div>
      </section>
    </div>
  );
}

export default Login;