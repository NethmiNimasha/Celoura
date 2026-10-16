import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/50 bg-black/90 p-0.5 shadow-gold-md overflow-hidden">
        <Image
          src="/logo.png"
          alt="Celoura Fashion Logo"
          width={80}
          height={80}
          className="h-full w-full object-cover rounded-full"
        />
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
