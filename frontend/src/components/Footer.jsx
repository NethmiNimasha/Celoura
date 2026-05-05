function Footer() {
	return (
		<footer className="mt-10 border-t border-white/70 bg-white/75 backdrop-blur-xl">
			<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
				<div>
					<p className="text-lg font-black text-slate-900">Tailoria</p>
					<p className="mt-2 text-sm text-slate-600">Online tailoring orders, measurements, and delivery tracking.</p>
				</div>

				<div className="grid gap-y-10 gap-x-20 text-sm text-slate-700 sm:grid-cols-2 lg:text-right">
					<div className="space-y-3">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Contact</p>
						<p className="font-semibold text-slate-900">+94 77 123 4567</p>
						<p>support@tailoria.lk</p>
					</div>
					<div className="space-y-3">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Visit</p>
						<p className="font-semibold text-slate-900">No. 12, Main Street</p>
						<p>Colombo, Sri Lanka</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
