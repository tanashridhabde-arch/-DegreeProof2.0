import { describe, it, expect } from 'vitest';
import { formatBalance } from './validation';

describe('validation utils', () => {
  describe('formatBalance', () => {
    it('formats a valid balance string', () => {
      expect(formatBalance('1234.5678')).toBe('1,234.57');
    });

    it('handles undefined and null', () => {
      expect(formatBalance(undefined)).toBe('0.00');
      expect(formatBalance(null)).toBe('0.00');
    });

    it('formats 0 properly', () => {
      expect(formatBalance('0')).toBe('0.00');
    });

    it('formats large numbers', () => {
      expect(formatBalance('1234567.89')).toBe('1,234,567.89');
    });
  });
});
