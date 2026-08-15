import { describe, it, expect } from 'vitest';
import { isValidStellarAddress, formatBalance, truncateAddress } from './validation';

describe('Validation Utils', () => {
  describe('formatBalance', () => {
    it('should format valid numbers correctly', () => {
      expect(formatBalance('100.5')).toBe('100.50');
      expect(formatBalance('1000')).toBe('1,000.00');
    });

    it('should handle undefined or null', () => {
      expect(formatBalance(null)).toBe('0.00');
      expect(formatBalance(undefined)).toBe('0.00');
    });
  });

  describe('truncateAddress', () => {
    it('should truncate a valid Stellar public key', () => {
      const pubKey = 'GA7YV45RGDHJ2T7O7Z4QXZ64UDB3M46L76F6D6QXZ64UDB3M46L76F6D';
      expect(truncateAddress(pubKey)).toBe('GA7Y...F6D6');
    });

    it('should handle short strings gracefully', () => {
      expect(truncateAddress('SHORT')).toBe('SHORT');
    });
  });
});
