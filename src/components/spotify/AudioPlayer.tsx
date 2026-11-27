"use client";

import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Track } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { AudioVisualizer } from "./AudioVisualizer";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function parseDuration(duration: string): number {
  const [min, sec] = duration.split(":").map(Number);
  return (min || 0) * 60 + (sec || 0);
}

function formatSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function AudioPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: AudioPlayerProps) {
  const [progress, setProgress] = useState<{ trackId?: string; seconds: number }>({
    trackId: currentTrack?.id,
    seconds: 0,
  });
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const elapsed = progress.trackId === currentTrack?.id ? progress.seconds : 0;
  const totalDuration = currentTrack ? parseDuration(currentTrack.duration) : 0;

  // Mahnı oxunarkən hər saniyə vaxtı artır
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const current = prev.trackId === currentTrack.id ? prev.seconds : 0;
        return { trackId: currentTrack.id, seconds: current + 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentTrack]);

  // Mahnı bitdikdə avtomatik növbəti mahnıya keç
  useEffect(() => {
    if (isPlaying && totalDuration > 0 && elapsed >= totalDuration) {
      onNext();
    }
  }, [elapsed, totalDuration, isPlaying, onNext]);

  if (!currentTrack) {
    return (
      <footer className={styles.player}>
        <p className="text-sm text-content-secondary">
          Dinləmək üçün siyahıdan hər hansı bir mahnı seçin
        </p>
      </footer>
    );
  }

  return (
    <footer className={styles.player}>
      {/* Sol: Aktiv Mahnı və Ekvalayzer */}
      <div className={styles.trackInfo}>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentTrack.coverGradient} flex items-center justify-center font-bold text-white text-sm shrink-0`}
        >
          {currentTrack.title.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-content-primary truncate">
              {currentTrack.title}
            </p>
            <AudioVisualizer isPlaying={isPlaying} />
          </div>
          <p className="text-xs text-content-secondary truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className={styles.controlsCenter}>
        <div className={styles.buttonsRow}>
          <button
            onClick={onPrev}
            aria-label="Əvvəlki mahnı"
            className="text-content-secondary hover:text-content-primary transition"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <Button
            variant="icon"
            size="sm"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Dayandır" : "Oynat"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </Button>

          <button
            onClick={onNext}
            aria-label="Növbəti mahnı"
            className="text-content-secondary hover:text-content-primary transition"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className={styles.progressRow}>
          <span>{formatSeconds(elapsed)}</span>
          <input
            type="range"
            min={0}
            max={totalDuration || 100}
            value={elapsed}
            onChange={(e) =>
              setProgress({
                trackId: currentTrack.id,
                seconds: Number(e.target.value),
              })
            }
            aria-label="Mahnı irəliləyişi"
            className={styles.rangeInput}
          />
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Sağ: Səs Səviyyəsi */}
      <div className={styles.volumeBox}>
        <button
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Səsi aç" : "Səsi bağla"}
          className="text-content-secondary hover:text-content-primary transition"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setIsMuted(false);
          }}
          aria-label="Səs səviyyəsi"
          className={`${styles.rangeInput} max-w-[100px]`}
        />
      </div>
    </footer>
  );
}