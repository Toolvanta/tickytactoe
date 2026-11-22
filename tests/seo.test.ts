import { describe, it, expect } from 'vitest';
import { getAllModes, getModeBySlug } from '../src/data/modes';
import {
  SITE_CONFIG,
  buildModeMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
} from '../src/lib/seo';

describe('SEO & Modes Registry Architecture', () => {
  const modes = getAllModes();

  it('should have all 5 official game modes configured', () => {
    expect(modes.length).toBeGreaterThanOrEqual(5);
    const slugs = modes.map((m) => m.slug);
    expect(slugs).toContain('3x3');
    expect(slugs).toContain('4x4');
    expect(slugs).toContain('5x5');
    expect(slugs).toContain('2-player');
    expect(slugs).toContain('ai');
  });

  it('should guarantee unique slugs and canonical URLs', () => {
    const slugs = modes.map((m) => m.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);

    const titles = modes.map((m) => m.seoTitle);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('should enforce optimal SEO title and description lengths', () => {
    for (const mode of modes) {
      // Titles should generally be <= 65 chars (excluding brand suffix)
      expect(mode.seoTitle.length).toBeGreaterThanOrEqual(25);
      expect(mode.seoTitle.length).toBeLessThanOrEqual(65);

      // Meta descriptions should ideally be 120-165 chars for Google SERP display
      expect(mode.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(mode.seoDescription.length).toBeLessThanOrEqual(165);
    }
  });

  it('should have valid related mode links with no broken references', () => {
    const allSlugs = new Set(modes.map((m) => m.slug));
    for (const mode of modes) {
      expect(mode.relatedSlugs.length).toBeGreaterThan(0);
      for (const related of mode.relatedSlugs) {
        expect(allSlugs.has(related)).toBe(true);
        expect(related).not.toBe(mode.slug); // Should not link to itself
      }
    }
  });

  it('should provide non-empty rules, strategies, and FAQs for every mode', () => {
    for (const mode of modes) {
      expect(mode.rules.length).toBeGreaterThanOrEqual(3);
      expect(mode.strategies.length).toBeGreaterThanOrEqual(2);
      expect(mode.faqs.length).toBeGreaterThanOrEqual(2);
      for (const faq of mode.faqs) {
        expect(faq.q).toBeTruthy();
        expect(faq.a).toBeTruthy();
      }
    }
  });

  it('generates compliant JSON-LD schemas', () => {
    const website = generateWebSiteSchema();
    expect(website['@type']).toBe('WebSite');
    expect(website.url).toBe(SITE_CONFIG.siteUrl);

    const org = generateOrganizationSchema();
    expect(org['@type']).toBe('Organization');

    const mode = getModeBySlug('3x3')!;
    const softwareApp = generateSoftwareApplicationSchema(mode);
    expect(softwareApp['@type']).toBe('WebApplication');
    expect(softwareApp.url).toContain('/play/3x3');

    const breadcrumbs = generateBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: '3x3', path: '/play/3x3' },
    ]);
    expect(breadcrumbs['@type']).toBe('BreadcrumbList');
    expect(breadcrumbs.itemListElement).toHaveLength(2);

    const faqSchema = generateFAQSchema(mode.faqs);
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity).toHaveLength(mode.faqs.length);
  });

  it('builds dynamic Next.js page metadata accurately', () => {
    const mode = getModeBySlug('ai')!;
    const meta = buildModeMetadata(mode);
    expect(meta.title).toBe(mode.seoTitle);
    expect(meta.description).toBe(mode.seoDescription);
    expect(meta.alternates?.canonical).toBe(`${SITE_CONFIG.siteUrl}/play/ai`);
    expect(meta.openGraph?.url).toBe(`${SITE_CONFIG.siteUrl}/play/ai`);
  });
});
