'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { PrivacyPolicy } from '@/components/PrivacyPolicy';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';

export const PrivacyClient: React.FC = () => {
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
      <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12 flex-1 w-full">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
};
