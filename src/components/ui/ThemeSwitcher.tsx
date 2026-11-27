"use client";

import React from "react";
import { Moon, Sun, Contrast } from "lucide-react";
import { ACCENT_COLORS, Theme, useTheme } from "@/context/ThemeContext";

const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5" /> },
  { id: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5" /> },
  { id: "high-contrast", label: "Kontrast", icon: <Contrast className="w-3.5 h-3.5" /> },
];

export function ThemeSwitcher() {
  const { theme, setTheme, accent, setAccent } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Tema Rejimləri */}
      <div
        role="group"
        aria-label="Tema seçimi"
        className="inline-flex items-center bg-[var(--bg-highlight)] p-1 rounded-full border border-[var(--border-subtle)]"
      >
        {THEMES.map((item) => {
          const isActive = theme === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTheme(item.id)}
              style={{
                backgroundColor: isActive ? "var(--accent-primary)" : "transparent",
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
                isActive
                  ? "text-black shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Aksent Rəng Dairəcikləri */}
      <div
        role="group"
        aria-label="Aksent rəngi"
        className="inline-flex items-center gap-1.5 bg-[var(--bg-highlight)] px-2.5 py-1.5 rounded-full border border-[var(--border-subtle)]"
      >
        {ACCENT_COLORS.map((color) => {
          const isSelected = accent.name === color.name;
          return (
            <button
              key={color.name}
              onClick={() => setAccent(color)}
              title={color.name}
              aria-label={color.name}
              style={{ backgroundColor: color.primary }}
              className={`w-4 h-4 rounded-full transition-transform ${
                isSelected
                  ? "scale-125 ring-2 ring-white ring-offset-1 ring-offset-black"
                  : "opacity-75 hover:opacity-100 hover:scale-110"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}