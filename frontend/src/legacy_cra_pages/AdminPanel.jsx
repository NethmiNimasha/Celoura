import React from "react";
import OrderCard from "../components/OrderCard";

function AdminPanel() {
	const orders = [
		{ id: "#T-1048", customer: "Ayesha M.", garment: "Frock", status: "Pending", amount: "LKR 8,500", due: "12 Jun" },
		{ id: "#T-1049", customer: "Nimal P.", garment: "Shirt", status: "In Progress", amount: "LKR 5,200", due: "15 Jun" },
		{ id: "#T-1050", customer: "Rashmi K.", garment: "Suit", status: "Ready", amount: "LKR 12,000", due: "08 Jun" },
	];

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Tailor admin dashboard</p>
						<h1 className="mt-3 text-4xl font-black text-slate-900">Manage orders, pricing, and customer communication.</h1>
						<p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
							Review incoming orders, update status, download measurement details, and keep the workflow moving from one dashboard.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-3">
						{[
							["New", "18"],
							["Active", "29"],
							["Ready", "7"],
							["Delivered", "142"],
						].map(([label, value]) => (
							<div key={label} className="rounded-3xl bg-slate-950 px-4 py-4 text-white">
								<p className="text-xs uppercase tracking-[0.25em] text-slate-300">{label}</p>
								<p className="mt-2 text-2xl font-black">{value}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
				<section className="rounded-[2rem] border border-white/70 bg-slate-950 p-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.2)]">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">Order queue</p>
					<div className="mt-5 space-y-4">
						{orders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				</section>

				<div className="space-y-6">
					<section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Pricing controls</p>
						<div className="mt-5 space-y-4">
							{[
								["Blouse", "LKR 4,500"],
								["Frock", "LKR 8,500"],
								["Suit", "LKR 12,000"],
								["Shirt", "LKR 5,200"],
							].map(([label, value]) => (
								<div key={label} className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 px-4 py-4">
									<span className="font-semibold text-slate-800">{label}</span>
									<button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-teal-200">
										{value}
									</button>
								</div>
							))}
						</div>
					</section>

					<section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Customer contact</p>
						<div className="mt-5 space-y-4">
							{[
								["Ayesha M.", "+94 77 123 4567"],
								["Nimal P.", "+94 71 654 3210"],
								["Rashmi K.", "+94 76 888 1122"],
							].map(([name, phone]) => (
								<div key={name} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-semibold text-slate-900">{name}</h3>
											<p className="text-sm text-slate-600">{phone}</p>
										</div>
										<button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600">
											Message
										</button>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>

			<section className="mt-8 rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Measurements download</p>
						<h2 className="mt-2 text-2xl font-black text-slate-900">Store and export measurement sheets.</h2>
					</div>
					<button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">
						Download all PDFs
					</button>
				</div>

				<div className="mt-6 grid gap-4 md:grid-cols-3">
					{[
						["Recent upload", "Rashmi K. - 08 Jun"],
						["Pending review", "Ayesha M. - 12 Jun"],
						["Archived", "47 completed records"],
					].map(([label, value]) => (
						<div key={label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
							<p className="text-sm text-slate-500">{label}</p>
							<p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default AdminPanel;
