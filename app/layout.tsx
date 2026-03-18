import type { Metadata } from 'next'
import { Syne, DM_Sans, Cairo } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../components/LanguageProvider'
import { PageLoader } from '../components/PageLoader'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'] })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm', weight: ['400', '500'] })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', weight: ['400', '700'] })

export const metadata: Metadata = {
  title: "WadNoun — Énergies Renouvelables",
  description: "Expert en solutions d'énergie renouvelable au Maroc."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr" className={`${syne.variable} ${dmSans.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased text-gray-800 bg-white selection:bg-primary/30 min-h-screen flex flex-col">
        <LanguageProvider>
          <PageLoader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
