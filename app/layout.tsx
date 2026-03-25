import type { Metadata } from 'next'
import { Outfit, Cairo } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../components/LanguageProvider'
import { SmoothScroll } from '../components/SmoothScroll'
import { LenisScrollBar } from '../components/LenisScrollBar'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', weight: ['400', '500', '600', '700', '800', '900'] })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', weight: ['400', '700'] })

export const metadata: Metadata = {
  title: "WadNoun",
  description: "WadNoun SARL : travaux d'électrification, postes de transformation, éclairage public, distribution et contrôle électrique, économie d'énergie. Expertise terrain au Maroc depuis 2014.",
  keywords: "électrification, postes de transformation, éclairage public, distribution électrique, économie d'énergie, infrastructure électrique, Maroc, ONEE, HTA, BT",
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
    type: "website",
    locale: "fr_MA",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr" className={`${outfit.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased text-gray-800 bg-white selection:bg-primary/30 min-h-screen flex flex-col">
        <LanguageProvider>
          <SmoothScroll />
          <LenisScrollBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
