import React, { useEffect } from 'react';
import { X, Trophy, Flame, Award, Trash2 } from 'lucide-react';
import { GameStats } from '@/core';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const winRate =
    stats.totalGames > 0
      ? Math.round(((stats.xWins + stats.oWins) / (stats.totalGames * 2)) * 100)
      : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stats-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-500" aria-hidden="true" />
            <h2 id="stats-dialog-title" className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Game Statistics
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close statistics dialog"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-3 sm:py-4 space-y-4 sm:space-y-6 pr-1">
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 text-center">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Matches
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {stats.totalGames}
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 text-center">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Win Rate
              </span>
              <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {winRate}%
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 text-center">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Streak
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 inline" aria-hidden="true" />
                {stats.currentStreak}
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 text-center">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Best Streak
              </span>
              <span className="text-xl sm:text-2xl font-black text-cyan-500 flex items-center justify-center gap-1">
                <Award className="w-4 h-4 inline" aria-hidden="true" />
                {stats.bestStreak}
              </span>
            </div>
          </div>

          {/* Breakdown: X Wins, O Wins, Draws */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
              Outcome Breakdown
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-xs font-bold text-cyan-500 block">X Victories</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {stats.xWins}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-rose-500 block">O Victories</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {stats.oWins}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-amber-500 block">Draws</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {stats.draws}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Match History */}
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
              Recent Matches
            </span>
            {stats.history.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4 italic">
                No recorded match history yet. Play a round!
              </p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {stats.history
                  .slice(-8)
                  .reverse()
                  .map((item) => (
                    <div
                      key={item.id}
                      className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.winner === 'draw'
                              ? 'bg-amber-400'
                              : item.winner === 'X'
                              ? 'bg-cyan-400'
                              : 'bg-rose-400'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {item.winner === 'draw' ? 'Draw Match' : `Winner: ${item.winner}`}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase">
                          ({item.gridSize}x{item.gridSize} • {item.mode})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetStats}
            aria-label="Reset all game statistics"
            className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-bold transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Statistics</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-glow-indigo transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
