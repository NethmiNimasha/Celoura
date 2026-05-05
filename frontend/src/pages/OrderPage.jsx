import React, { useState } from "react";
import MeasurementForm from "../components/MeasurementForm";

function OrderPage() {
	const [form, setForm] = useState({
		garment: "Frock",
		deliveryDate: "",
		paymentMethod: "Pay on delivery",
		notes: "",
	});

	const handleChange = (key, value) => {
		setForm((current) => ({ ...current, [key]: value }));
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
				<section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Customer order form</p>
					<h1 className="mt-3 text-4xl font-black text-slate-900">Place a new tailoring order.</h1>
					<p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
						Select the dress type, attach a reference image, fill in your measurements, and submit everything for tailor review.
					</p>

					<div className="mt-8 grid gap-6">
						<div className="grid gap-4 sm:grid-cols-2">
							<label className="block">
								<span className="mb-2 block text-sm font-semibold text-slate-700">Dress type</span>
								<select
									value={form.garment}
									onChange={(e) => handleChange("garment", e.target.value)}
									className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
								>
									<option>Blouse</option>
									<option>Frock</option>
									<option>Suit</option>
									<option>Shirt</option>
								</select>
							</label>

							<label className="block">
								<span className="mb-2 block text-sm font-semibold text-slate-700">Delivery date</span>
								<input
									type="date"
									value={form.deliveryDate}
									onChange={(e) => handleChange("deliveryDate", e.target.value)}
									className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
								/>
							</label>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<label className="block">
								<span className="mb-2 block text-sm font-semibold text-slate-700">Design image</span>
								<div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
									Drag and drop a reference photo here or click to upload
								</div>
							</label>

							<label className="block">
								<span className="mb-2 block text-sm font-semibold text-slate-700">Payment method</span>
								<select
									value={form.paymentMethod}
									onChange={(e) => handleChange("paymentMethod", e.target.value)}
									className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-400 focus:bg-white"
								>
									<option>Pay on delivery</option>
									<option>Bank transfer</option>
									<option>Online payment</option>
								</select>
							</label>
						</div>

						<label className="block">
							<span className="mb-2 block text-sm font-semibold text-slate-700">Special notes</span>
							<textarea
								rows="4"
								value={form.notes}
								onChange={(e) => handleChange("notes", e.target.value)}
								placeholder="Preferred sleeve, lining, fabric, and any other instructions"
								className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white"
							/>
						</label>

						<MeasurementForm form={form} setForm={setForm} />
					</div>
				</section>

				<aside className="space-y-6">
					<section className="rounded-[2rem] border border-white/70 bg-slate-950 p-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">Order summary</p>
						<div className="mt-6 space-y-4 text-sm text-slate-300">
							<div className="flex justify-between border-b border-white/10 pb-3">
								<span>Garment</span>
								<span className="font-semibold text-white">{form.garment}</span>
							</div>
							<div className="flex justify-between border-b border-white/10 pb-3">
								<span>Delivery</span>
								<span className="font-semibold text-white">{form.deliveryDate || "Not selected"}</span>
							</div>
							<div className="flex justify-between border-b border-white/10 pb-3">
								<span>Payment</span>
								<span className="font-semibold text-white">{form.paymentMethod}</span>
							</div>
							<div className="flex justify-between">
								<span>Estimated price</span>
								<span className="text-xl font-black text-amber-300">LKR 8,500</span>
							</div>
						</div>

						<button className="mt-8 w-full rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-200">
							Submit for review
						</button>
					</section>

					<section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">What happens next</p>
						<div className="mt-5 space-y-4">
							{[
								["Pending", "Tailor checks the request and confirms the quote."],
								["In Progress", "The garment moves into cutting and stitching."],
								["Ready", "Your outfit is finished and waiting for pickup."],
								["Delivered", "The final handoff is marked in the dashboard."],
							].map(([title, desc]) => (
								<div key={title} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
									<h3 className="font-semibold text-slate-900">{title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
								</div>
							))}
						</div>
					</section>
				</aside>
			</div>
		</div>
	);
}

export default OrderPage;
