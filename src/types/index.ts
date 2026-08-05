export interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  isFreighterInstalled: boolean;
}

export interface TransactionResult {
  hash: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  error?: string;
}

export interface AppError {
  code: ErrorCode;
  message: string;
  cause?: unknown;
}

export type ErrorCode = 
  | 'WALLET_NOT_FOUND'
  | 'WALLET_REJECTED'
  | 'INSUFFICIENT_BALANCE'
  | 'INVALID_ADDRESS'
  | 'NETWORK_ERROR'
  | 'ACCOUNT_NOT_FUNDED'
  | 'TRANSACTION_FAILED'
  | 'CONTRACT_ERROR'
  | 'UNKNOWN_ERROR';

export const ErrorCode = {
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND' as ErrorCode,
  WALLET_REJECTED: 'WALLET_REJECTED' as ErrorCode,
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE' as ErrorCode,
  INVALID_ADDRESS: 'INVALID_ADDRESS' as ErrorCode,
  NETWORK_ERROR: 'NETWORK_ERROR' as ErrorCode,
  ACCOUNT_NOT_FUNDED: 'ACCOUNT_NOT_FUNDED' as ErrorCode,
  TRANSACTION_FAILED: 'TRANSACTION_FAILED' as ErrorCode,
  CONTRACT_ERROR: 'CONTRACT_ERROR' as ErrorCode,
  UNKNOWN_ERROR: 'UNKNOWN_ERROR' as ErrorCode,
};
