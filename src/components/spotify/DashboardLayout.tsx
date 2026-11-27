import React from "react";
import styles from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  player: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardLayout({
  sidebar,
  player,
  children,
}: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebarArea}>{sidebar}</aside>
      <main className={styles.mainArea}>{children}</main>
      <div className={styles.playerArea}>{player}</div>
    </div>
  );
}