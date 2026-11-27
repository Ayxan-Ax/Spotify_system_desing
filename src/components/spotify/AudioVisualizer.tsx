import React from "react";
import styles from "./AudioVisualizer.module.css";

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  return (
    <div
      className={`${styles.visualizer} ${isPlaying ? styles.playing : ""}`}
      aria-label={isPlaying ? "Playing" : "press to play"}
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </div>
  );
}