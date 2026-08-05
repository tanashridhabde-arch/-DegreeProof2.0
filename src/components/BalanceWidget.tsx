import React, { useState, useEffect } from 'react';
import { getXlmBalance } from '../lib/stellar';
import { formatBalance } from '../utils/validation';

interface BalanceWidgetProps {
  publicKey: string | null;
  isConnected: boolean;
}

export function BalanceWidget({ publicKey, isConnected }: BalanceWidgetProps) {
  const [balance, setBalance] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    async function fetchBalance() {
      if (!isConnected || !publicKey) {
        if (mounted) setBalance('0.00');
        return;
      }
      
      setIsLoading(true);
      try {
        const bal = await getXlmBalance(publicKey);
        if (mounted) {
          setBalance(formatBalance(bal));
        }
      } catch (err) {
        console.error("Failed to fetch balance", err);
        if (mounted) setBalance('0.00');
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchBalance();
    
    // Optional: set up polling for balance every 15s
    const interval = setInterval(fetchBalance, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [publicKey, isConnected]);

  if (!isConnected) return null;

  return (
    <div className="flex items-center gap-xs px-sm py-1 bg-surface-container-high rounded-lg border border-outline-variant shadow-sm" title="Your XLM Testnet Balance">
      <span className="material-symbols-outlined text-secondary text-sm">account_balance_wallet</span>
      {isLoading ? (
        <span className="w-8 h-4 bg-surface-variant animate-pulse rounded"></span>
      ) : (
        <span className="font-label-md text-primary font-bold">{balance} XLM</span>
      )}
    </div>
  );
}
