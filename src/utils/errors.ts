import type { AppError } from '../types';
import { ErrorCode } from '../types';

export function mapHorizonError(error: any): AppError {
  if (error.response?.status === 404) {
    return {
      code: ErrorCode.ACCOUNT_NOT_FUNDED,
      message: 'Account not found on the network. It needs to be funded first.',
      cause: error,
    };
  }
  
  const resultCode = error.response?.data?.extras?.result_codes?.transaction;
  if (resultCode === 'tx_insufficient_balance' || resultCode === 'op_underfunded') {
    return {
      code: ErrorCode.INSUFFICIENT_BALANCE,
      message: 'Insufficient balance to complete the transaction.',
      cause: error,
    };
  }

  return {
    code: ErrorCode.NETWORK_ERROR,
    message: 'A network error occurred while communicating with Stellar.',
    cause: error,
  };
}

export function mapWalletError(error: any): AppError {
  const msg = typeof error === 'string' ? error : (error as Error).message || '';
  
  if (msg.toLowerCase().includes('reject') || msg.toLowerCase().includes('cancel')) {
    return {
      code: ErrorCode.WALLET_REJECTED,
      message: 'Transaction signature was rejected in the wallet.',
      cause: error,
    };
  }

  return {
    code: ErrorCode.UNKNOWN_ERROR,
    message: 'An unknown wallet error occurred.',
    cause: error,
  };
}

export function toUserMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    const appError = error as AppError;
    return appError.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
}

export function createAppError(code: ErrorCode, message: string, cause?: unknown): AppError {
  return { code, message, cause };
}
