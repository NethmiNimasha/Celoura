function MeasurementForm({ form, setForm }) {
	const updateMeasurement = (key, value) => {
		setForm((current) => ({ ...current, [key]: value }));
	};

	return (
		<section className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Measurements</p>
					<h2 className="mt-2 text-2xl font-black text-slate-900">Capture body measurements</h2>
				</div>
				<div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 shadow-sm ring-1 ring-slate-200">
					In inches
				</div>
			</div>

			<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[
					["bust", "Bust"],
					["waist", "Waist"],
					["hip", "Hip"],
					["shoulder", "Shoulder"],
					["length", "Length"],
					["sleeve", "Sleeve"],
				].map(([key, label]) => (
					<label key={key} className="block">
						<span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
						<input
							type="text"
							value={form?.[key] || ""}
							onChange={(e) => updateMeasurement(key, e.target.value)}
							placeholder={`${label.toLowerCase()} measurement`}
							className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400"
						/>
					</label>
				))}
			</div>
		</section>
	);
}

export default MeasurementForm;
