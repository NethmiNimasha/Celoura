import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const services = [
    { name: "Blouse", detail: "Custom neckline, sleeve, and lining choices." },
    { name: "Frock", detail: "Structured or flowy designs with designer drape." },
    { name: "Suit", detail: "Tailored fits for office, events, and ceremonies." },
    { name: "Shirt", detail: "Sharp everyday and formal shirt styling." },
  ];

  const process = [
    { step: "01", title: "Create your order", desc: "Pick the garment, enter measurements, and upload a design reference." },
    { step: "02", title: "Tailor reviews it", desc: "The admin team confirms price, availability, and delivery timing." },
    { step: "03", title: "Track progress", desc: "Monitor every stage from pending to delivered inside the dashboard." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(236,253,245,0.92))] shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
        <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
              <span>Online tailoring</span>
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              <span>Customer + admin workflow</span>
            </div>
            <h1 className="max-w-2xl text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
              Place tailoring orders without the back-and-forth.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Upload measurements, share a design reference, choose a garment type, and let the tailor team manage price, status, and delivery from one dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/signup")}
                className="rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-teal-600"
              >
                Create account
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
              >
                Start an order
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: "24h", label: "Fast quote review" },
                { value: "4 steps", label: "Simple ordering flow" },
                { value: "Live", label: "Status tracking" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-2xl font-black text-teal-700">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-200/70 blur-3xl" />
            <div className="absolute -bottom-8 left-10 h-24 w-24 rounded-full bg-teal-200/80 blur-3xl" />
            <div className="relative rounded-[1.75rem] border border-slate-100 bg-slate-950 p-5 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
              <div className="flex items-center justify-between rounded-3xl bg-white/8 p-4 backdrop-blur">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-teal-200">Next order</p>
                  <h2 className="mt-2 text-2xl font-bold">Wedding Frock</h2>
                </div>
                <div className="rounded-2xl bg-teal-400/20 px-3 py-2 text-sm font-semibold text-teal-100">Ready in 12 days</div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/8 p-4">
                  <p className="text-sm text-slate-300">Order status</p>
                  <p className="mt-2 text-2xl font-black text-amber-300">In Progress</p>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-teal-300 to-emerald-400" />
                  </div>
                </div>
                <div className="rounded-3xl bg-white/8 p-4">
                  <p className="text-sm text-slate-300">Measurements</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    <div className="flex justify-between"><span>Bust</span><span>36 in</span></div>
                    <div className="flex justify-between"><span>Waist</span><span>30 in</span></div>
                    <div className="flex justify-between"><span>Hip</span><span>40 in</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 p-5 text-slate-950">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-950/70">Tailor dashboard</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ["New", "18 orders"],
                    ["Ready", "7 orders"],
                    ["Delivered", "142 orders"],
                  ].map(([label, count]) => (
                    <div key={label} className="rounded-2xl bg-white/70 p-3">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
                      <p className="mt-2 text-lg font-black text-slate-900">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Why Tailoria</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Built for customers and tailors</h2>
          <p className="mt-4 text-slate-600">
            The experience is designed around a real tailoring workflow: capture the request, confirm the fit, and keep both sides updated.
          </p>
          <div className="mt-6 space-y-4">
            {[
              "Register, log in, and place an order in minutes.",
              "Upload body measurements and design inspiration together.",
              "Track each order from pending to delivered.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-500" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.name} className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_16px_60px_rgba(15,23,42,0.08)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-xl text-teal-700">✦</div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{service.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{service.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-100 bg-slate-950 px-6 py-10 text-white shadow-[0_25px_90px_rgba(15,23,42,0.22)] sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">{item.step}</p>
              <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-[1.75rem] bg-white px-6 py-6 text-slate-900 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Ready to build?</p>
            <h3 className="mt-2 text-2xl font-black">Launch your tailoring workflow now.</h3>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/signup")} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">Join now</button>
            <button onClick={() => navigate("/admin")} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700">View admin UI</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;