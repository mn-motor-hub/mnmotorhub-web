import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import '@/styles/globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  // Literal a propósito, no `process.env.NEXT_PUBLIC_SITE_URL` — esa variable
  // no existe en este repo (ver CLAUDE.md). Resuelve a absolutas las
  // `alternates.canonical` relativas de las páginas hijas.
  metadataBase: new URL('https://mnmotorhub.com'),
  title: 'MN Motor Hub — Repuestos Automotrices en Venezuela',
  description:
    'Repuestos y kits de mantenimiento para carros en Venezuela. Stock real, envío a todo el país y atención directa por WhatsApp.',
  icons: {
    icon: [{ url: '/images/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/images/logo.svg',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${oswald.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
