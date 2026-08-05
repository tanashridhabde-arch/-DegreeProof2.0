import { useState } from 'react';
import { getCredential, type Credential } from '../../lib/contracts';
import { toUserMessage } from '../../utils/errors';
import styles from './SearchCredential.module.css';

export function SearchCredential() {
  const [searchId, setSearchId] = useState('');
  const [credential, setCredential] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError(null);
    setCredential(null);
    setSearched(false);

    try {
      const result = await getCredential(searchId);
      setCredential(result);
      setSearched(true);
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🔍 Search & Verify Credentials</h2>
      <p className={styles.description}>
        Enter a credential ID to verify its authenticity and view details.
      </p>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Credential ID (e.g., CRED-2024-001)"
            className={styles.searchInput}
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !searchId.trim()}
            className={styles.searchBtn}
          >
            {loading ? (
              <span className={styles.loader}>Searching...</span>
            ) : (
              <>
                <span className={styles.searchIcon}>🔍</span>
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className={styles.errorAlert}>
          <span className={styles.alertIcon}>⚠️</span>
          {error}
        </div>
      )}

      {searched && !credential && !error && (
        <div className={styles.notFoundAlert}>
          <span className={styles.alertIcon}>🔍</span>
          <div>
            <strong>Credential Not Found</strong>
            <p>No credential exists with ID: {searchId}</p>
          </div>
        </div>
      )}

      {credential && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <h3>Credential Details</h3>
            <span className={
              credential.status === 'Issued' 
                ? styles.statusBadgeActive 
                : styles.statusBadgeRevoked
            }>
              {credential.status === 'Issued' ? '✓ Valid' : '✗ Revoked'}
            </span>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Student Name</span>
              <span className={styles.detailValue}>{credential.studentName}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Degree Title</span>
              <span className={styles.detailValue}>{credential.degreeTitle}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Graduation Year</span>
              <span className={styles.detailValue}>{credential.graduationYear}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Issuing Institution</span>
              <span className={styles.detailValue}>
                {credential.institution.substring(0, 10)}...{credential.institution.slice(-10)}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Credential ID</span>
              <span className={styles.detailValue}>{searchId}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Status</span>
              <span className={
                credential.status === 'Issued' 
                  ? styles.detailValueSuccess 
                  : styles.detailValueError
              }>
                {credential.status}
              </span>
            </div>
          </div>

          {credential.status === 'Issued' && (
            <div className={styles.verificationBanner}>
              <span className={styles.verifyIcon}>✅</span>
              <div>
                <strong>Credential Verified</strong>
                <p>This credential is authentic and currently valid on the Stellar blockchain.</p>
              </div>
            </div>
          )}

          {credential.status === 'Revoked' && (
            <div className={styles.revokedBanner}>
              <span className={styles.verifyIcon}>⚠️</span>
              <div>
                <strong>Credential Revoked</strong>
                <p>This credential has been revoked by the issuing institution and is no longer valid.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
