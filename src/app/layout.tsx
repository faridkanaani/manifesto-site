import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Zero Point | Farid Kanaani",
  description: "A digital manifesto of code and art.",
  metadataBase: new URL("https://faridkanaani.vercel.app"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Zero Point | Farid Kanaani",
    description: "A digital manifesto of code and art.",
    url: "https://faridkanaani.vercel.app/",
    siteName: "Zero Point",
    images: [
      {
        url: "/Brand-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Farid Kanaani",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Point | Farid Kanaani",
    description: "A digital manifesto of code and art.",
    images: ["/Brand-removebg-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}
      >
        <Script
          defer
          data-domain="faridkanaani.vercel.app"
          src="https://plausible.io/js/script.js"
        />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
