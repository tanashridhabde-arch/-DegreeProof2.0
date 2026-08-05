import { useState } from 'react';
import { signTransaction } from '@stellar/freighter-api';
import { buildPaymentTx, submitTransaction } from '../../lib/stellar';
import { isValidStellarAddress } from '../../utils/validation';
import { toUserMessage, mapWalletError } from '../../utils/errors';
import { NETWORK_PASSPHRASE } from '../../config/stellar';
import styles from './SendPayment.module.css';

interface SendPaymentProps {
  publicKey: string | null;
  isConnected: boolean;
}

export function SendPayment({ publicKey, isConnected }: SendPaymentProps) {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'building' | 'signing' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !publicKey) return;

    setError(null);
    setTxHash(null);

    // Validate inputs
    if (!isValidStellarAddress(destination)) {
      setError('Invalid destination address.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    try {
      // 1. Build
      setStatus('building');
      const unsignedXdr = await buildPaymentTx(publicKey, destination, amount);

      // 2. Sign
      setStatus('signing');
      let signedXdr = '';
      try {
        const signResult = await signTransaction(unsignedXdr, {
          networkPassphrase: NETWORK_PASSPHRASE,
        });
        
        if (signResult.error) {
           throw new Error(signResult.error);
        }
        signedXdr = signResult as unknown as string;
        
        // Handle new freighter api return format
        if (typeof signResult === 'object' && 'signedTxXdr' in signResult) {
            signedXdr = (signResult as any).signedTxXdr;
        }

      } catch (signErr) {
        throw mapWalletError(signErr);
      }

      // 3. Submit
      setStatus('submitting');
      const { hash } = await submitTransaction(signedXdr);
      
      setStatus('success');
      setTxHash(hash);
      setDestination('');
      setAmount('');
      
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  if (!isConnected) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Send Verification Fee</h2>
      <p className={styles.description}>
        Transfer XLM to pay for external verification services.
      </p>

      {error && <div className={styles.errorAlert}>{error}</div>}
      
      {status === 'success' && txHash && (
        <div className={styles.successAlert}>
          <p>Payment successful!</p>
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

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="destination" className={styles.label}>Recipient Address</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="G..."
            disabled={status !== 'idle' && status !== 'success'}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>Amount (XLM)</label>
          <input
            id="amount"
            type="number"
            step="0.0000001"
            min="0.0000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            disabled={status !== 'idle' && status !== 'success'}
            className={styles.input}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={status !== 'idle' && status !== 'success'}
          className={styles.submitBtn}
        >
          {status === 'building' && 'Preparing Transaction...'}
          {status === 'signing' && 'Please Sign in Freighter...'}
          {status === 'submitting' && 'Submitting to Network...'}
          {(status === 'idle' || status === 'success') && 'Send Fee'}
        </button>
      </form>
    </div>
  );
}
