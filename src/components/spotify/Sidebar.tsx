"use client";

import React from "react";
import { Home, Library, Plus, Disc3 } from "lucide-react";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  selectedArtist: string | null;
  onSelectArtist: (artist: string | null) => void;
  onOpenAddModal: () => void;
}

const FEATURED_ARTISTS = [
  "Metallica",
  "Rammstein",
  "King Crimson",
  "Pink Floyd",
  "Guns N' Roses",
  "Megadeth",
  "Eyyub Yaqubov",
  "System Of A Down",
  "Linkin Park",
  "TOOL",
];

export function Sidebar({
  selectedArtist,
  onSelectArtist,
  onOpenAddModal,
}: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      {/* Üst Naviqasiya */}
      <nav className={styles.box} aria-label="Əsas menyu">
        <div className="flex items-center gap-2 px-3 pb-4 text-spotify-accent font-bold text-lg">
          <Disc3 className="w-6 h-6" />
          <span>Spotify DS</span>
        </div>

        <button
          onClick={() => onSelectArtist(null)}
          className={`${styles.navItem} ${
            selectedArtist === null ? styles.navItemActive : ""
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Ana Səhifə</span>
        </button>

        <button onClick={onOpenAddModal} className={styles.navItem}>
          <Plus className="w-5 h-5" />
          <span>Yeni Mahnı Əlavə Et</span>
        </button>
      </nav>

      {/* Kitabxana / Sənətçi Filtri */}
      <div className={`${styles.box} ${styles.libraryBox}`}>
        <div className="flex items-center gap-2 px-2 text-content-secondary font-semibold text-sm">
          <Library className="w-5 h-5" />
          <span>Sənətçilər</span>
        </div>

        <div className={styles.artistList}>
          {FEATURED_ARTISTS.map((artist) => {
            const isActive = selectedArtist === artist;
            return (
              <button
                key={artist}
                onClick={() => onSelectArtist(isActive ? null : artist)}
                className={`${styles.navItem} ${
                  isActive ? styles.navItemActive : ""
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-spotify-highlight flex items-center justify-center text-xs text-spotify-accent font-bold shrink-0">
                  {artist[0]}
                </span>
                <span className="truncate">{artist}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}