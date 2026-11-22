import { Metadata } from 'next';
import { GameModeConfig } from '@/data/modes';

export const SITE_CONFIG = {
  name: 'tickytoe',
  titleDefault: 'tickytoe - Free Online Tic Tac Toe with Unbeatable AI & Local 2-Player',
  titleTemplate: '%s | tickytoe',
  descriptionDefault:
    'Play free, modern, and feature-rich Tic Tac Toe online on tickytoe. Challenge unbeatable AI, play local 2-player mode, enjoy 3x3, 4x4, 5x5 boards, sound effects, and stats tracking.',
  siteUrl: 'https://tickytoe.netlify.app',
  ogImage: '/icon-512.png',
  author: 'Shoaib M Arif',
  githubUrl: 'https://github.com/shoaibmarif',
  twitterHandle: '@tickytoe',
  keywordsDefault: [
    'tickytoe',
    'tic tac toe',
    'play tic tac toe',
    'tic tac toe online',
    'free tic tac toe',
    '2 player tic tac toe',
    'tickytoe game',
    'tic tac toe against computer',
    '4x4 tic tac toe',
    '5x5 tic tac toe',
    'unbeatable ai tic tac toe',
    'minimax tic tac toe',
    'noughts and crosses',
  ],
};

export function buildPageMetadata(params: {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const { title, description, canonicalPath = '', keywords = [], noIndex = false } = params;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  const allKeywords = Array.from(new Set([...keywords, ...SITE_CONFIG.keywordsDefault]));

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
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
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
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
      title,
      description,
      images: [`${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`],
      creator: SITE_CONFIG.twitterHandle,
    },
  };
}

export function buildModeMetadata(mode: GameModeConfig): Metadata {
  return buildPageMetadata({
    title: mode.seoTitle,
    description: mode.seoDescription,
    canonicalPath: `/play/${mode.slug}`,
    keywords: [mode.primaryKeyword, ...mode.secondaryKeywords],
  });
}

// Structured Data Generators
export function generateWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.siteUrl}/#website`,
    name: SITE_CONFIG.name,
    alternateName: ['tickytoe', 'TickyToe', 'Tic Tac Toe Online', 'tickytoe App'],
    url: SITE_CONFIG.siteUrl,
    inLanguage: 'en-US',
    description: SITE_CONFIG.descriptionDefault,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
      logo: `${SITE_CONFIG.siteUrl}/icon-512.png`,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.siteUrl}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/icon-512.png`,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
    },
  };
}

export function generateSoftwareApplicationSchema(mode?: GameModeConfig) {
  const name = mode ? `${mode.name} - tickytoe` : 'tickytoe — Free Online Tic Tac Toe';
  const url = mode ? `${SITE_CONFIG.siteUrl}/play/${mode.slug}` : SITE_CONFIG.siteUrl;
  const description = mode ? mode.seoDescription : SITE_CONFIG.descriptionDefault;

  return {
    '@type': 'WebApplication',
    '@id': `${url}/#webapp`,
    name,
    url,
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Classic 3x3, 4x4, and 5x5 dynamic grid sizes',
      'Minimax AI with alpha-beta pruning',
      'Local 2-player pass-and-play mode',
      'Synthesized Web Audio API sound effects',
      'Speed blitz turn timers (5s, 10s, 15s)',
      '100% private and offline-capable PWA',
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.siteUrl}${item.path}`,
    })),
  };
}

export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
