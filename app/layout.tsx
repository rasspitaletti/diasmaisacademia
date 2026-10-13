import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'

/** Títulos: Oswald (força e personalidade). */
const display = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

/** Textos, botões, preços e menus: Inter (legibilidade). */
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

const description =
  'Academia Dias Mais Fitness no Jaguaribe, Osasco: musculação, Boxe, Muay Thai, Jump, Zumba, Sertanejo, FitDance e Pilates. Agende sua aula experimental pelo WhatsApp.'

export const metadata: Metadata = {
  title: 'Dias Mais Fitness | Academia no Jaguaribe, Osasco',
  description,
  keywords: ['academia Osasco', 'academia Jaguaribe', 'musculação Osasco', 'Muay Thai Osasco', 'Boxe Osasco', 'Jump', 'Zumba', 'Pilates'],
  openGraph: {
    title: 'Dias Mais Fitness | Academia em Osasco',
    description,
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/images/hero-fachada.jpg', width: 720, height: 1060, alt: 'Fachada da Dias Mais Fitness' }],
  },
  icons: {
    icon: [{ url: '/images/logo-dias-mais-fitness.png', type: 'image/png' }],
    apple: '/images/logo-dias-mais-fitness.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

/** Dados estruturados para o Google (sem nota/avaliação inventada). */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: 'Dias Mais Fitness',
  image: '/images/hero-fachada.jpg',
  telephone: '+55 11 3591-1207',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Flora, 1052, Jaguaribe',
    addressLocality: 'Osasco',
    addressRegion: 'SP',
    postalCode: '06053-130',
    addressCountry: 'BR',
  },
  sameAs: ['https://www.instagram.com/diasmaisfitness/', 'https://www.facebook.com/diasmaisfitness'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
