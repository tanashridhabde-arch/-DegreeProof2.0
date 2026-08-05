import { useState, useEffect } from 'react';
import styles from './Statistics.module.css';

interface StatisticsProps {
  isConnected: boolean;
}

export function Statistics({ isConnected }: StatisticsProps) {
  const [stats, setStats] = useState({
    totalCredentials: 0,
    activeCredentials: 0,
    revokedCredentials: 0,
    institutions: 0,
  });

  useEffect(() => {
    // Simulate fetching statistics
    // In a real app, this would query the blockchain
    if (isConnected) {
      setStats({
        totalCredentials: Math.floor(Math.random() * 1000) + 500,
        activeCredentials: Math.floor(Math.random() * 800) + 400,
        revokedCredentials: Math.floor(Math.random() * 200) + 50,
        institutions: Math.floor(Math.random() * 100) + 20,
      });
    }
  }, [isConnected]);

  if (!isConnected) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Network Statistics</h2>
      <div className={styles.grid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📜</div>
          <div className={styles.statValue}>{stats.totalCredentials.toLocaleString()}</div>
          <div className={styles.statLabel}>Total Credentials</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statValue}>{stats.activeCredentials.toLocaleString()}</div>
          <div className={styles.statLabel}>Active Credentials</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🚫</div>
          <div className={styles.statValue}>{stats.revokedCredentials.toLocaleString()}</div>
          <div className={styles.statLabel}>Revoked</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏛️</div>
          <div className={styles.statValue}>{stats.institutions.toLocaleString()}</div>
          <div className={styles.statLabel}>Institutions</div>
        </div>
      </div>
    </div>
  );
}
