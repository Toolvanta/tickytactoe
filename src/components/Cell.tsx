import React from 'react';
import { CellState, Player } from '@/core';
import { SymbolTheme } from '../types';

interface CellProps {
  value: CellState;
  index: number;
  onClick: () => void;
  isWinningCell: boolean;
  winner: Player | null;
  symbolTheme: SymbolTheme;
  disabled: boolean;
  hoverSymbol: Player | null;
  gridSize?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const Cell: React.FC<CellProps> = ({
  value,
  index,
  onClick,
  isWinningCell,
  symbolTheme,
  disabled,
  hoverSymbol,
  gridSize = 3,
  onKeyDown,
}) => {
  const getEmojiSize = () => {
    if (gridSize === 5) return 'text-xl sm:text-3xl';
    if (gridSize === 4) return 'text-2xl sm:text-3xl';
    return 'text-3xl sm:text-4xl';
  };

  const getRounding = () => {
    if (gridSize === 5) return 'rounded-xl sm:rounded-2xl';
    if (gridSize === 4) return 'rounded-xl sm:rounded-2xl';
    return 'rounded-2xl';
  };

  const renderContent = (val: Player, isGhost: boolean = false) => {
    if (symbolTheme === 'emoji') {
      return (
        <span
          className={`${getEmojiSize()} select-none transition-opacity ${
            isGhost ? 'opacity-25' : 'opacity-100 animate-pop-in'
          }`}
          aria-hidden="true"
        >
          {val === 'X' ? '⚔️' : '🛡️'}
        </span>
      );
    }

    if (val === 'X') {
      return (
        <svg
          viewBox="0 0 100 100"
          className={`w-3/5 h-3/5 transition-all ${
            isGhost ? 'opacity-20' : 'opacity-100 animate-pop-in'
          }`}
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="22"
            y1="22"
            x2="78"
            y2="78"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          />
          <line
            x1="78"
            y1="22"
            x2="22"
            y2="78"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          />
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-3/5 h-3/5 transition-all ${
          isGhost ? 'opacity-20' : 'opacity-100 animate-pop-in'
        }`}
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="currentColor"
          strokeWidth="13"
          className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
        />
      </svg>
    );
  };

  const row = Math.floor(index / gridSize) + 1;
  const col = (index % gridSize) + 1;
  const accessibleLabel = value
    ? `Row ${row}, Column ${col}, marked by ${value}${isWinningCell ? ', winning square' : ''}`
    : `Row ${row}, Column ${col}, empty square`;

  return (
    <button
      id={`cell-${index}`}
      type="button"
      role="gridcell"
      onClick={onClick}
      disabled={disabled || value !== null}
      tabIndex={0}
      aria-label={accessibleLabel}
      aria-disabled={disabled || value !== null}
      onKeyDown={(e) => {
        if (onKeyDown) onKeyDown(e);
        if ((e.key === 'Enter' || e.key === ' ') && !disabled && value === null) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative aspect-square min-h-[44px] min-w-[44px] flex items-center justify-center ${getRounding()} transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 touch-manipulation select-none ${
        isWinningCell
          ? 'bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border-2 border-cyan-400 shadow-glow-cyan scale-[1.03] z-10 animate-pulse'
          : 'bg-white/70 dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      } ${!disabled && value === null ? 'cursor-pointer hover:scale-[0.98] active:scale-95' : ''}`}
    >
      {value ? (
        renderContent(value)
      ) : hoverSymbol && !disabled ? (
        <div className="hidden group-hover:flex w-full h-full items-center justify-center">
          {renderContent(hoverSymbol, true)}
        </div>
      ) : null}
    </button>
  );
};
