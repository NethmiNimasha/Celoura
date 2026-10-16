import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Celoura Fashion | Bespoke Custom Lehengas & Haute Couture",
  description: "Celoura Fashion specializes in custom-made bridal Lehengas, royal velvet ensembles, and personalized dress tailoring. Your Dream Outfit, Designed Your Way. Kirindiwela, Sri Lanka.",
  keywords: "Celoura Fashion, custom lehenga, bridal lehenga Sri Lanka, bespoke dress tailoring, black and gold couture, custom women fashion, lehenga ordering system",
  openGraph: {
    title: "Celoura Fashion | Your Dream Outfit, Designed Your Way",
    description: "Custom-made Lehengas and couture fashion tailored to your exact measurements, color, and style.",
    url: "https://celourafashion.com",
    siteName: "Celoura Fashion",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#070709] text-zinc-100 antialiased selection:bg-amber-400/30 selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
