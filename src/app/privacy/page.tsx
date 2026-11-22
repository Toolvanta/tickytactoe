import type { Metadata } from 'next';
import { PrivacyClient } from '@/components/PrivacyClient';
import { buildPageMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy & Zero-Log Data Disclosure',
  description:
    'Learn about our 100% client-side privacy architecture, zero-telemetry policy, and local storage retention standards across the tickytoe platform.',
  canonicalPath: '/privacy',
  keywords: [
    'tickytoe privacy policy',
    'zero log tic tac toe',
    'private tic tac toe online',
    'gdpr compliant tic tac toe',
  ],
});

const privacyJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    generateBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ]),
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <PrivacyClient />
    </>
  );
}
