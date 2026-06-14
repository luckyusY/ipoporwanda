import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ipoporwa.vercel.app"),
  title: {
    default: "Ipopo Rwanda | Premium Property Rentals and Sales in Kigali",
    template: "%s | Ipopo Rwanda",
  },
  description:
    "Find verified homes, apartments, villas, land, and investment properties for rent or sale in Kigali, Rwanda.",
  keywords: [
    "Kigali property",
    "Rwanda real estate",
    "houses for rent Kigali",
    "apartments for sale Kigali",
    "Ipopo Rwanda",
  ],
  openGraph: {
    title: "Ipopo Rwanda",
    description: "Verified Kigali properties with fast WhatsApp and call enquiries.",
    type: "website",
    locale: "en_RW",
    siteName: "Ipopo Rwanda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ipopo Rwanda",
    description: "Premium property rentals and sales in Kigali.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
