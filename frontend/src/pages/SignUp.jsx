import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,#0f172a,#0b3b34)] p-8 text-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">Join Tailoria</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">Create a single account for orders, measurements, and updates.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
          Customers can request dresses, upload design images, and keep a clear record of every tailoring order in one place.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Personal profile", "Save your delivery details and contact number."],
            ["Measurement history", "Reuse previous measurements for repeat orders."],
            ["Design library", "Upload inspiration photos and references."],
            ["Delivery tracking", "Follow your order status until it is delivered."],
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
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Customer registration</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Sign Up</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Create your account and start placing custom tailoring orders.</p>
        </div>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

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
              placeholder="Create a password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-teal-600"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account? <Link to="/signin" className="font-semibold text-teal-700 hover:text-teal-800">Sign in</Link>
          </p>

          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900">
            This is a UI prototype. Connect it to your API later if you want real authentication.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;