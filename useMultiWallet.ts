import { useState, useEffect, useCallback } from 'react';
import { isConnected as checkFreighter, requestAccess as freighterConnect } from '@stellar/freighter-api';
import type { WalletState } from '../types';
import { ErrorCode } from '../types';
import { createAppError } from '../utils/errors';

export type WalletType = 'freighter' | 'albedo' | 'xbull';

const SESSION_KEY = 'degreeproof_wallet_pubkey';
const WALLET_TYPE_KEY = 'degreeproof_wallet_type';

interface MultiWalletState extends WalletState {
  walletType: WalletType | null;
  availableWallets: WalletType[];
}

export function useMultiWallet() {
  const [state, setState] = useState<MultiWalletState>({
    publicKey: null,
    isConnected: false,
    isConnecting: true,
    error: null,
    isFreighterInstalled: false,
    walletType: null,
    availableWallets: [],
  });

  // Check available wallets on mount
  useEffect(() => {
    let mounted = true;

    async function init() {
      const available: WalletType[] = [];

      try {
        const freighterInstalled = await checkFreighter();
        if (freighterInstalled) {
          available.push('freighter');
        }

        // Check for Albedo (browser API)
        if (typeof window !== 'undefined' && (window as any).albedo) {
          available.push('albedo');
        }

        // Check for xBull (browser API)
        if (typeof window !== 'undefined' && (window as any).xBullSDK) {
          available.push('xbull');
        }

        if (!mounted) return;

        setState((prev) => ({
          ...prev,
          availableWallets: available,
          isFreighterInstalled: available.includes('freighter'),
          isConnecting: false,
        }));

        // Restore session
        const storedKey = sessionStorage.getItem(SESSION_KEY);
        const storedType = sessionStorage.getItem(WALLET_TYPE_KEY) as WalletType | null;

        if (storedKey && storedType && available.includes(storedType)) {
          setState((prev) => ({
            ...prev,
            publicKey: storedKey,
            isConnected: true,
            walletType: storedType,
            error: null,
          }));
        }
      } catch (err) {
        if (mounted) {
          setState((prev) => ({ ...prev, isConnecting: false }));
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const connect = useCallback(
    async (walletType: WalletType) => {
      setState((prev) => ({ ...prev, isConnecting: true, error: null }));

      try {
        let publicKey: string | null = null;

        switch (walletType) {
          case 'freighter':
            const accessResult = await freighterConnect();
            if (accessResult.error) {
              throw createAppError(
                ErrorCode.WALLET_REJECTED,
                'Connection was rejected by the user.',
                accessResult.error
              );
            }
            publicKey = accessResult.address;
            break;

          case 'albedo':
            if (!(window as any).albedo) {
              throw createAppError(
                ErrorCode.WALLET_NOT_FOUND,
                'Albedo wallet is not installed. Please install it from https://albedo.link'
              );
            }
            const albedoResult = await (window as any).albedo.publicKey({});
            publicKey = albedoResult.pubkey;
            break;

          case 'xbull':
            if (!(window as any).xBullSDK) {
              throw createAppError(
                ErrorCode.WALLET_NOT_FOUND,
                'xBull wallet is not installed. Please install it from https://xbull.app'
              );
            }
            const xBullResult = await (window as any).xBullSDK.connect();
            publicKey = xBullResult.publicKey;
            break;

          default:
            throw createAppError(ErrorCode.UNKNOWN_ERROR, 'Unsupported wallet type');
        }

        if (!publicKey) {
          throw createAppError(
            ErrorCode.WALLET_NOT_FOUND,
            'Could not retrieve public key from wallet.'
          );
        }

        sessionStorage.setItem(SESSION_KEY, publicKey);
        sessionStorage.setItem(WALLET_TYPE_KEY, walletType);

        setState((prev) => ({
          ...prev,
          publicKey,
          isConnected: true,
          isConnecting: false,
          walletType,
          error: null,
        }));
      } catch (error: any) {
        const appError = error.code
          ? error
          : createAppError(
              ErrorCode.UNKNOWN_ERROR,
              'An unexpected error occurred during wallet connection.',
              error
            );

        setState((prev) => ({
          ...prev,
          isConnecting: false,
          error: appError.message,
        }));
      }
    },
    []
  );

  const disconnect = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(WALLET_TYPE_KEY);
    setState((prev) => ({
      ...prev,
      publicKey: null,
      isConnected: false,
      walletType: null,
      error: null,
    }));
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}
