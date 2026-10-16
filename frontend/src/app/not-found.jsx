import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 shadow-gold-sm mb-6">
        <Sparkles className="h-8 w-8 text-amber-400" />
      </div>
      <h1 className="font-cinzel text-4xl sm:text-5xl font-black text-white">404</h1>
      <h2 className="font-cinzel text-xl font-bold text-amber-300 mt-2">Haute Silhouette Not Found</h2>
      <p className="mt-2 text-xs text-zinc-400 max-w-sm">
        The couture page you are looking for has been moved or does not exist.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="btn-gold rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Boutique</span>
        </Link>
      </div>
    </div>
  );
}
