import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, HelpCircle } from 'lucide-react';
import { GameClient } from '@/components/GameClient';
import { getAllModes, getModeBySlug } from '@/data/modes';
import {
  buildModeMetadata,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo';

interface PlayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const modes = getAllModes();
  return modes.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PlayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mode = getModeBySlug(slug);
  if (!mode) return {};
  return buildModeMetadata(mode);
}

export default async function PlayModePage({ params }: PlayPageProps) {
  const { slug } = await params;
  const mode = getModeBySlug(slug);

  if (!mode) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: mode.name, path: `/play/${mode.slug}` },
  ];

  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateBreadcrumbSchema(breadcrumbs),
      generateSoftwareApplicationSchema(mode),
      generateFAQSchema(mode.faqs),
    ],
  };

  const relatedModes = mode.relatedSlugs
    .map((s) => getModeBySlug(s))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <GameClient
        initialGridSize={mode.gridSize}
        initialMode={mode.defaultMode}
        initialDifficulty={mode.defaultDifficulty}
        initialTimer={mode.defaultTimer}
        pageTitle={mode.headline}
        pageSubtitle={mode.subheadline}
        activeSlug={mode.slug}
      />

      {/* Mode-Specific Educational & Tactical Content Section */}
      <section
        aria-labelledby="mode-guide-heading"
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 border-t border-slate-200/80 dark:border-slate-800/80 space-y-10"
      >
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{mode.name}</span>
        </nav>

        {/* Detailed Overview */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <span>{mode.category}</span>
          </div>
          <h2 id="mode-guide-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            {mode.name} — Comprehensive Guide & Rules
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {mode.intro}
          </p>
        </div>

        {/* Key Rules Matrix */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span>Official Rules for {mode.name}</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {mode.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" aria-hidden="true" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tactical Strategy Advice */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-500" />
            <span>Winning Strategies & Tactics</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-3.5 sm:gap-4">
            {mode.strategies.map((strat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                  {strat.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {strat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-3">
            {mode.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5"
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Game Modes Internal Links */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Explore Other Game Modes & Grid Sizes
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {relatedModes.map((rm) => (
              <Link
                key={rm.slug}
                href={`/play/${rm.slug}`}
                className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {rm.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {rm.subheadline}
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Play Mode</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
