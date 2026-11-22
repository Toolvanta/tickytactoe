import { Difficulty, GameMode, GridSize } from '@/core';

export interface GameModeConfig {
  slug: string;
  name: string;
  shortName: string;
  category: 'Grid Sizes' | 'Opponent Modes';
  gridSize: GridSize;
  defaultMode: GameMode;
  defaultDifficulty: Difficulty;
  defaultTimer: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  headline: string;
  subheadline: string;
  intro: string;
  rules: string[];
  strategies: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
}

export const GAME_MODES: GameModeConfig[] = [
  {
    slug: '3x3',
    name: 'Classic 3x3 Tic Tac Toe',
    shortName: '3x3 Classic',
    category: 'Grid Sizes',
    gridSize: 3,
    defaultMode: 'ai',
    defaultDifficulty: 'unbeatable',
    defaultTimer: 0,
    primaryKeyword: '3x3 tic tac toe',
    secondaryKeywords: [
      'classic tic tac toe online',
      'play 3x3 tic tac toe',
      'unbeatable 3x3 tic tac toe',
      'noughts and crosses 3x3',
    ],
    seoTitle: 'Play 3x3 Tic Tac Toe Online - Unbeatable AI & 2-Player',
    seoDescription:
      'Play classic 3x3 Tic Tac Toe online for free. Challenge the unbeatable Minimax AI or play local 2-player mode with retro sounds and instant moves.',
    headline: 'Classic 3x3 Tic Tac Toe Grid',
    subheadline:
      'The timeless 3-in-a-row zero-sum board game, mathematically solved with Minimax AI.',
    intro:
      'Standard 3x3 Tic Tac Toe is played on a 3 by 3 grid consisting of 9 squares. Players alternate placing X and O marks, aiming to align 3 consecutive symbols horizontally, vertically, or diagonally. Under mathematically optimal play, standard 3x3 unconditionally results in a draw.',
    rules: [
      'Two players alternate marking empty squares with X or O on the 3x3 grid.',
      'Player X always makes the opening move.',
      'The first player to align 3 of their marks horizontally, vertically, or diagonally wins immediately.',
      'If all 9 squares are filled and neither player has 3 in a row, the match is declared a draw.',
    ],
    strategies: [
      {
        title: 'Center Dominance',
        desc: 'Claiming the central cell (index 4) on move one opens 4 distinct winning lines (horizontal, vertical, and both diagonals), drastically constraining your opponent.',
      },
      {
        title: 'Corner Forking',
        desc: 'Opening in a corner allows you to set up multi-pronged "forks" on turn 3, threatening two independent winning lines simultaneously that cannot both be blocked.',
      },
      {
        title: 'Defensive Anti-Forking',
        desc: 'When playing second, counter corner openings by occupying the center. If your opponent controls two opposing corners, respond with an edge move to avoid forced traps.',
      },
    ],
    faqs: [
      {
        q: 'Can the computer AI ever lose on a 3x3 board in Master mode?',
        a: 'No. On the 3x3 grid, standard Tic Tac Toe is a solved zero-sum game. The Master difficulty executes Minimax with alpha-beta pruning, evaluating the entire 5,478 reachable game tree. Optimal human counter-play will always end in a draw.',
      },
      {
        q: 'How many legal board states exist in 3x3 Tic Tac Toe?',
        a: 'There are exactly 5,478 legal reachable board states and 765 unique strategically distinct configurations once 8-fold rotational and reflective symmetries are factored in.',
      },
      {
        q: 'Can I play 3x3 with a friend on the same screen?',
        a: 'Yes. Switch the game mode toggle to "Local 2P" to play pass-and-play matches with a friend on mobile, tablet, or desktop with real-time score tracking.',
      },
    ],
    relatedSlugs: ['4x4', '5x5', 'ai', '2-player'],
  },
  {
    slug: '4x4',
    name: 'Expanded 4x4 Tic Tac Toe',
    shortName: '4x4 Expanded',
    category: 'Grid Sizes',
    gridSize: 4,
    defaultMode: 'ai',
    defaultDifficulty: 'unbeatable',
    defaultTimer: 0,
    primaryKeyword: '4x4 tic tac toe',
    secondaryKeywords: [
      '4 in a row tic tac toe',
      'expanded tic tac toe 4x4',
      'play 4x4 tic tac toe online',
      '4x4 grid board game',
    ],
    seoTitle: '4x4 Tic Tac Toe Online - 4 in a Row Grid Challenge',
    seoDescription:
      'Play expanded 4x4 Tic Tac Toe online for free. Connect 4 symbols in a row across 16 cells with strategic AI and local 2-player support.',
    headline: 'Expanded 4x4 Grid — 4 in a Row',
    subheadline:
      'A richer tactical battlefield featuring 16 squares and 10 distinct winning alignments.',
    intro:
      'The 4x4 grid mode elevates classic gameplay by expanding the board to 16 cells. The winning condition requires connecting 4 consecutive symbols horizontally, vertically, or diagonally. With 4 rows, 4 columns, and 2 main diagonals, games feature heightened tactical maneuvering and defensive pressure.',
    rules: [
      'Played on a 4x4 grid of 16 empty cells.',
      'Players take turns placing their respective symbols (X or O).',
      'The objective is to align 4 consecutive marks along any row, column, or diagonal.',
      'If all 16 cells are filled without a 4-in-a-row alignment, the game ends in a draw.',
    ],
    strategies: [
      {
        title: 'Central 2x2 Quadrant Control',
        desc: 'Controlling the four inner cells provides direct access to both main diagonals as well as multiple central rank and file alignments.',
      },
      {
        title: 'Open-Ended Triples',
        desc: 'Create an unblocked sequence of 3 marks with both endpoints open. When achieved, your opponent can only block one end, leaving the opposite flank open for a guaranteed win.',
      },
      {
        title: 'Diagonal Cross-Intersections',
        desc: 'Position marks at the intersection of diagonals and rows to double your threats while limiting the opponent’s counter-attacking lanes.',
      },
    ],
    faqs: [
      {
        q: 'What is the win target in 4x4 mode?',
        a: 'The win target is 4 marks in a row (horizontal, vertical, or diagonal across the entire grid dimension).',
      },
      {
        q: 'Does 4x4 take longer than classic 3x3?',
        a: '4x4 matches typically last between 10 to 16 moves, offering deeper tactical interplay without sacrificing fast-paced arcade action.',
      },
      {
        q: 'How does the AI play on the 4x4 board?',
        a: 'The AI uses depth-bounded heuristic Minimax with Alpha-Beta pruning, aggressively searching forward multiple turns to discover tactical alignments and block opponent threats.',
      },
    ],
    relatedSlugs: ['3x3', '5x5', '2-player', 'ai'],
  },
  {
    slug: '5x5',
    name: 'Epic 5x5 Gomoku Tic Tac Toe',
    shortName: '5x5 Epic',
    category: 'Grid Sizes',
    gridSize: 5,
    defaultMode: 'ai',
    defaultDifficulty: 'unbeatable',
    defaultTimer: 0,
    primaryKeyword: '5x5 tic tac toe',
    secondaryKeywords: [
      '5x5 grid tic tac toe',
      'gomoku tic tac toe',
      'connect 4 in a row 5x5',
      'play 5x5 tic tac toe online',
    ],
    seoTitle: '5x5 Tic Tac Toe Online - Gomoku Style Board Battle',
    seoDescription:
      'Play 5x5 Tic Tac Toe online for free. Connect 4 marks in a row across 25 squares Gomoku-style with tactical AI and 2-player local matches.',
    headline: 'Epic 5x5 Grid — Gomoku-Style Battle',
    subheadline:
      '25 cells with a 4-in-a-row victory target, inspired by traditional Gomoku.',
    intro:
      'The 5x5 grid offers our most expansive tactical canvas. Featuring 25 cells with a 4-in-a-row victory target, this mode mirrors principles of Gomoku and Five-in-a-Row. Players must balance aggressive multi-directional attacks with vigilant perimeter defense.',
    rules: [
      'Played on a 5x5 matrix comprising 25 squares.',
      'Players alternate placing their chosen marks on empty squares.',
      'Winning requires aligning 4 consecutive marks horizontally, vertically, or diagonally.',
      'Because 4 marks suffice on a 5x5 board, each line contains multiple overlapping 4-segment winning windows.',
    ],
    strategies: [
      {
        title: 'Sub-Grid Clustering',
        desc: 'Cluster your early marks near the central 3x3 sector. Central placement allows marks to participate in both horizontal, vertical, and offset diagonal alignments.',
      },
      {
        title: 'Multi-Threat Branching',
        desc: 'Build L-shaped or T-shaped formations that threaten 4-in-a-row completions in two directions at the same time.',
      },
      {
        title: 'Anticipate Split Streaks',
        desc: 'Watch for opponent marks placed with a single empty square in between (e.g., X - _ - X - X). These "split triples" can be completed instantly if left unblocked.',
      },
    ],
    faqs: [
      {
        q: 'Why is the win target 4 instead of 5 on the 5x5 grid?',
        a: 'A 4-in-a-row target on a 5x5 board produces fluid, dynamic matches that avoid excessive draws and encourage sharp, decisive tactical maneuvering.',
      },
      {
        q: 'Can winning diagonals be shorter than 5 cells?',
        a: 'Yes, any 4-cell contiguous diagonal (both the main 5-length diagonals and adjacent 4-length diagonals) counts toward victory.',
      },
      {
        q: 'Is 5x5 mode mobile friendly?',
        a: 'Yes! The 5x5 grid is optimized with responsive cellular touch targets, haptic feedback on compatible devices, and clean pinch-free scaling on mobile viewports.',
      },
    ],
    relatedSlugs: ['3x3', '4x4', 'ai', '2-player'],
  },
  {
    slug: '2-player',
    name: 'Local 2-Player Tic Tac Toe',
    shortName: 'Local 2-Player',
    category: 'Opponent Modes',
    gridSize: 3,
    defaultMode: 'pvp',
    defaultDifficulty: 'unbeatable',
    defaultTimer: 0,
    primaryKeyword: '2 player tic tac toe',
    secondaryKeywords: [
      'tic tac toe 2 player online',
      'two player tic tac toe',
      'play tic tac toe with friends',
      'local multiplayer tic tac toe',
    ],
    seoTitle: '2 Player Tic Tac Toe Online - Play Local Head-to-Head',
    seoDescription:
      'Play free 2-player Tic Tac Toe online with a friend on the same screen. Pass-and-play local multiplayer with instant score tracking and turn indicators.',
    headline: 'Local 2-Player Head-to-Head Mode',
    subheadline:
      'Pass-and-play multiplayer on phone, tablet, or desktop with real-time head-to-head scorecards.',
    intro:
      'Challenge friends, family, or colleagues on a single device with local 2-Player pass-and-play mode. Featuring distinct player color branding, live turn notifications, 1-click move undo, and session win tracking, it provides the ultimate local tabletop experience without physical paper or pen.',
    rules: [
      'Two human players take turns on the same device.',
      'Player 1 controls X (Cyan Glow) and Player 2 controls O (Neon Rose).',
      'Select your preferred grid dimension: 3x3, 4x4, or 5x5.',
      'Use 1-click Undo if a misclick occurs during your match.',
      'Round wins and draws are automatically recorded in the local scoreboard.',
    ],
    strategies: [
      {
        title: 'Tempo Control',
        desc: 'Force your opponent into reactive blocking moves, maintaining the initiative until you assemble an unblockable dual fork.',
      },
      {
        title: 'Psychological Corner Traps',
        desc: 'Experienced players often anticipate center replies. Try opening in opposite corners to bait opponents into vulnerable edge responses.',
      },
      {
        title: 'Enable Speed Blitz Timer',
        desc: 'Add speed pressure by enabling the Blitz Timer (5s, 10s, 15s) in settings for exhilarating rapid-fire rounds.',
      },
    ],
    faqs: [
      {
        q: 'Do both players need separate devices to play 2-Player mode?',
        a: 'No. Local 2-Player is designed as a pass-and-play experience on a shared phone, tablet, laptop, or desktop monitor.',
      },
      {
        q: 'Can we switch between 3x3, 4x4, and 5x5 while playing 2-Player?',
        a: 'Yes, you can toggle between grid sizes at any time using the in-game size switcher without losing your session score tally.',
      },
      {
        q: 'Can we customize our player symbols?',
        a: 'Yes! Open Settings to choose between Classic X & O, Cyber Glow symbols, or battle-themed Emojis (⚔️ and 🛡️).',
      },
    ],
    relatedSlugs: ['ai', '3x3', '4x4', '5x5'],
  },
  {
    slug: 'ai',
    name: 'Tic Tac Toe vs Unbeatable AI',
    shortName: 'Vs Minimax AI',
    category: 'Opponent Modes',
    gridSize: 3,
    defaultMode: 'ai',
    defaultDifficulty: 'unbeatable',
    defaultTimer: 0,
    primaryKeyword: 'tic tac toe vs ai',
    secondaryKeywords: [
      'unbeatable ai tic tac toe',
      'tic tac toe against computer',
      'minimax tic tac toe',
      'play tic tac toe against computer',
    ],
    seoTitle: 'Tic Tac Toe vs AI - Challenge the Unbeatable Computer',
    seoDescription:
      'Play Tic Tac Toe against the computer online for free. Test your skills against 4 AI difficulty levels including unbeatable Minimax with Alpha-Beta pruning.',
    headline: 'Challenge the Unbeatable Minimax AI',
    subheadline:
      '4 difficulty levels ranging from relaxed Easy to mathematically proven Master.',
    intro:
      'Test your tactical acumen against our mathematically proven AI engine. Built with John von Neumann’s Minimax theorem and McCarthy’s Alpha-Beta pruning, our AI evaluates millions of board trajectories in milliseconds. Whether you want a relaxed casual match or a master-class challenge, choose from Easy, Medium, Hard, and Master difficulties.',
    rules: [
      'Human plays as X by default (customizable in Settings), AI plays as O.',
      'Choose from 4 AI levels: Easy (casual), Medium (balanced), Hard (sharp), and Master (unbeatable).',
      'All AI computations run 100% locally in your browser with zero latency and zero server lag.',
      'Supports all grid sizes (3x3, 4x4, and 5x5) and blitz speed timers.',
    ],
    strategies: [
      {
        title: 'Master Difficulty (Unbeatable)',
        desc: 'The AI will never make a tactical mistake. Optimal play by the human player results in a guaranteed draw. Strive for flawless defensive play.',
      },
      {
        title: 'Exploiting Easy & Medium Modes',
        desc: 'Easy and Medium AI modes introduce calculated blunder rates. Set up multi-line forks to catch the AI off guard.',
      },
      {
        title: 'Switching Player Symbols',
        desc: 'Want an even harder challenge? Go to Settings and choose to play as Player O (moving second against an opening AI move).',
      },
    ],
    faqs: [
      {
        q: 'How does the Minimax algorithm work in tickytoe?',
        a: 'Minimax recursively simulates every valid remaining game branch, assigning +10 to winning terminal states, -10 to losses, and 0 to draws. Alpha-Beta pruning discards branches that cannot influence the final decision, achieving maximum computational efficiency.',
      },
      {
        q: 'Does the AI send my moves to a remote cloud server?',
        a: 'No. The entire engine executes natively in client-side JavaScript on your device, ensuring total privacy, zero bandwidth usage, and instant offline play.',
      },
      {
        q: 'Can I beat the Master AI if I play first?',
        a: 'No. Standard 3x3 Tic Tac Toe is a zero-sum solved game. When the AI plays optimally, the best possible result for Player 1 is a draw.',
      },
    ],
    relatedSlugs: ['3x3', '2-player', '4x4', '5x5'],
  },
];

export function getAllModes(): GameModeConfig[] {
  return GAME_MODES;
}

export function getModeBySlug(slug: string): GameModeConfig | undefined {
  return GAME_MODES.find((m) => m.slug === slug);
}
