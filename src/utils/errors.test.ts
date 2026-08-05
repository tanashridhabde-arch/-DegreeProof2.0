import { describe, it, expect } from 'vitest';
import { createAppError, toUserMessage } from './errors';
import { ErrorCode } from '../types';

describe('errors utils', () => {
  describe('createAppError', () => {
    it('creates an AppError correctly', () => {
      const error = createAppError(ErrorCode.WALLET_NOT_FOUND, 'Wallet missing');
      expect(error.code).toBe(ErrorCode.WALLET_NOT_FOUND);
      expect(error.message).toBe('Wallet missing');
    });
  });

  describe('toUserMessage', () => {
    it('extracts message from AppError', () => {
      const error = createAppError(ErrorCode.NETWORK_ERROR, 'Network down');
      expect(toUserMessage(error)).toBe('Network down');
    });

    it('extracts message from standard Error', () => {
      const error = new Error('Standard error');
      expect(toUserMessage(error)).toBe('Standard error');
    });

    it('returns default message for unknown types', () => {
      expect(toUserMessage('Just a string')).toBe('An unexpected error occurred.');
    });
  });
});
