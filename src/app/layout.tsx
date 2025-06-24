import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Kura Art Studio | Authentic Zimbabwean Art',
  description: 'Discover one-of-a-kind Zimbabwean artwork from verified artists. Connect with heritage through authentic art pieces curated for the global diaspora.',
  keywords: 'Zimbabwean art, African art, authentic artwork, diaspora, heritage, handmade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className="font-sans bg-warm-white text-soft-charcoal">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
} 