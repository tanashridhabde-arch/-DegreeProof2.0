import { useState, useEffect, useCallback } from 'react';
import { getXlmBalance, checkAccountExists, fundWithFriendbot } from '../../lib/stellar';
import { formatBalance } from '../../utils/validation';
import { toUserMessage } from '../../utils/errors';
import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  publicKey: string | null;
  isConnected: boolean;
}

export function BalanceCard({ publicKey, isConnected }: BalanceCardProps) {
  const [balance, setBalance] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFunding, setIsFunding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFunded, setIsFunded] = useState<boolean>(true); // Assume funded until checked

  const fetchBalance = useCallback(async () => {
    if (!isConnected || !publicKey) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const exists = await checkAccountExists(publicKey);
      setIsFunded(exists);
      
      if (exists) {
        const xlmBalance = await getXlmBalance(publicKey);
        setBalance(xlmBalance);
      } else {
        setBalance('0.00');
      }
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, isConnected]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleFund = async () => {
    if (!publicKey) return;
    
    setIsFunding(true);
    setError(null);
    
    try {
      await fundWithFriendbot(publicKey);
      // Wait a moment for the network to process, then refresh
      setTimeout(() => {
        fetchBalance();
      }, 2000);
    } catch (err) {
      setError(toUserMessage(err));
      setIsFunding(false);
    }
  };

  if (!isConnected) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Institution Balance</h3>
        <button 
          onClick={fetchBalance} 
          disabled={isLoading || isFunding}
          className={styles.refreshBtn}
          title="Refresh Balance"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-10.8l5.6 5.6"/>
          </svg>
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.balanceContainer}>
        {isLoading && !isFunding ? (
          <div className={styles.skeleton}></div>
        ) : (
          <div className={styles.amount}>
            <span className={styles.currency}>XLM</span>
            {formatBalance(balance)}
          </div>
        )}
      </div>

      {!isFunded && (
        <div className={styles.unfundedNotice}>
          <p>This account doesn't exist on the testnet yet.</p>
          <button 
            onClick={handleFund} 
            disabled={isFunding}
            className={styles.fundBtn}
          >
            {isFunding ? 'Funding from Friendbot...' : 'Fund with Friendbot'}
          </button>
        </div>
      )}
      
      {isFunded && balance === '0.00' && !isLoading && (
        <div className={styles.zeroBalanceNotice}>
          Your balance is zero. You need XLM to issue credentials.
        </div>
      )}
    </div>
  );
}
