"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "high-contrast";

export interface AccentOption {
  name: string;
  primary: string;
  hover: string;
}

export const ACCENT_COLORS: AccentOption[] = [
  { name: "Spotify Green", primary: "#1db954", hover: "#1ed760" },
  { name: "Electric Violet", primary: "#8b5cf6", hover: "#a78bfa" },
  { name: "Crimson Metal", primary: "#ef4444", hover: "#f87171" },
  { name: "Amber Gold", primary: "#f59e0b", hover: "#fbbf24" },
  { name: "Cyber Cyan", primary: "#06b6d4", hover: "#22d3ee" },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accent: AccentOption;
  setAccent: (accent: AccentOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<AccentOption>(ACCENT_COLORS[0]);

  // İlk açılışda yaddaşdakı seçimi oxu
  useEffect(() => {
    const savedTheme = localStorage.getItem("spotify-ds-theme") as Theme | null;
    const savedAccentName = localStorage.getItem("spotify-ds-accent");

    queueMicrotask(() => {
      if (savedTheme && ["dark", "light", "high-contrast"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
      if (savedAccentName) {
        const found = ACCENT_COLORS.find((c) => c.name === savedAccentName);
        if (found) setAccent(found);
      }
    });
  }, []);

  // Tema dəyişəndə <html> atributunu və localStorage-i yenilə
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("spotify-ds-theme", theme);
  }, [theme]);

  // Aksent rəngi dəyişəndə CSS dəyişənlərini birbaşa yenilə
  useEffect(() => {
    document.documentElement.style.setProperty("--accent-primary", accent.primary);
    document.documentElement.style.setProperty("--accent-hover", accent.hover);
    localStorage.setItem("spotify-ds-accent", accent.name);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme yalnız ThemeProvider daxilində istifadə oluna bilər.");
  }
  return context;
}