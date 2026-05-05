import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const orders = [
    { id: "#T-1048", type: "Frock", status: "In Progress", date: "12 Jun", progress: 72 },
    { id: "#T-1049", type: "Blouse", status: "Pending", date: "15 Jun", progress: 24 },
    { id: "#T-1050", type: "Suit", status: "Ready", date: "08 Jun", progress: 100 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Customer dashboard</p>
              <h1 className="mt-3 text-4xl font-black text-slate-900">Track your tailoring orders.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Keep an eye on every garment, review your measurements, and continue new orders from the same account.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-teal-200">Next delivery</p>
              <p className="mt-2 text-2xl font-black">14 Jun</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Open orders", "12"],
              ["Saved measurements", "5"],
              ["Completed", "38"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{order.id}</p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">{order.type}</h3>
                    <p className="text-sm text-slate-600">Delivery target: {order.date}</p>
                  </div>
                  <div className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                    {order.status}
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-white/70 bg-slate-950 p-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">Measurements</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["Bust", "36 in"],
                ["Waist", "30 in"],
                ["Hip", "40 in"],
                ["Length", "42 in"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{label}</p>
                  <p className="mt-2 text-xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Quick actions</p>
            <div className="mt-5 space-y-3">
              <Link to="/orders" className="block rounded-2xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-600">New tailoring order</Link>
              <button className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700">
                Upload measurements
              </button>
              <button className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700">
                Contact tailor
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;