function OrderCard({ order }) {
	const statusStyles = {
		Pending: "bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/20",
		"In Progress": "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/20",
		Ready: "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/20",
		Delivered: "bg-slate-400/15 text-slate-200 ring-1 ring-slate-400/20",
	};

	return (
		<article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-slate-400">{order.id}</p>
					<h3 className="mt-2 text-2xl font-black text-white">{order.garment}</h3>
					<p className="mt-1 text-sm text-slate-300">{order.customer}</p>
				</div>
				<div className={`rounded-full px-4 py-2 text-sm font-semibold ${statusStyles[order.status] || "bg-white/10 text-white"}`}>
					{order.status}
				</div>
			</div>

			<div className="mt-5 grid gap-3 sm:grid-cols-3">
				<div className="rounded-3xl bg-white/5 p-4">
					<p className="text-xs uppercase tracking-[0.25em] text-slate-400">Amount</p>
					<p className="mt-2 text-lg font-bold text-white">{order.amount}</p>
				</div>
				<div className="rounded-3xl bg-white/5 p-4">
					<p className="text-xs uppercase tracking-[0.25em] text-slate-400">Due date</p>
					<p className="mt-2 text-lg font-bold text-white">{order.due}</p>
				</div>
				<div className="rounded-3xl bg-white/5 p-4">
					<p className="text-xs uppercase tracking-[0.25em] text-slate-400">Action</p>
					<p className="mt-2 text-lg font-bold text-white">Update status</p>
				</div>
			</div>
		</article>
	);
}

export default OrderCard;
