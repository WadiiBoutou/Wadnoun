import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../components/LanguageProvider";
import { SmoothScroll } from "../components/SmoothScroll";
import { LenisScrollBar } from "../components/LenisScrollBar";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "rgb(10 15 13)",
};

export const metadata: Metadata = {
  title: "WadNoun",
  description: "WadNoun SARL : travaux d'électrification, postes de transformation, éclairage public, distribution et contrôle électrique, économie d'énergie. Expertise terrain au Maroc depuis 2014.",
  keywords: "électrification, postes de transformation, éclairage public, distribution électrique, économie d'énergie, infrastructure électrique, Maroc, ONEE, HTA, BT",
  metadataBase: new URL("https://wadnoun.ma"),
  icons: {
    icon: [
      { url: "/weblogo.webp", type: "image/webp", sizes: "32x32" },
      { url: "/weblogo.webp", type: "image/webp", sizes: "192x192" },
    ],
    shortcut: [{ url: "/weblogo.webp", type: "image/webp" }],
    apple: [{ url: "/weblogo.webp", type: "image/webp", sizes: "180x180" }],
  },
  openGraph: {
    title: "WadNoun",
    description: "Travaux d'électrification, postes de transformation, éclairage public, distribution et économie d'énergie. 200+ projets réalisés au Maroc.",
    url: "https://wadnoun.ma",
    siteName: "WadNoun",
    type: "website",
    locale: "fr_MA",
  },
  twitter: {
    card: "summary_large_image",
    title: "WadNoun",
    description:
      "Travaux d'électrification, postes de transformation, éclairage public, distribution et économie d'énergie.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr" className={`${outfit.variable} ${cairo.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-gray-800 bg-white selection:bg-primary/30 min-h-screen flex flex-col">
        <LanguageProvider>
          <Script
            id="wadnoun-ld-json"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "WADNOUN AD SARL",
                url: "https://wadnoun.ma",
                telephone: "+212602606041",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "MA",
                },
                description:
                  "Travaux d'électrification, postes de transformation, éclairage public, distribution & contrôle électrique, économie d'énergie. Expertise terrain au Maroc depuis 2014.",
                areaServed: "Morocco",
              }),
            }}
          />
          <SmoothScroll />
          <LenisScrollBar />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
