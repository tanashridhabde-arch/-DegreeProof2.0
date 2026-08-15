import { useState, useEffect, useCallback } from 'react';
import { isConnected as checkFreighter, requestAccess } from '@stellar/freighter-api';
import type { WalletState } from '../types';
import { ErrorCode } from '../types';
import { createAppError } from '../utils/errors';

const SESSION_KEY = 'degreeproof_wallet_pubkey';

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    publicKey: null,
    isConnected: false,
    isConnecting: true, // Start as true while we check session
    error: null,
    isFreighterInstalled: false,
  });

  // Check installation and restore session on mount
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { isConnected: installed } = await checkFreighter();
        
        if (!mounted) return;
        
        setState((prev: WalletState) => ({ ...prev, isFreighterInstalled: installed, isConnecting: false }));

        if (installed) {
          const storedKey = sessionStorage.getItem(SESSION_KEY);
          if (storedKey) {
            // Validate the key is still accessible
            try {
              const accessResult = await requestAccess();
              const currentKey = accessResult.address;
              if (currentKey && currentKey === storedKey) {
                setState((prev: WalletState) => ({
                  ...prev,
                  publicKey: currentKey,
                  isConnected: true,
                  error: null
                }));
              } else {
                sessionStorage.removeItem(SESSION_KEY);
              }
            } catch (e) {
              sessionStorage.removeItem(SESSION_KEY);
            }
          }
        }
      } catch (err) {
        if (mounted) {
          setState((prev: WalletState) => ({ ...prev, isConnecting: false }));
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const connect = useCallback(async () => {
    setState((prev: WalletState) => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      const accessResult = await requestAccess();
      
      if (accessResult.error) {
        throw createAppError(ErrorCode.WALLET_REJECTED, 'Connection was rejected by the user.', accessResult.error);
      }
      
      const publicKey = accessResult.address;
      
      if (!publicKey) {
        throw createAppError(ErrorCode.WALLET_NOT_FOUND, 'Could not retrieve public key from Freighter.');
      }

      sessionStorage.setItem(SESSION_KEY, publicKey);
      
      setState((prev: WalletState) => ({
        ...prev,
        publicKey,
        isConnected: true,
        isConnecting: false,
        error: null
      }));
      
    } catch (error: any) {
      const appError = error.code ? error : createAppError(
        ErrorCode.UNKNOWN_ERROR, 
        'An unexpected error occurred during wallet connection.', 
        error
      );
      
      setState((prev: WalletState) => ({
        ...prev,
        isConnecting: false,
        error: appError.message
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setState((prev: WalletState) => ({
      ...prev,
      publicKey: null,
      isConnected: false,
      error: null
    }));
  }, []);

  return {
    ...state,
    connect,
    disconnect
  };
}
