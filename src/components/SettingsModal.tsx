import React, { useEffect } from 'react';
import { X, Volume2, Clock, Sparkles, User, Sliders } from 'lucide-react';
import { Player } from '@/core';
import { SymbolTheme, WebSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: WebSettings;
  onUpdateSettings: (newSettings: Partial<WebSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" aria-hidden="true" />
            <h2 id="settings-dialog-title" className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Game Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings dialog"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Options */}
        <div className="py-3 sm:py-4 space-y-4 sm:space-y-5 overflow-y-auto flex-1 pr-1">
          {/* Turn Timer */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Clock className="w-4 h-4 text-indigo-500" aria-hidden="true" />
              <span>Turn Speed Timer</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Off', val: 0 },
                { label: '5s', val: 5 },
                { label: '10s', val: 10 },
                { label: '15s', val: 15 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => onUpdateSettings({ turnTimerSeconds: opt.val })}
                  className={`py-2.5 min-h-[44px] rounded-xl text-xs font-bold border transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    settings.turnTimerSeconds === opt.val
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow-indigo'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Player Symbol in AI Mode */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <User className="w-4 h-4 text-cyan-500" aria-hidden="true" />
              <span>Your Symbol (Vs AI)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['X', 'O'] as Player[]).map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => onUpdateSettings({ playerSymbol: sym })}
                  className={`py-2.5 min-h-[44px] rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    settings.playerSymbol === sym
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow-indigo'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span>Play as {sym}</span>
                  <span className="text-[10px] opacity-75">
                    {sym === 'X' ? '(Goes 1st)' : '(Goes 2nd)'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Symbol Theme */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Symbol Theme</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'classic', label: 'Classic', desc: 'X & O' },
                { key: 'cyber', label: 'Neon Glow', desc: 'Cyan & Rose' },
                { key: 'emoji', label: 'Emoji ⚔️', desc: 'Sword & Shield' },
              ].map((themeOpt) => (
                <button
                  key={themeOpt.key}
                  type="button"
                  onClick={() => onUpdateSettings({ symbolTheme: themeOpt.key as SymbolTheme })}
                  className={`p-2 min-h-[48px] rounded-xl text-center border transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    settings.symbolTheme === themeOpt.key
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-glow-indigo'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{themeOpt.label}</div>
                  <div className="text-[10px] opacity-70 truncate">{themeOpt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Volume Slider */}
          {settings.soundEnabled && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="volume-range-slider"
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span>Synthesized Audio Volume</span>
                </label>
                <span className="text-xs font-bold text-indigo-500">
                  {Math.round(settings.volume * 100)}%
                </span>
              </div>
              <input
                id="volume-range-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume}
                aria-label="Synthesized audio volume level"
                onChange={(e) => onUpdateSettings({ volume: parseFloat(e.target.value) })}
                className="w-full accent-indigo-600 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer h-2"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
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
