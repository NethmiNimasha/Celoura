import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://celourafashion.com"),
  title: "Celoura Fashion | Bespoke Custom Lehengas & Haute Couture",
  description: "Celoura Fashion specializes in custom-made frocks, designer skirts, saree blouses, and bridal lehengas. Your Dream Outfit, Designed Your Way. No. 129, Yakabedda, Matara road, Akuressa, Sri Lanka.",
  keywords: "Celoura Fashion, custom lehenga, bridal lehenga Sri Lanka, bespoke dress tailoring, black and gold couture, custom women fashion, lehenga ordering system",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Celoura Fashion | Your Dream Outfit, Designed Your Way",
    description: "Custom-made Lehengas and couture fashion tailored to your exact measurements, color, and style.",
    url: "https://celourafashion.com",
    siteName: "Celoura Fashion",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Celoura Fashion Logo",
      },
    ],
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
