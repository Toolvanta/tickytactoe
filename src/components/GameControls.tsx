import React from 'react';
import { RotateCcw, Undo2, Users, Bot, Grid3X3 } from 'lucide-react';
import { Difficulty, GameMode, GridSize } from '@/core';

interface GameControlsProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  gridSize: GridSize;
  onGridSizeChange: (size: GridSize) => void;
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  onNewGame: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  mode,
  onModeChange,
  gridSize,
  onGridSizeChange,
  difficulty,
  onDifficultyChange,
  onNewGame,
  onUndo,
  canUndo,
}) => {
  const difficulties: { key: Difficulty; label: string }[] = [
    { key: 'easy', label: 'Easy' },
    { key: 'medium', label: 'Medium' },
    { key: 'hard', label: 'Hard' },
    { key: 'unbeatable', label: 'Master' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto mt-4 sm:mt-6 space-y-3 sm:space-y-4">
      {/* Primary Action Buttons */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={onNewGame}
          aria-label="Start a new game round"
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-indigo active:scale-95 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>New Game</span>
        </button>

        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label={canUndo ? 'Undo last move' : 'Undo last move (disabled, no moves to undo)'}
          aria-disabled={!canUndo}
          className={`flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl text-sm font-semibold border transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            canUndo
              ? 'bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 cursor-pointer'
              : 'opacity-40 cursor-not-allowed bg-transparent border-slate-200/40 dark:border-slate-800/40 text-slate-400'
          }`}
          title="Undo last move"
        >
          <Undo2 className="w-4 h-4" aria-hidden="true" />
          <span>Undo</span>
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 space-y-3">
        {/* Mode & Grid Size Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
          {/* Mode Switcher */}
          <div
            role="group"
            aria-label="Game opponent mode"
            className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 text-xs font-semibold w-full sm:w-auto"
          >
            <button
              type="button"
              role="radio"
              aria-checked={mode === 'ai'}
              onClick={() => onModeChange('ai')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 min-h-[40px] rounded-lg transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                mode === 'ai'
                  ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
              <span>Vs AI</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={mode === 'pvp'}
              onClick={() => onModeChange('pvp')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 min-h-[40px] rounded-lg transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                mode === 'pvp'
                  ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>Local 2P</span>
            </button>
          </div>

          {/* Grid Size Switcher */}
          <div
            role="group"
            aria-label="Grid size selection"
            className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 text-xs font-semibold w-full sm:w-auto"
          >
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 flex items-center gap-1 hidden sm:flex">
              <Grid3X3 className="w-3.5 h-3.5" aria-hidden="true" />
              Size
            </span>
            {([3, 4, 5] as GridSize[]).map((size) => (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={gridSize === size}
                aria-label={`${size} by ${size} grid`}
                onClick={() => onGridSizeChange(size)}
                className={`flex-1 sm:flex-initial px-3.5 py-2.5 sm:py-2 min-h-[40px] rounded-lg transition-all touch-manipulation text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  gridSize === size
                    ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {size}x{size}
              </button>
            ))}
          </div>
        </div>

        {/* AI Difficulty Selector (When in AI mode) */}
        {mode === 'ai' && (
          <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
              AI Difficulty:
            </span>
            <div
              role="radiogroup"
              aria-label="AI Difficulty Level"
              className="grid grid-cols-4 sm:flex items-center gap-1"
            >
              {difficulties.map((diff) => (
                <button
                  key={diff.key}
                  type="button"
                  role="radio"
                  aria-checked={difficulty === diff.key}
                  onClick={() => onDifficultyChange(diff.key)}
                  className={`px-3 py-2 sm:py-1.5 min-h-[38px] rounded-lg text-xs font-semibold transition-all touch-manipulation text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    difficulty === diff.key
                      ? 'bg-indigo-600 text-white shadow-glow-indigo font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
