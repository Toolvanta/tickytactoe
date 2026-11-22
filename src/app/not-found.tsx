'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { NotFound } from '@/components/NotFound';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';

export default function NotFoundPage() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-zinc-100 flex flex-col transition-colors">
      <Header
        theme={theme}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        soundEnabled={false}
        onSoundToggle={() => {}}
        onOpenStats={() => {}}
        onOpenSettings={() => {}}
        currentStreak={0}
      />
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-12 flex-1 w-full flex items-center justify-center">
        <NotFound />
      </main>
      <Footer />
    </div>
  );
}
