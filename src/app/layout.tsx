import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import Script from 'next/script';
import { SITE_CONFIG, generateWebSiteSchema, generateOrganizationSchema } from '@/lib/seo';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.titleDefault,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.descriptionDefault,
  keywords: SITE_CONFIG.keywordsDefault,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    url: SITE_CONFIG.siteUrl,
    title: SITE_CONFIG.titleDefault,
    description: SITE_CONFIG.descriptionDefault,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`,
        width: 512,
        height: 512,
        alt: `${SITE_CONFIG.name} — Free Online Tic Tac Toe`,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.titleDefault,
    description: SITE_CONFIG.descriptionDefault,
    images: [`${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`],
  },
};

const rootJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [generateWebSiteSchema(), generateOrganizationSchema()],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-zinc-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white font-sans transition-colors">
        {children}

        {/* Semantic Pre-Rendered noscript SEO Fallback */}
        <noscript>
          <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '1200px', margin: '0 auto', lineHeight: '1.6' }}>
            <h1>tickytoe — Free Online Tic Tac Toe with Unbeatable AI & Local 2-Player</h1>
            <p>
              Welcome to tickytoe, the modern online Tic Tac Toe platform. Play against an unbeatable computer AI powered by
              the Minimax algorithm with alpha-beta pruning, or challenge friends in local 2-player mode.
            </p>
            <h2>Key Game Modes & Features</h2>
            <ul>
              <li><strong>Multiple Grid Sizes:</strong> Classic 3x3 (3-in-a-row), Expanded 4x4 (4-in-a-row), and Epic 5x5 Gomoku-style boards.</li>
              <li><strong>Unbeatable Minimax AI:</strong> 4 difficulty levels ranging from Easy to Master with Alpha-Beta pruning.</li>
              <li><strong>Sensory Immersion:</strong> Synthesized retro Web Audio effects and celebratory particle confetti.</li>
              <li><strong>Game Speed Timer:</strong> Optional blitz speed timer (5s, 10s, 15s) for rapid gameplay.</li>
              <li><strong>Move History & Undo:</strong> Non-destructive 1-click move undo.</li>
              <li><strong>Full Accessibility:</strong> Complete keyboard navigation (Arrow keys & Enter) and dark/light modes.</li>
              <li><strong>100% Private & Offline:</strong> Zero data tracking, zero ads, zero external servers.</li>
            </ul>
          </div>
        </noscript>

        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6MYPYN276J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6MYPYN276J');
          `}
        </Script>
      </body>
    </html>
  );
}
