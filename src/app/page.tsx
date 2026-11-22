import { Metadata } from 'next';
import { GameClient } from '@/components/GameClient';
import {
  buildPageMetadata,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'tickytoe - Free Online Tic Tac Toe with Unbeatable AI & Local 2-Player',
  description:
    'Play free, modern, and feature-rich Tic Tac Toe online on tickytoe. Challenge unbeatable AI, play local 2-player mode, enjoy 3x3, 4x4, 5x5 boards, sound effects, and stats tracking.',
  canonicalPath: '/',
  keywords: [
    'tic tac toe online',
    'free tic tac toe',
    'play tic tac toe',
    'unbeatable ai tic tac toe',
    '2 player tic tac toe',
    '3x3 tic tac toe',
    '4x4 tic tac toe',
    '5x5 tic tac toe',
  ],
});

const homeFaqs = [
  {
    q: 'Can the Unbeatable AI be defeated on the 3x3 board?',
    a: 'Mathematically, 3x3 Tic Tac Toe is a zero-sum solved game. When the AI utilizes Minimax with alpha-beta pruning, optimal human play will always result in a draw. The AI evaluates every possible future move and will never make a tactical error.',
  },
  {
    q: 'What grid sizes can I play in this Tic Tac Toe game?',
    a: 'You can play Classic 3x3 (3-in-a-row), Expanded 4x4 (4-in-a-row), and Epic 5x5 (4-in-a-row Gomoku-style) boards.',
  },
  {
    q: 'How does Local 2-Player mode work?',
    a: 'Local 2-Player mode allows two players on the same device (desktop, tablet, or phone) to take turns placing their marks with real-time scorecards and 1-click move undo.',
  },
  {
    q: 'Can I play tickytoe offline or install it as a PWA?',
    a: 'Yes! tickytoe functions completely offline. You can install it on your device directly as a Progressive Web App (PWA) with zero storage footprint and instant offline play.',
  },
  {
    q: 'Does tickytoe store my personal data or gameplay history?',
    a: 'No. tickytoe employs a strict zero-log architecture. No accounts, cookies, analytics pixels, or backend databases exist. Your match statistics and audio settings remain stored locally on your device in HTML5 LocalStorage and can be reset at any time.',
  },
];

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [generateSoftwareApplicationSchema(), generateFAQSchema(homeFaqs)],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <GameClient
        pageTitle="Free Online Tic Tac Toe with Unbeatable AI & Local 2-Player"
        pageSubtitle="Challenge unbeatable Minimax AI across 4 difficulty levels, or compete in local 2-player pass-and-play matches across 3x3, 4x4, and 5x5 boards."
      />
    </>
  );
}
