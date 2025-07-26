import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'My SEO Blog',
    template: '%s | My SEO Blog'
  },
  description: 'A modern, SEO-optimized blog built with Next.js',
  keywords: ['blog', 'Next.js', 'SEO', 'web development'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'My SEO Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'My SEO Blog',
    description: 'A modern, SEO-optimized blog built with Next.js',
    url: 'https://yourdomain.com',
    siteName: 'My SEO Blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My SEO Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My SEO Blog',
    description: 'A modern, SEO-optimized blog built with Next.js',
    creator: '@yourusername',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}