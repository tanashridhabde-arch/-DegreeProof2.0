import { Horizon, TransactionBuilder, Operation, Asset } from '@stellar/stellar-sdk';
import { HORIZON_URL, NETWORK_PASSPHRASE } from '../config/stellar';
import { createAppError, mapHorizonError } from '../utils/errors';
import { ErrorCode } from '../types';

// Initialize Horizon server
export const server = new Horizon.Server(HORIZON_URL);

/**
 * Fetch the XLM balance for a given public key
 */
export async function getXlmBalance(publicKey: string): Promise<string> {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b) => b.asset_type === 'native');
    return nativeBalance ? nativeBalance.balance : '0.00';
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Account not found / not funded
      return '0.00';
    }
    throw mapHorizonError(error);
  }
}

/**
 * Check if an account exists on the network
 */
export async function checkAccountExists(publicKey: string): Promise<boolean> {
  try {
    await server.loadAccount(publicKey);
    return true;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false;
    }
    throw mapHorizonError(error);
  }
}

/**
 * Fund an account on Testnet using Friendbot
 */
export async function fundWithFriendbot(publicKey: string): Promise<boolean> {
  try {
    const response = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
    if (!response.ok) {
      throw new Error(`Friendbot failed with status: ${response.status}`);
    }
    await response.json();
    return true;
  } catch (error) {
    throw createAppError(
      ErrorCode.NETWORK_ERROR,
      'Failed to fund account using Friendbot. Please try again later.',
      error
    );
  }
}

/**
 * Build a simple native XLM payment transaction
 */
export async function buildPaymentTx(
  sourcePublicKey: string,
  destinationPublicKey: string,
  amount: string
): Promise<string> {
  try {
    const account = await server.loadAccount(sourcePublicKey);
    
    const transaction = new TransactionBuilder(account, {
      fee: '1000', // Base fee
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset: Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(30)
      .build();

    return transaction.toXDR();
  } catch (error) {
    throw mapHorizonError(error);
  }
}

/**
 * Submit a signed transaction to the Horizon network
 */
export async function submitTransaction(signedXdr: string): Promise<{ hash: string }> {
  try {
    const transaction = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
    // Cast to any to handle type mismatch in sdk versions
    const response = await server.submitTransaction(transaction as any);
    return { hash: response.hash };
  } catch (error) {
    throw mapHorizonError(error);
  }
}
