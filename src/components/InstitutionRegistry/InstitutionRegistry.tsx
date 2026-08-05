import { useState } from 'react';
import { registerInstitution, isInstitutionVerified } from '../../lib/contracts';
import { toUserMessage } from '../../utils/errors';
import { isValidStellarAddress } from '../../utils/validation';
import { REGISTRY_CONTRACT_ID, CREDENTIAL_CONTRACT_ID } from '../../config/stellar';
import styles from './InstitutionRegistry.module.css';

interface InstitutionRegistryProps {
  publicKey: string | null;
  isConnected: boolean;
}

export function InstitutionRegistry({ publicKey, isConnected }: InstitutionRegistryProps) {
  const [institutionAddr, setInstitutionAddr] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState<'idle' | 'registering' | 'checking' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !publicKey) return;

    setError(null);
    setTxHash(null);

    if (!isValidStellarAddress(institutionAddr)) {
      setError('Invalid institution address.');
      return;
    }

    try {
      setStatus('registering');
      const { hash } = await registerInstitution(
        publicKey,
        institutionAddr,
        institutionName,
        country,
        CREDENTIAL_CONTRACT_ID || institutionAddr
      );
      
      setStatus('success');
      setTxHash(hash);
      setInstitutionAddr('');
      setInstitutionName('');
      setCountry('');
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  const handleCheckVerification = async () => {
    if (!institutionAddr) return;

    setError(null);
    setIsVerified(null);

    try {
      setStatus('checking');
      const verified = await isInstitutionVerified(institutionAddr);
      setIsVerified(verified);
      setStatus('idle');
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  if (!isConnected) return null;

  if (!REGISTRY_CONTRACT_ID) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Institution Registry</h2>
        <div className={styles.warningAlert}>
          <p>⚠️ Registry contract not deployed. Please deploy contracts first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Institution Registry</h2>
      <p className={styles.description}>
        Register academic institutions on the blockchain registry.
      </p>

      {error && <div className={styles.errorAlert}>{error}</div>}
      
      {status === 'success' && txHash && (
        <div className={styles.successAlert}>
          <p>✓ Institution registered successfully!</p>
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
        <h3 className={styles.sectionTitle}>Register New Institution</h3>
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="institutionAddr" className={styles.label}>Institution Address</label>
            <input
              id="institutionAddr"
              type="text"
              value={institutionAddr}
              onChange={(e) => setInstitutionAddr(e.target.value)}
              placeholder="G..."
              disabled={status === 'registering'}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="institutionName" className={styles.label}>Institution Name</label>
            <input
              id="institutionName"
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder="Massachusetts Institute of Technology"
              disabled={status === 'registering'}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country" className={styles.label}>Country</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="USA"
              disabled={status === 'registering'}
              className={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'registering'}
            className={styles.submitBtn}
          >
            {status === 'registering' ? 'Registering...' : 'Register Institution'}
          </button>
        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Check Verification Status</h3>
        <div className={styles.actionGroup}>
          <input
            type="text"
            value={institutionAddr}
            onChange={(e) => setInstitutionAddr(e.target.value)}
            placeholder="Enter Institution Address"
            disabled={status === 'checking'}
            className={styles.input}
          />
          <button 
            onClick={handleCheckVerification}
            disabled={!institutionAddr || status === 'checking'}
            className={styles.secondaryBtn}
          >
            {status === 'checking' ? 'Checking...' : 'Check Status'}
          </button>
        </div>

        {isVerified !== null && (
          <div className={isVerified ? styles.successAlert : styles.warningAlert}>
            <p>
              {isVerified 
                ? '✓ Institution is verified' 
                : '⚠️ Institution is not verified'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
