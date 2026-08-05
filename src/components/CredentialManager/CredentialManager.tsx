import { useState, useEffect } from 'react';
import { issueCredential, revokeCredential, getCredential, type Credential } from '../../lib/contracts';
import { eventStreamer, type ContractEvent } from '../../lib/events';
import { toUserMessage } from '../../utils/errors';
import { CREDENTIAL_CONTRACT_ID } from '../../config/stellar';
import styles from './CredentialManager.module.css';

interface CredentialManagerProps {
  publicKey: string | null;
  isConnected: boolean;
}

export function CredentialManager({ publicKey, isConnected }: CredentialManagerProps) {
  const [credentialId, setCredentialId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [degreeTitle, setDegreeTitle] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [status, setStatus] = useState<'idle' | 'issuing' | 'revoking' | 'fetching' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [credential, setCredential] = useState<Credential | null>(null);
  const [recentEvents, setRecentEvents] = useState<ContractEvent[]>([]);

  // Subscribe to contract events
  useEffect(() => {
    if (!isConnected || !CREDENTIAL_CONTRACT_ID) return;

    const unsubscribeIssued = eventStreamer.on('credential_issued', (event) => {
      setRecentEvents(prev => [event, ...prev].slice(0, 5));
    });

    const unsubscribeRevoked = eventStreamer.on('credential_revoked', (event) => {
      setRecentEvents(prev => [event, ...prev].slice(0, 5));
    });

    return () => {
      unsubscribeIssued();
      unsubscribeRevoked();
    };
  }, [isConnected]);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !publicKey) return;

    setError(null);
    setTxHash(null);
    setCredential(null);

    const year = parseInt(graduationYear);
    if (isNaN(year) || year < 1900 || year > 2100) {
      setError('Please enter a valid graduation year.');
      return;
    }

    try {
      setStatus('issuing');
      const { hash } = await issueCredential(publicKey, credentialId, studentName, degreeTitle, year);
      
      setStatus('success');
      setTxHash(hash);
      setCredentialId('');
      setStudentName('');
      setDegreeTitle('');
      setGraduationYear('');
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  const handleRevoke = async () => {
    if (!isConnected || !publicKey || !credentialId) return;

    setError(null);
    setTxHash(null);

    try {
      setStatus('revoking');
      const { hash } = await revokeCredential(publicKey, credentialId);
      
      setStatus('success');
      setTxHash(hash);
      setCredentialId('');
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  const handleFetch = async () => {
    if (!credentialId) return;

    setError(null);
    setCredential(null);

    try {
      setStatus('fetching');
      const cred = await getCredential(credentialId);
      
      if (cred) {
        setCredential(cred);
      } else {
        setError('Credential not found');
      }
      setStatus('idle');
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  if (!isConnected) return null;

  if (!CREDENTIAL_CONTRACT_ID) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Credential Management</h2>
        <div className={styles.warningAlert}>
          <p>⚠️ Contracts not deployed. Please deploy contracts first.</p>
          <p className={styles.hint}>Run: <code>npm run deploy:contracts</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Credential Management</h2>
      <p className={styles.description}>
        Issue and manage academic credentials on-chain.
      </p>

      {error && <div className={styles.errorAlert}>{error}</div>}
      
      {status === 'success' && txHash && (
        <div className={styles.successAlert}>
          <p>✓ Transaction successful!</p>
          <a 
            href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.hashLink}
          >
            View on Stellar Expert
          </a>
        </div>
      )}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Issue Credential</h3>
        <form onSubmit={handleIssue} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="credentialId" className={styles.label}>Credential ID</label>
            <input
              id="credentialId"
              type="text"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              placeholder="CRED-2024-001"
              disabled={status === 'issuing'}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="studentName" className={styles.label}>Student Name</label>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Alice Johnson"
              disabled={status === 'issuing'}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="degreeTitle" className={styles.label}>Degree Title</label>
            <input
              id="degreeTitle"
              type="text"
              value={degreeTitle}
              onChange={(e) => setDegreeTitle(e.target.value)}
              placeholder="BS Computer Science"
              disabled={status === 'issuing'}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="graduationYear" className={styles.label}>Graduation Year</label>
            <input
              id="graduationYear"
              type="number"
              min="1900"
              max="2100"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="2024"
              disabled={status === 'issuing'}
              className={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'issuing'}
            className={styles.submitBtn}
          >
            {status === 'issuing' ? 'Issuing...' : 'Issue Credential'}
          </button>
        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Verify / Revoke Credential</h3>
        <div className={styles.actionGroup}>
          <input
            type="text"
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
            placeholder="Enter Credential ID"
            disabled={status !== 'idle'}
            className={styles.input}
          />
          <div className={styles.buttonRow}>
            <button 
              onClick={handleFetch}
              disabled={!credentialId || status !== 'idle'}
              className={styles.secondaryBtn}
            >
              {status === 'fetching' ? 'Fetching...' : 'Fetch'}
            </button>
            <button 
              onClick={handleRevoke}
              disabled={!credentialId || status !== 'idle'}
              className={styles.dangerBtn}
            >
              {status === 'revoking' ? 'Revoking...' : 'Revoke'}
            </button>
          </div>
        </div>

        {credential && (
          <div className={styles.credentialCard}>
            <h4>Credential Details</h4>
            <dl className={styles.detailsList}>
              <dt>Student:</dt>
              <dd>{credential.studentName}</dd>
              
              <dt>Degree:</dt>
              <dd>{credential.degreeTitle}</dd>
              
              <dt>Year:</dt>
              <dd>{credential.graduationYear}</dd>
              
              <dt>Status:</dt>
              <dd className={credential.status === 'Issued' ? styles.statusIssued : styles.statusRevoked}>
                {credential.status}
              </dd>
            </dl>
          </div>
        )}
      </div>

      {recentEvents.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Recent Events</h3>
          <div className={styles.eventsList}>
            {recentEvents.map((event, idx) => (
              <div key={idx} className={styles.eventItem}>
                <span className={styles.eventType}>
                  {event.type === 'credential_issued' ? '✓ Issued' : '✗ Revoked'}
                </span>
                <span className={styles.eventId}>{event.credentialId}</span>
                <span className={styles.eventTime}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
