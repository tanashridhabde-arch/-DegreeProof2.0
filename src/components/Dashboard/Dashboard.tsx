import { useState, useEffect } from 'react';
import { CREDENTIAL_CONTRACT_ID } from '../../config/stellar';
import styles from './Dashboard.module.css';

interface DashboardProps {
  publicKey: string | null;
  isConnected: boolean;
}

interface Stats {
  totalIssued: number;
  totalRevoked: number;
  activeCredentials: number;
}

export function Dashboard({ isConnected }: DashboardProps) {
  const [stats, setStats] = useState<Stats>({
    totalIssued: 0,
    totalRevoked: 0,
    activeCredentials: 0,
  });

  useEffect(() => {
    if (isConnected && CREDENTIAL_CONTRACT_ID) {
      setStats({
        totalIssued: 42,
        totalRevoked: 5,
        activeCredentials: 37,
      });
    }
  }, [isConnected]);

  if (!isConnected) return null;

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Dashboard Overview</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📜</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalIssued}</div>
            <div className={styles.statLabel}>Total Issued</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.activeCredentials}</div>
            <div className={styles.statLabel}>Active</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>❌</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalRevoked}</div>
            <div className={styles.statLabel}>Revoked</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏛️</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{isConnected ? '1' : '0'}</div>
            <div className={styles.statLabel}>Institutions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
