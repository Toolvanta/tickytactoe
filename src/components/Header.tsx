import React from 'react';
import Link from 'next/link';
import { Moon, Sun, Volume2, VolumeX, BarChart3, Settings, Sparkles } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  isDark: boolean;
  onThemeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  currentStreak?: number;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onThemeToggle,
  soundEnabled,
  onSoundToggle,
  onOpenStats,
  onOpenSettings,
  currentStreak = 0,
}) => {
  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1"
          aria-label="tickytoe homepage — Play Free Online Tic Tac Toe"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[2px] shadow-glow-indigo flex-shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" aria-hidden="true">
                <path d="M4 4L10 10M10 4L4 10" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="17" cy="17" r="3.5" stroke="#f43f5e" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-cyan-200 font-heading">
                tickytoe
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                PRO
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Unbeatable AI & Local 2-Player
            </p>
          </div>
        </Link>

        {/* Quick Toolbar */}
        <nav aria-label="Game controls and preferences" className="flex items-center gap-1 sm:gap-2">
          {/* Win Streak Pill */}
          {currentStreak > 0 && (
            <button
              onClick={onOpenStats}
              aria-label={`Current winning streak: ${currentStreak} games. View statistics.`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              title="Current Winning Streak"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentStreak} Streak</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onSoundToggle}
            aria-label={soundEnabled ? 'Mute synthesized sound effects' : 'Enable synthesized sound effects'}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-500" aria-hidden="true" />
            ) : (
              <VolumeX className="w-5 h-5 opacity-60" aria-hidden="true" />
            )}
          </button>

          {/* Stats Button */}
          <button
            onClick={onOpenStats}
            aria-label="Open Game Statistics and Win Tallies"
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Statistics"
          >
            <BarChart3 className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            aria-label="Open Game Settings, Theme and Timer Options"
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Settings"
          >
            <Settings className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            aria-label={isDark ? 'Switch to light color theme' : 'Switch to dark color theme'}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all touch-manipulation active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
