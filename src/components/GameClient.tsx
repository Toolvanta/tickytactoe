'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Difficulty,
  GameMode,
  GameStats,
  GridSize,
  TicTacToeEngine,
} from '@/core';
import { Header } from './Header';
import { ScoreBoard } from './ScoreBoard';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { StatsModal } from './StatsModal';
import { SettingsModal } from './SettingsModal';
import { RulesSection } from './RulesSection';
import { Footer } from './Footer';
import { useTheme } from '@/hooks/useTheme';
import { useAudio } from '@/hooks/useAudio';
import { useConfetti } from '@/hooks/useConfetti';
import { WebSettings } from '@/types';
import { GAME_MODES } from '@/data/modes';

const INITIAL_STATS: GameStats = {
  totalGames: 0,
  xWins: 0,
  oWins: 0,
  draws: 0,
  currentStreak: 0,
  bestStreak: 0,
  history: [],
};

const INITIAL_SETTINGS: WebSettings = {
  symbolTheme: 'classic',
  turnTimerSeconds: 0,
  soundEnabled: true,
  volume: 0.5,
  playerSymbol: 'X',
};

interface GameClientProps {
  initialGridSize?: GridSize;
  initialMode?: GameMode;
  initialDifficulty?: Difficulty;
  initialTimer?: number;
  pageTitle?: string;
  pageSubtitle?: string;
  activeSlug?: string;
}

export const GameClient: React.FC<GameClientProps> = ({
  initialGridSize = 3,
  initialMode = 'ai',
  initialDifficulty = 'unbeatable',
  initialTimer = 0,
  pageTitle,
  pageSubtitle,
  activeSlug,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  // Settings
  const [settings, setSettings] = useState<WebSettings>(() => ({
    ...INITIAL_SETTINGS,
    turnTimerSeconds: initialTimer,
  }));

  // Stats
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);

  // Load saved settings & stats from localStorage on mount (hydration safe)
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('ttt_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          turnTimerSeconds: initialTimer > 0 ? initialTimer : parsed.turnTimerSeconds ?? 0,
        }));
      }
    } catch {}

    try {
      const savedStats = localStorage.getItem('ttt_stats');
      if (savedStats) {
        setStats({ ...INITIAL_STATS, ...JSON.parse(savedStats) });
      }
    } catch {}
  }, [initialTimer]);

  const updateSettings = (partial: Partial<WebSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem('ttt_settings', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const saveStats = (newStats: GameStats) => {
    setStats(newStats);
    try {
      localStorage.setItem('ttt_stats', JSON.stringify(newStats));
    } catch {}
  };

  const resetStats = () => {
    saveStats(INITIAL_STATS);
  };

  // Sound & Confetti
  const { playMove, playWin, playDraw, playClick, playTick } = useAudio(
    settings.soundEnabled,
    settings.volume
  );
  const { triggerConfetti } = useConfetti();

  // Modals
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Engine & Game State
  const engineRef = useRef<TicTacToeEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new TicTacToeEngine({
      gridSize: initialGridSize,
      mode: initialMode,
      difficulty: initialDifficulty,
      playerSymbol: INITIAL_SETTINGS.playerSymbol,
    });
  }

  const [gameState, setGameState] = useState(() => engineRef.current!.getState());
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Speed Timer
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Synchronize scores from stats
  useEffect(() => {
    setScores({
      X: stats.xWins,
      O: stats.oWins,
      draws: stats.draws,
    });
  }, [stats]);

  // Turn Timer effect
  useEffect(() => {
    if (settings.turnTimerSeconds <= 0 || gameState.status !== 'in_progress') {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(settings.turnTimerSeconds);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          playTick();
          if (engineRef.current) {
            const emptyIndices = gameState.board
              .map((v, i) => (v === null ? i : -1))
              .filter((i) => i !== -1);
            if (emptyIndices.length > 0) {
              const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
              const nextState = engineRef.current.makeMove(randomMove);
              setGameState(nextState);
            }
          }
          return settings.turnTimerSeconds;
        }
        if (prev <= 4) {
          playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.currentPlayer, gameState.status, gameState.board, settings.turnTimerSeconds, playTick]);

  // Handle Game Result (Win/Draw recording)
  const handleGameCompletion = useCallback(
    (nextState: typeof gameState) => {
      if (nextState.status === 'won' && nextState.winner) {
        triggerConfetti();
        playWin();

        const isHumanWinner =
          nextState.mode === 'pvp' || nextState.winner === settings.playerSymbol;

        setStats((prev) => {
          const newStreak = isHumanWinner ? prev.currentStreak + 1 : 0;
          const updated: GameStats = {
            ...prev,
            totalGames: prev.totalGames + 1,
            xWins: nextState.winner === 'X' ? prev.xWins + 1 : prev.xWins,
            oWins: nextState.winner === 'O' ? prev.oWins + 1 : prev.oWins,
            currentStreak: newStreak,
            bestStreak: Math.max(prev.bestStreak, newStreak),
            history: [
              ...prev.history,
              {
                id: Date.now().toString(),
                winner: nextState.winner!,
                date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                mode: nextState.mode,
                difficulty: nextState.difficulty,
                gridSize: nextState.gridSize,
                totalMoves: nextState.history.length,
              },
            ],
          };
          try {
            localStorage.setItem('ttt_stats', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      } else if (nextState.status === 'draw') {
        playDraw();
        setStats((prev) => {
          const updated: GameStats = {
            ...prev,
            totalGames: prev.totalGames + 1,
            draws: prev.draws + 1,
            currentStreak: 0,
            history: [
              ...prev.history,
              {
                id: Date.now().toString(),
                winner: 'draw',
                date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                mode: nextState.mode,
                difficulty: nextState.difficulty,
                gridSize: nextState.gridSize,
                totalMoves: nextState.history.length,
              },
            ],
          };
          try {
            localStorage.setItem('ttt_stats', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    },
    [settings.playerSymbol, playWin, playDraw, triggerConfetti]
  );

  // Human cell click handler
  const handleCellClick = (index: number) => {
    if (!engineRef.current) return;
    if (gameState.status !== 'in_progress') return;
    if (gameState.board[index] !== null) return;

    if (gameState.mode === 'ai' && gameState.currentPlayer !== settings.playerSymbol) {
      return;
    }

    playMove(gameState.currentPlayer);
    const nextState = engineRef.current.makeMove(index);
    setGameState(nextState);

    if (nextState.status !== 'in_progress') {
      handleGameCompletion(nextState);
    }
  };

  // AI Turn Execution effect
  useEffect(() => {
    if (
      engineRef.current &&
      gameState.mode === 'ai' &&
      gameState.status === 'in_progress' &&
      gameState.currentPlayer !== settings.playerSymbol
    ) {
      const timer = setTimeout(() => {
        if (!engineRef.current) return;
        const aiSymbol = settings.playerSymbol === 'X' ? 'O' : 'X';
        playMove(aiSymbol);
        const nextState = engineRef.current.makeAIMove();
        setGameState(nextState);

        if (nextState.status !== 'in_progress') {
          handleGameCompletion(nextState);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [gameState, settings.playerSymbol, playMove, handleGameCompletion]);

  // Controls Handlers
  const handleNewGame = () => {
    if (!engineRef.current) return;
    playClick();
    const nextState = engineRef.current.reset({
      playerSymbol: settings.playerSymbol,
    });
    setGameState(nextState);
  };

  const handleUndo = () => {
    if (!engineRef.current) return;
    playClick();
    const nextState = engineRef.current.undo();
    setGameState(nextState);
  };

  const handleModeChange = (mode: GameMode) => {
    if (!engineRef.current) return;
    playClick();
    const nextState = engineRef.current.reset({
      mode,
      playerSymbol: settings.playerSymbol,
    });
    setGameState(nextState);
  };

  const handleGridSizeChange = (gridSize: GridSize) => {
    if (!engineRef.current) return;
    playClick();
    const nextState = engineRef.current.reset({
      gridSize,
      mode: gameState.mode,
      playerSymbol: settings.playerSymbol,
    });
    setGameState(nextState);
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    if (!engineRef.current) return;
    playClick();
    const nextState = engineRef.current.reset({
      difficulty,
      playerSymbol: settings.playerSymbol,
    });
    setGameState(nextState);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isStatsOpen || isSettingsOpen) {
        if (e.key === 'Escape') {
          setIsStatsOpen(false);
          setIsSettingsOpen(false);
        }
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        handleNewGame();
      } else if (e.key === 'u' || e.key === 'U') {
        if (gameState.history.length > 0) {
          handleUndo();
        }
      } else if (e.key === 's' || e.key === 'S') {
        setIsStatsOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        updateSettings({ soundEnabled: !settings.soundEnabled });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStatsOpen, isSettingsOpen, gameState.history.length, settings.soundEnabled]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-zinc-100 flex flex-col transition-colors">
      <Header
        theme={theme}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        soundEnabled={settings.soundEnabled}
        onSoundToggle={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentStreak={stats.currentStreak}
      />

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-1 w-full">
        {/* Semantic H1 & Hero Description */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-heading mb-2 leading-tight">
            {pageTitle ?? 'Free Online Tic Tac Toe'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            {pageSubtitle ??
              'Challenge our unbeatable Minimax AI, play local 2-player matches, and explore 3x3, 4x4, and 5x5 boards.'}
          </p>

          {/* Quick Game Mode Discovery Ribbon */}
          <nav aria-label="Game Modes" className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all touch-manipulation border ${
                !activeSlug
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow-indigo'
                  : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              All Modes
            </Link>
            {GAME_MODES.map((m) => (
              <Link
                key={m.slug}
                href={`/play/${m.slug}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all touch-manipulation border ${
                  activeSlug === m.slug
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow-indigo'
                    : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {m.shortName}
              </Link>
            ))}
          </nav>
        </header>

        {/* Score Board */}
        <ScoreBoard
          currentPlayer={gameState.currentPlayer}
          status={gameState.status}
          winner={gameState.winner}
          mode={gameState.mode}
          difficulty={gameState.difficulty}
          playerSymbol={settings.playerSymbol}
          scores={scores}
          symbolTheme={settings.symbolTheme}
          timeLeft={timeLeft}
          totalTime={settings.turnTimerSeconds}
        />

        {/* Interactive Board */}
        <GameBoard
          board={gameState.board}
          gridSize={gameState.gridSize}
          onCellClick={handleCellClick}
          winLine={gameState.winLine}
          winner={gameState.winner}
          symbolTheme={settings.symbolTheme}
          disabled={
            gameState.status !== 'in_progress' ||
            (gameState.mode === 'ai' && gameState.currentPlayer !== settings.playerSymbol)
          }
          currentPlayer={gameState.currentPlayer}
        />

        {/* Controls */}
        <GameControls
          mode={gameState.mode}
          onModeChange={handleModeChange}
          gridSize={gameState.gridSize}
          onGridSizeChange={handleGridSizeChange}
          difficulty={gameState.difficulty}
          onDifficultyChange={handleDifficultyChange}
          onNewGame={handleNewGame}
          onUndo={handleUndo}
          canUndo={gameState.history.length > 0}
        />

        {/* Strategy Guide & FAQs for SEO */}
        <RulesSection />
      </main>

      <Footer />

      {/* Modals */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        onResetStats={resetStats}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />
    </div>
  );
};
