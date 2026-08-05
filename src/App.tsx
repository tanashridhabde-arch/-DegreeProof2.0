import React from 'react';
import { Layout } from './components/Layout/Layout';
import { BalanceCard } from './components/BalanceCard/BalanceCard';
import { SendPayment } from './components/SendPayment/SendPayment';
import { CredentialManager } from './components/CredentialManager/CredentialManager';
import { InstitutionRegistry } from './components/InstitutionRegistry/InstitutionRegistry';
import { Statistics } from './components/Statistics/Statistics';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SearchCredential } from './components/SearchCredential/SearchCredential';
import { useWallet } from './hooks/useWallet';
import styles from './App.module.css';

// Simple Error Boundary for Phase 1
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ef4444', backgroundColor: '#7f1d1d', borderRadius: '8px', margin: '2rem' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', marginTop: '16px', cursor: 'pointer' }}>Reload App</button>
        </div>
      );
    }
    return this.props.children;
  }
}

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { IssuerPortal } from './pages/IssuerPortal';
import { VerifierTool } from './pages/VerifierTool';
import { VerificationSearch } from './pages/VerificationSearch';
import { QrScannerInterface } from './pages/QrScannerInterface';
import { DegreeproofAcademicCredentialProtocol } from './pages/DegreeproofAcademicCredentialProtocol';

function LegacyDashboard() {
  const { publicKey, isConnected } = useWallet();

  return (
    <Layout>
      <div className={styles.dashboard}>
        {!isConnected ? (
          <div className={styles.welcomeState}>
            <h2>Welcome to DegreeProof (Legacy)</h2>
            <p>Please connect your Freighter wallet to manage academic credentials on the Stellar Testnet.</p>
          </div>
        ) : (
          <>
            <Statistics isConnected={isConnected} />
            <Dashboard publicKey={publicKey} isConnected={isConnected} />
            
            <div className={styles.grid}>
              <div className={styles.column}>
                <BalanceCard publicKey={publicKey} isConnected={isConnected} />
              </div>
              <div className={styles.column}>
                <SendPayment publicKey={publicKey} isConnected={isConnected} />
              </div>
            </div>
            
            <div className={styles.fullWidth}>
              <SearchCredential />
            </div>
            
            <div className={styles.fullWidth}>
              <CredentialManager publicKey={publicKey} isConnected={isConnected} />
            </div>
            
            <div className={styles.fullWidth}>
              <InstitutionRegistry publicKey={publicKey} isConnected={isConnected} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/issuer" element={<IssuerPortal />} />
          <Route path="/verifier" element={<VerifierTool />} />
          <Route path="/search" element={<VerificationSearch />} />
          <Route path="/scanner" element={<QrScannerInterface />} />
          <Route path="/protocol" element={<DegreeproofAcademicCredentialProtocol />} />
          
          <Route path="/legacy-dashboard" element={<LegacyDashboard />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
