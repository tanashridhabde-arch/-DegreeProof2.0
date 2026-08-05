import React from 'react';
import { WalletButton } from '../WalletButton/WalletButton';
import styles from './Layout.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <h1>DegreeProof</h1>
        </div>
        <div className={styles.headerActions}>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>DegreeProof — On-chain Academic Credentials</p>
        <p className={styles.networkInfo}>Connected to Stellar Testnet</p>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
